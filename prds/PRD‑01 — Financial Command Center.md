# PRD‑01 — Financial Command Center

## 1. Overview and purpose

The **Financial Command Center** is the primary surface where FinTrac users answer three questions within seconds of opening the app:

1. Where am I?
2. What should I do next?
3. What happens if I do it?

If the dashboard does not answer these questions quickly and clearly, it has failed its job.[file:2]

Most finance apps show balances, charts, categories, and tables of transactions. FinTrac’s Command Center must instead show **Situation → Decision → Impact** derived from Goal OS, the Forecasting Engine, and the Recommendation Engine.[file:2]

The Command Center owns almost no business logic. It consumes outputs from upstream systems and focuses on layout, prioritization, explainability, and interaction.[file:2]


## 2. Alignment with product strategy

### 2.1 Decision Rule pillars

The Command Center sits at the intersection of the three FinTrac pillars:

- **Improve Decisions** — by surfacing high‑leverage recommendations, forecasts, and goal status.
- **Increase Trust** — by making every insight explainable and auditable.
- **Strengthen Habits** — by reinforcing progress and nudging users toward repeatable behaviors.[file:2]

### 2.2 Relationship to core engines

The Command Center is the visible output of three core engines:

- **Goal OS (PRD‑02)** — defines user goals, states, health, confidence, priorities, and dependencies.
- **Forecasting Engine (PRD‑03)** — answers “What happens if I change something?” via current vs optimized forecasts.[file:2]
- **Recommendation Engine (PRD‑14)** — turns signals and forecasts into prioritized Recommendation Objects.[file:2]

**Architecture flow**

Goal OS → Forecasting Engine → Recommendation Engine → Command Center

This flow should be reflected in data contracts and code boundaries so that the Command Center never re‑implements business logic already defined in upstream systems.[file:2]

Architecture:

Goal OS → Forecasting Engine → Recommendation Engine → **Command Center**[file:2]

The dashboard should never compute business logic that conflicts with these systems. It renders their outputs and orchestrates the user experience.


## 3. Scope and non‑scope

### 3.1 In scope

This PRD defines:

- The **information architecture** and section hierarchy of the Command Center.
- Which objects and fields each section consumes (Goal Object, Forecast Object, Recommendation Object).
- Personalization rules by user stage.
- Empty state behavior.
- Events and success metrics for analytics and FDIR attribution.
- Explainability and quality requirements for all widgets.[file:2]

### 3.2 Out of scope

- Detailed visual design, colors, typography — handled by Design System.
- Deep configuration of recommendations or goals — owned by PRD‑14 and PRD‑02.
- Low‑level forecasting behavior — owned by PRD‑03.


## 4. Core objects consumed

### 4.1 Recommendation Object (from PRD‑14)

Simplified shape:

```json
{
  "recommendation_id": "rec_001",
  "title": "Reduce food delivery by ₹700",
  "subtitle": "Redirect to Emergency Fund",
  "impact": {
    "time_saved_days": 120,
    "goal_id": "goal_emergency_fund"
  },
  "confidence": 0.88,
  "reason": "Food delivery spend increased 18% vs last month.",
  "source": "forecasting_engine"
}
```

### 4.2 Goal Object (from Goal OS)

Simplified shape:

```json
{
  "goal_id": "goal_emergency_fund",
  "name": "Emergency Fund (4 months)",
  "progress": 72,
  "health_rank": 1,
  "health_label": "on_track",
  "priority_rank": 1,
  "priority_label": "critical"
}
```

### 4.3 Forecast Object (from Forecasting Engine)

Simplified shape:

```json
{
  "forecast_id": "fc_001",
  "goal_ids": ["goal_emergency_fund"],
  "scenario_label": "Reduce food delivery by ₹700/month",
  "outputs": {
    "goals": {
      "goal_emergency_fund": {
        "baseline_completion_date": "2027-02-01",
        "projected_completion_date": "2026-10-01",
        "time_saved_days": 123,
        "projected_health_label": "on_track"
      }
    }
  },
  "confidence": 0.88
}
```

The Command Center uses these shared objects so all surfaces stay consistent.


## 5. Information architecture

The order of sections is intentional. Users should experience the dashboard as a narrative from **status → next action → future impact → supporting details**.[file:2]

### 5.0 Command Center Prioritization Engine

Purpose:

Select the most important information for the user **right now** so the Command Center never feels like a random list of cards.[file:2]

Inputs:

- Recommendation score (from PRD‑14).
- Goal priority and health (from PRD‑02).
- Forecast impact (time_saved, risk reduction, surplus delta) from PRD‑03.[file:2]
- User stage (Awareness, Understanding, Optimization, Automation).

Outputs:

- **Hero Recommendation** — a single highest‑value recommendation for the current session.
- **Secondary Signals** — up to a small number of additional signals.
- **Future Outlook priority** — which goal’s forecast to highlight in the Future Outlook section.

Rules (conceptual):

- Favor Critical risks and high‑impact actions over minor optimizations.
- Respect goal priority and health (e.g. Critical + At Risk goals outrank Low + On Track goals).
- Incorporate user stage (e.g. show simpler “visibility” insights to Stage 1 users).

