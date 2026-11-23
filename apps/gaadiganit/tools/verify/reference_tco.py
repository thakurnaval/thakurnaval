"""Independent reference for SPEC section 4, written from the spec text, not the engine code.

Usage (from apps/gaadiganit):
    node tools/verify/engine_dump.mts > engine.json
    python tools/verify/reference_tco.py packages/engine/test/fixtures/defaults-2026.11.2.json engine.json

Covers the rules W1-W3 use: road tax bands, year-1 insurance and renewals, loan EMI and
amortisation, claimed mileage x real-world factor, yearly fuel inflation, odometer service,
tyres, repairs buffer, 12V battery, resale interpolation, and commercial earnings/ROI/payback.
"""
import json, sys
from decimal import Decimal, ROUND_HALF_UP
d = json.load(open(sys.argv[1], encoding='utf-8'))
eng = json.load(open(sys.argv[2]))

def rnd(x):  # half up, like Math.round for positive numbers
    return int(Decimal(x).quantize(Decimal(1), rounding=ROUND_HALF_UP))

def band(state, fuel, ex):
    for b in d['states'][state]['roadTax']['value']:
        if b['maxExShowroom'] is None or ex <= b['maxExShowroom']:
            r = b['rateByFuel']; return r.get(fuel, r['default'])

