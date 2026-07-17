# Article Template

Copy this file, fill it in, and hand it back for publishing (`node scripts/generate-article.mjs your-file.md`).
Everything below the frontmatter is the article body — plain text, mechanically converted into the
site's existing icon-grid article layout. No prose is invented; only your words are used.

## Rules

- Frontmatter is flat `key: value` lines between the two `---` fences. Don't nest YAML.
- Body sections start with `## Heading`. Add a `{grid}`, `{checklist}`, `{callout}`, or `{faq}` tag
  after the heading to control layout; omit the tag for a plain prose section.
- Inside `{grid}`, `{checklist}`, and `{callout}` sections, each bullet must be `- **Label:** text`
  so the generator can pick an icon and title for it. `{callout}` sections may have an intro
  paragraph before the bullets.
- Inline `**bold**`, `*italic*`, and `[text](url)` links work anywhere in prose or bullet text.
- One trailing `> blockquote` line at the very end of the file becomes the closing italic pull-quote
  (optional — omit if you don't want one).
- `{faq}` uses `Q:` / `A:` line pairs. This only feeds the FAQPage SEO schema — it is not rendered
  on the page, matching the site's existing articles.
- Icons are auto-picked from each bullet's Label against a keyword table (`scripts/icon-map.mjs`).
  Unmatched labels fall back to a generic icon — no icon choices needed on your end. If you want a
  specific icon, keep the label wording close to a common term (e.g. "Cost Savings", "Security",
  "Automation") — check `icon-map.mjs` for the current vocabulary.

## Frontmatter fields

| Field | Required | Notes |
|---|---|---|
| `title` | yes | Page `<h1>` and SEO title |
| `subtitle` | yes | Hero subtitle and meta description (auto-truncated at 150 chars) |
| `slug` | yes | URL: `/articles/<slug>` — lowercase, hyphenated |
| `tag` | yes | One of the site's pillars, e.g. `DevOps`, `SecOps`, `FinOps`, `GenAI`, `Architecture` |
| `date` | yes | `YYYY-MM-DD`, used as `datePublished` in schema |
| `keywords` | no | Comma-separated, used in schema only |

---

```markdown
---
title: Your Article Title
subtitle: One-sentence summary shown in the hero and search results.
slug: your-article-slug
tag: DevOps
date: 2026-07-20
keywords: keyword one, keyword two, keyword three
---

## Introduction
Plain paragraph(s). This becomes a normal prose section, same as the opening of every
existing article. Supports **bold**, *italic*, and [links](https://example.com).

## Key Benefits {grid}
- **Cost Savings:** Eliminates upfront hardware costs by moving to pay-as-you-go.
- **Scalability:** Scale resources up or down without new hardware.
- **Flexibility:** Access from anywhere, on any device.

## Best Practices {checklist}
- **Tag Everything:** Apply cost-allocation tags from day one.
- **Review Weekly:** Set a recurring cadence to review spend and catch drift early.

## Common Pitfalls {callout}
Watch out for these traps:
- **Sprawl:** Idle resources accumulate silently across accounts.
- **No Ownership:** Nobody is accountable for a given cost center.

## FAQ {faq}
Q: What is the main takeaway?
A: Answer text here.

Q: How long does this take to implement?
A: Answer text here.

> Optional closing italic pull-quote / summary line.
```
