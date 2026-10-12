---
name: ppt-generator
description: >-
  Generate executive-grade, investor-ready Microsoft PowerPoint (.pptx) presentations.
  Produces high-contrast, minimalist pitch decks with 16:9 widescreen layout,
  clean typography, financial tables, unit economics metric cards, and technical diagrams.
---

# PPT Generator Skill

The `ppt-generator` skill allows Antigravity and Claude agents to programmatically design, structure, and compile publication-ready PowerPoint presentations (`.pptx`) for angel investors, venture capitalists, and commercial stakeholders.

## Design Philosophy & Guardrails
- **16:9 Widescreen:** Default slide dimensions (13.333" x 7.5" / 1280x720pt).
- **0% AI Slop:** No random geometric floaters, no unreadable neon gradients, no generic stock cliches.
- **Executive Typography:** Clean sans-serif hierarchy (Inter, Helvetica, Segoe UI) with tabular numbers (JetBrains Mono / Consolas) for financials.
- **Data-First Layouts:** Metric callout cards with clear labels, sub-captions, and structured tables.
- **Bilingual Capability:** Native support for English and Albanian (`Shqip`).

## Tooling & Execution
This skill leverages both:
1. **Python (`python-pptx`):** For headless batch creation and precise vector positioning.
2. **JavaScript / React (`pptxgenjs`):** For client-side single-click PowerPoint export directly in web portals.

## Standard Deck Structure (Shtegu Investor Pitch)
1. Cover / Executive Thesis & Brand Mascot
2. Hardware Moat (ODM Sourcing, Solar, Specs)
3. Technical Architecture (Nordic UART NUS, Phone-as-Gateway, Mesh Telemetry)
4. 4-Tier Monetization Flywheel (Driveways, SaaS, B2B Whitelist, Micro-Billboards)
5. Unit Economics & Capital Payback Velocity (P&L Table, 92-day metric)
6. Lean Operator Advantage (Zero Burn, €0 office, €0 fixed payroll)
7. 3-Phase Growth Projections (Prishtina Rollout)
8. Series Angel Term Sheet & Closing Pitch Note