def run(ex, cat, fuel, city, kmpm, N, claimed, loan=None, com=None):
    c = d['cities'][city]; state = c['stateCode']
    price = c['fuelPrices']['value'][{'petrol': 'petrolPerLitre', 'diesel': 'dieselPerLitre', 'cng': 'cngPerKg'}[fuel]]
    road = rnd(Decimal(str(band(state, fuel, ex))) * ex)
    ins1 = rnd(Decimal(str(d['insurance']['value']['year1RateByCategory'][cat])) * ex)
    onroad = ex + road + ins1
    if loan:
        down = rnd(Decimal(str(loan['down'])) * onroad); P = onroad - down
        r = Decimal(str(loan['rate'])) / 12; n = loan['n']
        emi = rnd(P * r * (1 + r) ** n / ((1 + r) ** n - 1))
    else:
        down, P, emi, n = onroad, 0, 0, 0
    cash = onroad - P
    eff = Decimal(str(claimed)) * Decimal(str(d['realWorldFactor']['value'][fuel]))
    infl = Decimal(str(d['usage']['value']['fuelInflation']))
    svc = d['service']['value'][cat]; svc = svc.get(fuel, svc['default'])
    tyre = d['tyres']['value'][cat]; bat = d['battery12v']['value']
    rep = d['other']['value']['repairsBufferPerYearByCategory'][cat]
    decline = Decimal(str(d['insurance']['value']['renewalDecline']))
    bal = P; km_since = 0; mo_since = 0; odo = 0; tyres_done = 0
    tot = dict(emi=0, interest=0, principal=0, energy=0, service=0, tyres=0, insurance=0, other=0)
    rows = []
    for m in range(1, N + 1):
        e = i_ = 0
        if P and m <= n:
            i_ = rnd(bal * r); e = emi if m < n else bal + i_
            bal -= e - i_
        energy = rnd(Decimal(kmpm) / eff * price * (1 + infl) ** ((m - 1) // 12))
        odo += kmpm; km_since += kmpm; mo_since += 1; s = 0
        while km_since >= svc['intervalKm']:
            s += svc['cost']; km_since -= svc['intervalKm']; mo_since = 0
        if mo_since >= svc['intervalMonths']:
            s += svc['cost']; km_since = 0; mo_since = 0
        t = 0
        while odo >= (tyres_done + 1) * tyre['lifeKm']:
            t += tyre['costPerSet']; tyres_done += 1
        ins = rnd(ins1 * (1 - decline) ** ((m - 1) // 12)) if m > 1 and (m - 1) % 12 == 0 else 0
        oth = (rep if m % 12 == 0 else 0) + (bat['cost'] if m % bat['intervalMonths'] == 0 else 0)
        rows.append([e, i_, energy, s, t, ins, oth])
        for k, v in zip(['emi', 'interest', 'energy', 'service', 'tyres', 'insurance', 'other'], [e, i_, energy, s, t, ins, oth]):
            tot[k] += v
    years = Decimal(N) / 12; curve = d['depreciation']['value'][fuel]
    lo = int(years); frac = years - lo
    pt = lambda y: Decimal(1) if y == 0 else Decimal(str(curve[min(y, len(curve)) - 1]))
    resale = rnd(ex * (pt(lo) + (pt(lo + 1) - pt(lo)) * frac))
    tco = cash + tot['emi'] + tot['energy'] + tot['service'] + tot['tyres'] + tot['insurance'] + tot['other'] + bal - resale
    commercial = None
    if com:
        permits = d['commercial']['value']['permitsPerYearByCategory'][cat]
        cum = 0; payback = None; earnT = commT = 0
        for m, row in enumerate(rows, 1):
            earn = com['perKm'] * kmpm; comm = rnd(Decimal(earn) * Decimal(str(com['commission'])))
            operating = com['driver'] + (permits if (m - 1) % 12 == 0 else 0)
            net = earn - comm - sum(row[:1] + row[2:]) - operating
            cum += net; earnT += earn; commT += comm
            if payback is None and cum >= cash: payback = m
        tco += sum(com['driver'] for _ in rows) + permits * len([m for m in range(1, N + 1) if (m - 1) % 12 == 0])
        commercial = dict(netProfitTotal=cum, earningsTotal=earnT, commissionTotal=commT, paybackMonth=payback,
                          roiPercent=(cum + resale - bal - cash) / cash * 100)
    return dict(commercial=commercial, tco=tco, onRoad=onroad, roadTax=road, ins1=ins1, emi=emi, resale=resale, rows=rows, tot=tot, outstanding=bal)

W = {
  'W1': run(65_000_000, 'hatchback', 'petrol', 'delhi', 1000, 60, 20),
  'W3': run(75_000_000, 'sedan', 'cng', 'bengaluru', 6500, 48, 26, loan=dict(down=0.2, rate=0.095, n=48),
            com=dict(perKm=1400, commission=0.25, driver=1_800_000)),
  'W2': run(160_000_000, 'suv', 'diesel', 'mumbai', 1500, 60, 17, loan=dict(down=0.2, rate=0.09, n=60)),
}
ok = True
for k, ref in W.items():
    e = eng[k]
    checks = {'tco': (ref['tco'], e['tco']), 'onRoad': (ref['onRoad'], e['upfront']['onRoad']),
              'roadTax': (ref['roadTax'], e['upfront']['roadTax']), 'resale': (ref['resale'], e['exit']['resale']),
              'emi': (ref['emi'] or None, e['emi'])}
    for name, (a, b) in checks.items():
        flag = 'OK ' if a == b else 'DIFF'; ok &= a == b
        print(f'{k} {name:8} ref={a} engine={b} {flag}')
    if ref['commercial']:
        for kk, a in ref['commercial'].items():
            b = e['commercial'][kk]; same = abs(a - b) < 1e-9 if isinstance(a, float) else a == b
            ok &= same; print(f'{k} {kk:16} ref={a} engine={b} {"OK " if same else "DIFF"}')
    diffs = [(i + 1, a, b) for i, (a, b) in enumerate(zip(ref['rows'], e['months'])) if a != b]
    print(f'{k} monthly rows differing: {len(diffs)}', diffs[:3]); ok &= not diffs
    print(f'{k} TCO Rs {ref["tco"]/100:,.2f}  per month Rs {ref["tco"]/100/len(ref["rows"]):,.2f}')
print('ALL MATCH' if ok else 'MISMATCH')