The Prioritization Engine is a thin layer on top of upstream scores; the dashboard itself should not re‑score business logic.[file:2]


### 5.1 Section 1 — Financial Status Header

Purpose: answer **“Where am I?”** at a glance.

Always visible at the top. Contains:

- **Health Score** (from PRD‑02), e.g. 82.
- **Trend** (improving, stable, declining) based on recent changes in health and cash‑flow.
- **Net Cash Flow** (average or latest month), e.g. +₹8,300.
- **Goal Status** — number of active goals and high‑level state, e.g. “3 Active”.[file:2]

Interaction:

- Tapping the header deep‑links to a more detailed financial health view.

### 5.2 Section 2 — Most Important Recommendation (Hero card)

Purpose: answer **“What should I do next?”**.

- Shows **exactly one hero recommendation** at a time.
- Content derived from the highest‑priority Recommendation Object.[file:2]

Example hero card:

- Title: “Reach Emergency Fund Faster”.
- Action: “Reduce food delivery by ₹700/month”.
- Impact: “Emergency Fund 4 months sooner” (from Forecast Object time_saved_days).
- Confidence: “88%”.
- Primary action: “See Forecast” or “Apply Scenario”.

Rules:

- Only one hero recommendation is shown to avoid choice overload.
- Hero must satisfy the Insight + Action + Impact + Confidence rule (see Quality Framework).[file:2]

### 5.3 Section 3 — Goal Snapshot

Purpose: keep users grounded in **what they are working toward**.

- Shows top N goals (e.g. 3–5) ordered by priority and recency.
- Each card shows name, progress (percentage), and health_label.[file:2]

Example:

- Emergency Fund — 72% — On track.
- Laptop — 43% — Slightly delayed.
- Japan Trip — 18% — At risk.

Interaction:

- Tapping a goal opens detailed Goal OS view with full contributions, milestones, and history.

### 5.4 Section 4 — Future Outlook

Purpose: answer **“What happens if I do it?”** in a simple, visual way.

- Uses the Forecasting Engine’s Current vs Optimized Path for the primary or hero goal.
- Shows:
  - Current path completion date.
  - Optimized path completion date under the recommended scenario.
  - Time saved in plain language (e.g. “4 months sooner”).[file:2]

Example:

- Current Path — Emergency Fund: Feb 2027.
- Optimized Path — Emergency Fund: Oct 2026.

Interaction:

- Button: “Explore Forecast” to open a full forecasting view with more scenarios.

### 5.5 Section 5 — Financial Signals

Purpose: surface **supporting signals** without overwhelming.

- Up to three signal cards from the Recommendation Engine (PRD‑14).[file:2]
- Types may include:
  - Subscription Leak.
  - Spending Spike.
  - Income Increase.
  - Behavior Improvement.

Each signal card must include:

- Insight (e.g. “Food delivery spending increased 18% this month.”).
- Suggested action (e.g. “Review your food delivery budget.”).
- Impact estimate where available.
- Confidence indicator.

### 5.6 Section 6 — Recent Progress

Purpose: **positive reinforcement** to encourage continued engagement.

Examples:

- “Food delivery spending ↓ 12% vs last month.”
- “Savings rate ↑ 8%.”
- “Goal progress +₹4,000 this month.”

These can be derived from Goal OS and behavior analytics.


## 6. Personalization by user stage

New users should not see the same dashboard as mature users.

### 6.1 User stages

- **Stage 1 — Awareness**: little or no data.
  - Focus on transactions, categories, and basic visibility.
- **Stage 2 — Understanding**: enough data to detect patterns.
  - Focus on goals, simple patterns, and basic recommendations.
- **Stage 3 — Optimization**: stable users with multiple goals.
  - Focus on forecasts, trade‑offs, and scenario analysis.
- **Stage 4 — Automation**: advanced users.
  - Focus on goal automation and execution controls.[file:2]

### 6.2 Personalization rules

- Stage 1 dashboards prioritize data onboarding and visibility.
- Stages 2–3 gradually elevate the hero recommendation and Future Outlook sections.
- Stage 4 surfaces automation and execution entry points more prominently.[file:2]


## 7. Notification and attention model

The Command Center should act as the **attention router** for FinTrac.

### 7.1 Attention levels

- **Critical** — Emergency Fund off track, negative cash flow, major leak, high‑risk behavior.
- **Important** — goal delayed, savings opportunity, notable pattern change.
- **Informational** — progress updates, minor pattern shifts.

Attention level affects:

- Visual emphasis (badges, colors, ordering).
- Whether a card is eligible for notifications or badges.
- How aggressively a recommendation is surfaced across sessions.[file:2]


## 8. Empty state strategy

The Command Center must be useful even when data is sparse.

Key empty states:

- **No transactions** → show clear CTAs: “Connect SMS”, “Import Statement”, “Add Transactions”.
- **No goals** → prompt: “Create your first goal” with suggested templates (Emergency Fund, Laptop, Vacation).
- **No forecasts** → prompt: “Run your first forecast” with a simple starter scenario.
- **No recommendations** → message: “Continue building your financial profile” plus pointers to actions that unlock recommendations.[file:2]

