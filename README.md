# AisleIQ — AI-Powered Snack Portfolio Intelligence for FMCG

**A PM case study prototype built around PepsiCo's shift toward health-conscious snacking and the consumer segmentation problem that comes with it.**

🔗 **[View Live Demo](https://NikitaSuryawanshi18.github.io/AisleIQ-Case-Study-For-Pepsico)**

---

## What is AisleIQ?

PepsiCo is making the right bets on healthy snacking — acquiring Siete, launching Doritos Protein, expanding SunChips Fiber. But they have no unified intelligence layer to answer: *for which consumer, in which format, at which price point, should we be pushing which snack?*

AisleIQ is that tool. It maps PepsiCo's snack portfolio against consumer health profiles, budget sensitivity, functional needs, and purchase format preferences — surfacing the right SKU for the right person, and flagging where the portfolio has no good answer at all.

---

## Features

- **Portfolio Overview** — KPI cards, revenue by tier, consumer shift risk flags, at-risk classic SKUs
- **Consumer Profile Explorer** — Build a multidimensional consumer profile (budget, health consciousness, functional need, purchase format) and get ranked SKU matches with match scores
- **Pack & Price Intelligence** — Full SKU table showing available formats, best-fit formats, price per oz, and format alignment flags
- **Portfolio Gap Finder** — Visual map of consumer need state coverage, critical innovation white spaces, and closest existing SKUs to each gap

---

## Health Score Methodology

Each SKU is scored 0–100 based on: protein content, fiber content, sodium level, artificial ingredients, and clean label status.

**Consumer match scoring** uses a weighted formula across four profile dimensions:
- Health consciousness fit — 30%
- Budget sensitivity fit — 25%
- Functional need fit — 20%
- Purchase format availability — 25%

---

## Running Locally

**Prerequisites:** Node.js v16+

```bash
git clone https://github.com/NikitaSuryawanshi18/AisleIQ-Case-Study-For-Pepsico.git
cd AisleIQ-Case-Study-For-Pepsico
npm install
npm start
```

---

## Deploying to GitHub Pages

```bash
npm run deploy
```

---

## Tech Stack

- **React 18** — UI framework
- **Recharts** — Charts, radar, bar, and line charts
- **CSS Variables** — Theming and design tokens
- **GitHub Pages** — Hosting

No backend. No API keys. Fully static and free to host.

---

## About This Case Study

Built as part of a PM portfolio to demonstrate product thinking on a real, material business problem. All SKU data is grounded in real PepsiCo brands and public information. Revenue figures and scores are modeled for demonstration purposes.

**Built by:** Nikita Suryawanshi
**Role:** Product Management Portfolio Project
**Related project:** [ShelfIQ — Nestlé SKU Rationalization](https://github.com/NikitaSuryawanshi18/ShelfIQ---Case-Study-for-Nestle)
