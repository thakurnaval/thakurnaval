# Moving GaadiGanit to its own repository

When GaadiGanit outgrows this repo, as Tackl, BookEx and TrueNorth did, follow these steps.

## 1. Split out the folder with its git history

```bash
# from a fresh clone of thakurnaval
git clone https://github.com/thakurnaval/thakurnaval.git gaadiganit-split
cd gaadiganit-split
pip install git-filter-repo        # one-time
git filter-repo --subdirectory-filter apps/gaadiganit
```

The clone now holds only GaadiGanit, with `apps/gaadiganit/` as its root and all of its commit history.

## 2. Bring the deploy workflow along

`filter-repo` only keeps `apps/gaadiganit/`, so copy `/.github/workflows/deploy-gaadiganit.yml` from the old repo into `.github/workflows/deploy.yml` in the new one, then:

- remove the `paths:` filter (the whole repo is the app now)
- remove every `working-directory: apps/gaadiganit` and change the Docker build `context` from `apps/gaadiganit` to `.`

## 3. Push to the new repo

```bash
git remote add origin https://github.com/thakurnaval/GaadiGanit.git
git push -u origin main
```

Copy the `GAADIGANIT_*` GitHub secrets into the new repo. The Cloud Run service, Artifact Registry repo and domain mapping stay the same. If deploys use Workload Identity Federation, add the new repo to the service account's `principalSet` binding.

## 4. Clean up `thakurnaval`

```bash
git rm -r apps/gaadiganit .github/workflows/deploy-gaadiganit.yml
```

Keep the `/gg` and `/gaadiganit` redirect in the root `nginx.conf`; it points to `gg.nthakur.com` wherever the code lives. Keep the GaadiGanit entry in the `PROJECTS` array in `constants.ts`, pointing to the live URL and the new GitHub repo.