Empty states must still respect the Insight + Action + Impact + Confidence philosophy where possible, even if confidence is low initially.


## 9. Events and instrumentation

Domain events for the Command Center:

- `dashboard_opened`.
- `recommendation_clicked`.
- `goal_clicked`.
- `forecast_opened`.
- `forecast_compared`.
- `signal_viewed`.[file:2]

These events support:

- Usage analytics (which sections get attention).
- Trust and explainability metrics (how often users engage with forecasts vs raw data).
- FDIR attribution (connecting dashboard interactions to improved decisions).


## 9. Success metrics

### 9.1 Primary metric

- **Time To First Insight** — the time from dashboard open to the user seeing a clear, actionable insight.
  - Target: **< 10 seconds**.[file:2]

### 9.2 Secondary metrics

- Recommendation click‑through rate (CTR).
- Forecast CTR (from hero or Future Outlook sections).
- Goal engagement (goal detail opens, edits, new goals created).
- Weekly active users (WAU).

### 9.3 Business metric

- **FDIR improvement** — the dashboard exists to improve decisions, not just show data. FDIR should meaningfully improve for users who regularly engage with the Command Center compared to those who do not.[file:2]

### 9.4 Command Center Health Score

In addition to user‑level metrics, FinTrac should track a **Command Center Health Score** that reflects how well the dashboard is populated:[file:2]

- Data completeness (transactions connected, statements imported).
- Goal coverage (at least one active goal, coverage of key categories like Emergency Fund).
- Forecast coverage (presence of at least one relevant forecast).
- Recommendation coverage (presence of at least one meaningful recommendation).

Example visualization:

- Transactions — ✓
- Goals — ✓
- Forecasts — ✗
- Recommendations — ✓

This helps diagnose onboarding and activation issues and guides future product work.[file:2]


## 10. Dashboard state model

The Command Center should have its own **high‑level states**, similar to Goal and Forecast states.

States:

- **Onboarding** — user has little or no data (no transactions, no goals, no forecasts).
- **Active** — healthy flow of insights and regular usage.
- **Alert** — at least one Critical recommendation or risk exists.
- **Growth** — user is actively improving (goals progressing, leaks reduced).
- **Celebration** — meaningful goal completion or milestone has just occurred.[file:2]

These states support personalization (e.g. different empty states or emphasis) and analytics (time spent in Alert vs Growth vs Celebration).


## 11. Cross‑engine conflict rules

Because the Command Center aggregates outputs from Goal OS, Forecasting, and Recommendation Engine, conflicts must be resolved deterministically.[file:2]

Example conflict:

- Forecast suggests increasing savings by ₹3,000.
- Recommendation suggests increasing savings by ₹1,000.
- Goal OS reports the goal is already On Track.

Priority order for resolving conflicts:

1. **Critical Risk** — anything that threatens financial stability (negative cash flow, missed essential payments).
2. **Goal Health** — At Risk / Off Track goals before Slightly Delayed / On Track goals.
3. **Forecast Impact** — scenarios that save more time or reduce more risk.
4. **Recommendation Score** — tie‑breaker using PRD‑14 scoring.

The Prioritization Engine should use this ordering so the dashboard never surfaces contradictory or low‑value advice.[file:2]


## 12. Explainability requirements

Every card on the Command Center must answer: **“Why am I seeing this?”**

Examples:

- Recommendation: “Because food delivery spending increased 18% this month.”
- Goal risk: “Because contributions fell below target for 2 months.”
- Forecast: “Based on your last 6 months of behavior.”

Each card should include a short reason string sourced from upstream engines (Goal OS, Forecasting, Recommendation) or a computed explanation using their fields.[file:2]


## 13. Command Center quality framework

To align with the Trust pillar, every widget shown on the dashboard must contain:

- **Insight** — what is happening?
- **Action** — what should the user do?
- **Impact** — what will change if they do it?
- **Confidence** — how sure is the system?

Example:

- Insight: “Food delivery increased.”
- Action: “Reduce by ₹700/month.”
- Impact: “Emergency Fund 4 months sooner.”
- Confidence: “88%.”[file:2]

If a widget cannot provide all four elements, it should not be shown on the Command Center.


## 14. Command Center rendering pipeline

Goal OS, Forecasting Engine, and Recommendation Engine feed into a simple rendering pipeline:

Goal OS / Forecasting Engine / Recommendation Engine → Prioritization Engine → Dashboard Composer → Personalization Layer → Command Center UI

- **Prioritization Engine** selects which insights matter most.
- **Dashboard Composer** assembles sections (header, hero, goals, outlook, signals, progress) from shared objects.
- **Personalization Layer** adapts ordering and emphasis based on user stage and dashboard state.[file:2]


## 15. What makes FinTrac different

Most finance apps:

Data → Charts → User.

FinTrac:

Data → Goals → Forecast → Recommendation → Decision → User.[file:2]

The Command Center is where this entire loop becomes visible and usable. It should feel less like a report and more like a **financial decision cockpit**, driven by the Goal OS, Forecasting Engine, and Recommendation Engine working together.[file:2]
