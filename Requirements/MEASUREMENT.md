# Measurement: what's tracked and the monthly review

## What the site sends to Google Analytics (GA4, property G-2T36Y7QSN6)

Only for visitors who click **Accept analytics** in the consent banner. Visitors who decline send nothing.

| Event | When | Parameters |
| --- | --- | --- |
| `page_view` | Every page change | `page_path` |
| `generate_lead` | Any form is submitted: guide unlock, assessment report, newsletter, contact form, speaker kit, DevOpsism list, premium-report interest | `lead_source` (e.g. `devops-assessment`, `field-guide`, `contact-form`, `newsletter`, or the guide topic) |
| `file_download` | A guide PDF or assessment report is opened, or an IaC template downloaded | `file_name` |
| Theme, Search, Social | Existing events: dark-mode toggle, site search, social link clicks | `event_category`, `event_label` |

Code: `src/services/analytics.ts` (`trackLead`, `trackDownload`, `trackEvent`, `trackPageView`).

## One-time setup in GA4 (5 minutes)

1. **Admin → Events:** after the first lead arrives, mark `generate_lead` as a **key event** (conversion).
2. **Admin → Custom definitions → Create custom dimension:** `lead_source` (event scope) and `file_name` (event scope), so they can be used in reports.
3. **Admin → Data retention:** set to 14 months (matches the Privacy Policy).

## One-time setup in Google Search Console

1. Go to search.google.com/search-console and add the property **nthakur.com** (Domain property).
2. Verify with the DNS TXT record it gives you, added at Hostinger (same place as the `gg` record). Alternatively choose the "HTML tag" method and send me the `google-site-verification` code to add to the site.
3. **Sitemaps:** submit `https://nthakur.com/sitemap.xml` (robots.txt already points to it).
4. Link Search Console to GA4 (**GA4 Admin → Search Console links**) to see search queries next to page data.

## Monthly review (first Monday, 20 minutes)

| Question | Where to look |
| --- | --- |
| How many visitors, and from where? | GA4 → Reports → Acquisition → Traffic acquisition |
| How many leads, and from which guide or assessment? | GA4 → Reports → Engagement → Events → `generate_lead`, broken down by `lead_source` |
| Which guides are opened most? | `file_download` by `file_name` |
| Which pages and searches bring people in? | Search Console → Performance (queries, pages, click-through rate) |
| Which pages do people land on and leave? | GA4 → Engagement → Landing page |

Record three numbers each month: **visitors**, **leads**, **top lead source**. Then pick one action, such as promoting the best-converting guide on LinkedIn, improving a page with high impressions but low clicks, or adding a call to action to a popular page with no leads.

| Month | Visitors | Leads | Top lead source | Action taken |
| --- | --- | --- | --- | --- |
| Dec 2026 | | | | |
