# AisleIQ: AI-Powered Snack Portfolio Intelligence for FMCG

A PM case study prototype built around PepsiCo's shift toward health-conscious snacking and the consumer segmentation problem that comes with it.

**Live Demo:** https://NikitaSuryawanshi18.github.io/AisleIQ-Case-Study-For-Pepsico

---

## What is AisleIQ?

PepsiCo is making the right bets on healthy snacking by acquiring Siete, launching Doritos Protein, and expanding SunChips Fiber. But they have no unified intelligence layer to answer a deceptively simple question: for which consumer, in which format, at which price point, should we be pushing which snack?

AisleIQ is that tool. It maps PepsiCo's snack portfolio against consumer health profiles, budget sensitivity, functional needs, and purchase format preferences, surfacing the right SKU for the right person and flagging where the portfolio has no good answer at all.

---

## Features

**Overview Tab**
A dynamic portfolio snapshot computed from the data. Three bold numbers tell the story instantly: how many SKUs are losing demand, how many are growing, and how many pack or price decisions are waiting to be made. An indexed growth chart shows how each portfolio tier is trending over six quarters.

**Consumer Gaps Tab**
A coverage map showing how well PepsiCo's current snack portfolio serves eight key consumer need states. Click any bar to see a "So What?" analysis explaining what PepsiCo should do about that gap. Critical white spaces (GLP-1 consumers, clean label plus value) are flagged with specific innovation recommendations.

**Pack and Price Tab**
A full SKU table showing every product's current formats, best-fit formats, current price per oz, recommended price per oz, consumer shift risk, and a recommended action (Expand Formats, Reprice, Reposition Format, or Maintain). Click any row to see the full strategic analysis and health attribute radar.

---

## Portfolio Tiers

**Classic:** Traditional indulgent snacks with no specific health positioning. Examples: Doritos Nacho Cheese, Cheetos Crunchy, Lay's Classic.

**Better-For-You:** Snacks that are healthier than classic alternatives but without a specific functional health claim. Examples: SunChips Harvest Cheddar, PopCorners, Stacy's Pita Chips, Simply Doritos, Siete.

**Functional:** Purpose-built snacks targeting a specific health benefit such as high protein, high fiber, or gut health. Examples: Doritos Protein, SunChips Fiber, Quaker Protein Granola Bars, Bare Apple Chips, Sabra Hummus Snack Pack.

---

## Health Score Methodology

Each SKU is scored 0 to 100 based on five nutritional dimensions: protein content, fiber content, sodium level, presence of artificial ingredients, and clean label status. The score is computed dynamically from raw attribute values, not hardcoded.

The recommended action per SKU (Expand Formats, Reprice, Reposition Format, or Maintain) is derived from the relationship between the SKU's current format availability, best-fit consumer format, and current versus recommended price per oz.

For a full breakdown of the methodology, scoring weights, and definitions, see the Technical Reference Document linked in the blog post.

---

## Running Locally

**Prerequisites:** Node.js v16 or higher

```bash
git clone https://github.com/NikitaSuryawanshi18/AisleIQ-Case-Study-For-Pepsico.git
cd AisleIQ-Case-Study-For-Pepsico
npm install
npm start
```

The app will open at http://localhost:3000

---

## Deploying to GitHub Pages

```bash
npm run deploy
```

---

## Tech Stack

React 18, Recharts, CSS Variables, GitHub Pages. No backend, no API keys, fully static and free to host.

---

## A Note on the Data

All SKU names and brand names are real PepsiCo products. Revenue figures, health scores, price recommendations, and demand trends are modeled for demonstration purposes and do not reflect actual PepsiCo financials or internal data.

---

## About This Case Study

Built as part of a PM portfolio to demonstrate product thinking on a real, material business problem. PepsiCo's CEO Ramon Laguarta has publicly cited price pack architecture and the health-conscious consumer shift as top strategic priorities across multiple earnings calls in 2025 and 2026.

**Built by:** Nikita Suryawanshi
**Role:** Product Management Portfolio Project
