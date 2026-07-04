# PRD‑03 — Forecasting Engine

## 1. Overview and purpose

The **Forecasting Engine** is one of the three core intelligence systems in FinTrac, alongside the Recommendation Engine (PRD‑14) and the Goal Operating System (PRD‑02).

Where Goal OS defines *what* users are aiming for and Recommendation Engine decides *what advice to show*, the Forecasting Engine answers the question:

> **“What happens if I change something?”**

Its responsibilities are to:

- Forecast outcomes for a user’s financial goals and cash‑flow under different assumptions.
- Evaluate trade‑offs between choices (e.g. cutting a leak vs delaying a goal vs increasing contributions).
- Generate scenarios (current path vs alternative paths) that can be turned into recommendations by PRD‑14.[file:2]

In the product, this engine powers the flagship **Forecasting experience**: a side‑by‑side view of the user’s current trajectory versus one or more improved trajectories.


## 2. Alignment with product strategy

### Decision Rule pillars

The Forecasting Engine directly supports the **Improve Decisions** pillar and indirectly supports **Strengthen Habits**:

- Improve Decisions — by showing the quantitative consequences of different choices.
- Strengthen Habits — by illustrating how small consistent changes compound into meaningful goal impacts.

It supports **Increase Trust** when forecasts are explainable, conservative, and consistent with actual outcomes.[file:2]

### Relationship to FDIR and Trust Score

- It does **not** own FDIR directly, but its outputs drive many Goal Acceleration and Savings recommendations, which in turn affect FDIR.
- Forecast quality impacts **Trust Score**: if forecasts are frequently wrong, users will stop trusting both forecasts and related recommendations.

Therefore, the engine must be conservative and transparent: it is better to under‑promise and over‑deliver than the reverse.

## Forecast architecture flow

The end‑to‑end flow of the Forecasting Engine can be visualized as:

Goal OS + Behavior Data + Recommendation Context → Scenario Engine → Allocation Engine → Forecast Model → Goal Impact Engine → Confidence Engine → Sensitivity Analysis → Recommendation Candidates → Forecast Output

This architecture makes the engine easier to reason about: scenarios are created first, allocations are recomputed, outcomes are forecast, goal impacts are derived, confidence is estimated, sensitivity is analyzed, and recommendation candidates are emitted only after those steps.[file:2]


## 3. Scope and non‑scope

### In scope

This PRD defines:

- The **forecast model** for goals and cash‑flow (current path vs alternative path).
- The **scenario engine**: how user‑initiated and system‑suggested scenarios are represented and evaluated.
- The **confidence engine**: how forecast confidence is computed and exposed.
- **Sensitivity analysis**: which variables matter most for a given goal or time horizon.
- The **goal impact engine**: how forecasts update goal completion dates, health, and confidence.
- How forecasts generate **recommendations** into PRD‑14.
- Explainability requirements and UX constraints for presenting forecasts.

### Out of scope

- In‑depth statistical modeling choices (e.g. exact regression families, time‑series architectures) — those are design details; this PRD sets behavioral requirements and guardrails.
- Execution of transfers, investments, or other actions — covered by Execution Layer (PRD‑13).
- Detailed layout of screens (Command Center, goal detail, etc.) — covered in their respective PRDs.


## 4. Core concepts

### Inputs from other systems

The Forecasting Engine consumes:

- **Goal OS data (PRD‑02):**
  - `goal_id`, `type`, `priority_rank`, `priority_label`.
  - `target_amount`, `target_date`, `current_amount`.
  - `contribution_model`, `contribution_params`.
  - `health_rank`, `health_label`, `health_reason`.
  - `confidence` (baseline goal confidence).
  - `depends_on_goal_ids`, `dependency_type`.[file:2]

- **Allocation Engine outputs (Goal OS):**
  - Recommended monthly allocation per goal, based on available budget and priorities.

- **Behavior data:**
  - Historical contributions, income, spending (especially categories relevant to scenarios like food delivery, subscriptions).

- **Recommendation Engine context (PRD‑14):**
  - Candidate recommendation parameters to simulate (e.g. “reduce food delivery by ₹1,000/month”).[file:2]

## 5. Forecast object schema

The engine produces **Forecast objects** that can be consumed by Goal OS, Recommendation Engine, and UI surfaces.

Example JSON shape:

```json
{
  "forecast_id": "fc_001",
  "user_id": "user_123",
  "goal_ids": ["goal_001", "goal_002"],
  "scenario_id": "sc_001",
  "scenario_label": "Reduce Swiggy by ₹700/month",
  "path_type": "alternative", 
  "baseline_path_id": "fc_000",
  "assumptions": {
    "food_delivery_delta": -700,
    "salary_delta": 0,
    "side_income_delta": 0,
    "goal_contribution_overrides": {
      "goal_001": 700
    }
  },
  "outputs": {
    "goals": {
      "goal_001": {
        "projected_completion_date": "2026-10-01",
        "baseline_completion_date": "2027-02-01",
        "time_saved_days": 123,
        "health_rank": 1,
        "health_label": "on_track",
        "confidence": 0.9
      }
    },
    "cashflow": {
      "monthly_surplus_delta": 700,
      "risk_index_delta": -0.05
    }
  },
  "confidence": 0.88,
  "created_at": "2026-02-01T00:00:00Z"
}
```

## Forecast states

Forecasts should have an explicit lifecycle so their usage can be measured over time.

States:

- **Draft** — scenario created but not yet evaluated.
- **Generated** — forecast successfully computed.
- **Viewed** — user opened or expanded the forecast.
- **Compared** — user compared this forecast with another scenario or baseline path.
- **Applied** — user accepted a recommendation or scenario change derived from the forecast.
- **Archived** — no longer relevant due to stale assumptions, newer forecasts, or changed goals.

This lifecycle should support analytics such as Generated → Viewed → Compared → Applied and enable downstream trust and adoption analysis.[file:2]

## Forecast versioning

Forecasts must be versioned for auditability, explainability, and trust.

Example fields:

```json
{
  "forecast_id": "fc_001",
  "version": 4,
  "generated_at": "2026-02-01T00:00:00Z"
}
```

If a forecast changes materially over time because behavior, spending, income, or goals changed, FinTrac should be able to explain which version the user saw and why the forecast changed later.[file:2]

## 6. Forecast model

### Current path vs alternative path

For each user and goal, the engine maintains a **current path** forecast:

- Based on existing contribution models and observed behavior.
- Produces a projected completion date for each goal and a coarse cash‑flow outlook.

Alternative paths are generated by applying scenario changes to the current path:

- Adjust contributions (up or down).
- Adjust spending in specific categories.
- Adjust income (salary changes, side income).
- Adjust goal priorities or dependencies.

### Time horizon

For MVP:

- Goal‑level forecasts should focus primarily on the **time to goal completion** (months to target) rather than full multi‑year net‑worth projections.
- Cash‑flow forecasts should be limited to **6–12 months** to reduce uncertainty.

### Granularity

- Monthly granularity is sufficient for V1.
- Weekly or daily views may be added later for specific short‑term risk alerts.


## 7. Scenario engine

### Scenario types

The engine supports two primary categories:

1. **User‑initiated scenarios** — the user directly manipulates parameters.
   - "Save ₹1,000 more per month."
   - "Reduce food delivery spend by ₹800."
   - "Pause vacation goal."
   - "Increase salary (promotion) by ₹5,000."
   - "Add side income of ₹3,000/month."

2. **System‑suggested scenarios** — generated from leaks, goals, or behavior.
   - "Apply this leak reduction recommendation."
   - "Shift ₹500 from low‑priority goal to Emergency Fund."
   - "Temporarily pause a Low priority goal to hit Emergency Fund earlier."

### Scenario representation

A **Scenario** is represented as a delta on top of the current path:

```json
{
  "scenario_id": "sc_001",
  "label": "Reduce Swiggy by ₹700/month",
  "description": "Cut food delivery and redirect ₹700/month to Emergency Fund.",
  "deltas": {
    "category_spend": {"food_delivery": -700},
    "goal_contribution_overrides": {"goal_001": 700},
    "income_delta": 0,
    "side_income_delta": 0
  },
  "origin": "recommendation_engine" 
}
```

### Scenario evaluation

When evaluating a scenario, the engine:

1. Applies deltas to contributions and spending.
2. Re‑runs the allocation engine (from Goal OS) with updated parameters.
3. Computes new projected goal completion dates, health, and confidence for affected goals.
4. Computes changes to cash‑flow surplus and risk indices.


## Forecast Constraints Engine

The **Forecast Constraints Engine** must run after the Scenario Engine and before confidence estimation or final forecast output generation.

Purpose

Prevent impossible, unrealistic, or policy‑violating forecasts before they are shown to users or converted into recommendation candidates.[file:2]

Inputs

- Income
- Expenses
- Monthly surplus
- Goal dependencies
- Goal priorities
- Contribution models
- Scenario deltas

Validation rules

### Cash Flow Rule

Cannot allocate more than available surplus.

Example:

- Income = ₹40,000
- Expenses = ₹35,000
- Surplus = ₹5,000
- Requested contribution = ₹10,000
- Result = Invalid

### Negative Cash Flow Rule

Cannot create persistent negative monthly cash flow in an optimized or recommendation scenario.[file:2]

### Dependency Rule

Hard dependencies must be respected.

Example:

- Emergency Fund → House Goal
- House Goal should not be fully funded while Emergency Fund remains materially underfunded.[file:2]

### Essential Spending Floor

Essential categories such as food, utilities, rent, and transport cannot be reduced below minimum thresholds.[file:2]

### Behavior Realism Rule

Large jumps beyond observed behavior should reduce feasibility even if they are not strictly impossible.

Example:

- Current savings = ₹2,000/month
- Scenario savings = ₹25,000/month
- Result = Low feasibility, not necessarily invalid, but confidence should be heavily reduced.[file:2]

Constraint outcomes

Every evaluated scenario should produce a structured status:

```json
{ "status": "valid" }
```

or

```json
{ "status": "adjusted" }
```

or

```json
{ "status": "rejected" }
```

Example adjusted result:

```json
{
  "status": "adjusted",
  "requested_contribution": 10000,
  "allowed_contribution": 5000,
  "reason": "Insufficient surplus"
}
```

Why this matters

Without constraints, the Forecasting Engine becomes a **future fantasy generator**. With constraints, it becomes a true **decision support system**.[file:2]

## 8. Confidence engine

### Purpose

The Forecasting Engine must express how much trust to place in a forecast.

### Confidence components

Confidence for a forecast (and for each goal within it) should consider:

- **Data sufficiency:** how much history exists (income, contributions, spending).
- **Behavior stability:** variance in contributions and key spending categories.
- **Model alignment:** how well past forecasts matched actual outcomes.
- **Scenario extremity:** how far the scenario deviates from observed behavior (e.g. unrealistic cuts).

### Example interpretation

- **0.92 (92%)**: "High confidence; similar past changes for similar users behaved as expected." 
- **0.65 (65%)**: "Uncertain; your past contributions have been volatile."
- **0.40 (40%)**: "Low confidence; scenario assumes a drastic behavior change we have not seen before."

Confidence must be exposed both at the **forecast level** and per affected **goal**.


## 9. Sensitivity analysis

### Purpose

Sensitivity analysis identifies **which levers matter most** for a goal or set of goals.

Examples:

- Reducing food delivery by ₹700/month may pull an Emergency Fund 4 months earlier.
- Cancelling Netflix may only move the goal by a few days.

### Mechanism (conceptual)

For a given goal and time horizon:

1. Define a small set of candidate levers:
   - Specific spend categories (food delivery, subscriptions, entertainment).
   - Contribution amount.
   - Income changes.
2. Apply small unit changes (e.g. ±₹500, ±₹1,000) one at a time.
3. Measure the change in projected completion date and risk index.
4. Rank levers by their impact per unit change.

### Output

The engine should output a **ranked list of levers** with metrics like:

- "Reducing food delivery by ₹500/month saves 60 days."
- "Cancelling Subscription X saves 7 days."

This list can be surfaced directly or used to prioritize which recommendations to generate.[file:2]


## 10. Goal impact engine

### Responsibilities

The Goal Impact Engine is the bridge between forecasts and Goal OS.

Given a scenario, it must:

- Compute new projected completion dates for each goal.
- Recompute goal health_rank/health_label based on thresholds defined in PRD‑02.[file:2]
- Adjust goal confidence where appropriate.

### Health integration

Using provisional thresholds from Goal OS (e.g. On Track ≤15 days delay, Slightly Delayed 15–60, etc.), the engine updates:

- `health_rank`
- `health_label`
- `health_reason` (e.g. "Contributions increased; projected delay reduced from 90 to 20 days.")

### Confidence integration

- For scenarios that increase stability (e.g. consistent higher contributions), confidence may increase.
- For scenarios that depend on highly unlikely behavior, confidence should decrease.


## 11. Recommendation generation

### From forecasts to recommendations

The Forecasting Engine itself does **not** own recommendation ranking, but it produces structured outputs that PRD‑14 consumes to create recommendations.

For each evaluated scenario, it should emit:

- **Action candidates:** changes that lead to meaningful improvements (e.g. ≥30 days saved on a Critical goal).
- **Impact metrics:** time_saved_days, rupees saved per year, risk reduction.
- **Assumptions:** what changed (e.g. "reduce food delivery by ₹700/month and redirect to Emergency Fund").
- **Confidence:** forecast‑level and goal‑level confidence.

PRD‑14 then turns these into **Recommendation Objects** with Action, Impact, Reason, and Confidence.[file:2]

### Guardrails

- Do not generate recommendations for scenarios where confidence is too low.
- Prefer a small number of high‑impact scenario recommendations over many small ones.


## 12. Explainability requirements

Every forecast must be explainable.

### Minimum explanation payload

For each forecast:

- **Assumptions:** what changed (categories, contributions, income).
- **Baseline vs scenario:** original vs new completion dates and cash‑flow.
- **Key drivers:** top 1–3 levers responsible for most of the improvement.
- **Confidence:** numeric value plus short explanation.

### Example

"If you reduce food delivery by ₹700/month and redirect it to your Emergency Fund, we forecast that you will reach your 4‑month buffer 4 months earlier. This forecast assumes your income stays roughly the same and you maintain your current contribution patterns. Confidence: 88% based on your last 6 months of spending and similar users."

### UI expectations

- A "Why?" or "Details" affordance on forecast outputs.
- Clear visual distinction between assumptions and results.
- Use conservative language when confidence is low.


## 13. Comparison UX (Current vs Optimized)

The Forecasting Engine defines the data contract for **Current Path vs Optimized Path** comparisons that Command Center and goal views render.

### Data contract

For each relevant goal:

- Current path:
  - `baseline_completion_date`
  - `baseline_health_rank`, `baseline_health_label`
- Scenario path:
  - `projected_completion_date`
  - `projected_health_rank`, `projected_health_label`
  - `time_saved_days`

Plus scenario‑level:

- `scenario_label`, `scenario_id`
- `monthly_surplus_delta`
- `risk_index_delta`
- `confidence`

### UX implications

- Show **both** dates side‑by‑side.
- Emphasize the change in plain language ("3 months sooner").
- Allow users to toggle between multiple scenarios.


## 14. API contracts

### Inputs

Endpoints / functions should accept:

- User identifier and optional subset of `goal_ids`.
- Scenario definitions (deltas as described above).
- Flags for which outputs are needed (e.g. goals only, goals + cash‑flow, sensitivity analysis).

### Outputs

Return:

- Forecast objects with assumptions, outputs, confidence.
- Goal‑level impact data usable by Goal OS.
- Scenario‑derived recommendation candidates for PRD‑14.


## 15. Forecast events system

In addition to analytics counters, the Forecasting Engine should emit **domain events** that other systems can react to.

Core events:

- `forecast_generated`
- `forecast_viewed`
- `forecast_compared`
- `forecast_applied`
- `forecast_expired`
- `forecast_recomputed`

Examples of downstream use:

- `forecast_applied` → Recommendation Engine suppresses duplicate or now‑redundant recommendations.
- `forecast_recomputed` → Goal OS refreshes impacted health and confidence surfaces.
- `forecast_expired` → UI hides stale forecast cards or marks them as outdated.

These events should be treated as domain events, not just analytics, so future systems can subscribe to them reliably.[file:2]

## 16. Analytics and instrumentation

Key metrics:

- Number of forecasts run per user per week.
- Distribution of scenario types (user‑initiated vs system‑suggested).
- Average confidence values and their relationship with realized outcomes.
- Time‑to‑render for forecasts (performance).

Events:

- `forecast_created` (with scenario_id, goal_ids, confidence).
- `forecast_viewed`.
- `forecast_compared` (when user toggles between scenarios).
- Links to `recommendation_accepted` and `goal_completed` for longer‑term validation.


## 17. Success criteria and gates

### Pilot gate

- ≥ X% of active users run at least one forecast within their first 30 days.
- Qualitative feedback that forecasts are understandable and feel realistic.
- No major trust complaints (e.g. "forecasts were wildly wrong") during pilot.

### Production gate

- Measurable improvement in FDIR for users who engage with forecasts vs those who do not (controlling for other factors).
- Stable or improving Trust Score for forecast‑driven recommendations.
- Acceptable latency and error rates under pilot‑like load.


## 18. Forecast accuracy tracking

Over time, FinTrac should compare predicted outcomes with actual user outcomes to improve model quality and trust.

Purpose:

- Measure whether forecasts are directionally and quantitatively accurate.
- Improve model calibration over time.
- Support confidence calibration and user trust reporting.

Metrics:

- **Prediction Error** — difference between projected and realized outcomes.
- **Goal Completion Error** — difference between predicted and actual goal completion dates.
- **Confidence Calibration** — whether 90% confidence forecasts are correct roughly 90% of the time.

This section becomes especially important once FinTrac starts learning from real user behavior at scale.[file:2]

## 19. Forecast quality framework

Every forecast must provide five elements to be considered valid:

- **Outcome** — what happens? (e.g. "Emergency Fund completed in October 2026").
- **Impact** — what changed relative to baseline? (e.g. "4 months sooner").
- **Assumptions** — what is being changed? (e.g. "Food delivery reduced by ₹700/month").
- **Confidence** — how certain is the system? (e.g. "88%").
- **Explanation** — why does the model believe this outcome is plausible?

If any of these five elements are missing, the forecast should be treated as incomplete or invalid for user‑facing surfaces.[file:2]

## 20. Risks and open questions

Risks:

- Over‑optimistic forecasts erode trust.
- Users misinterpreting low‑confidence scenarios as guarantees.
- Complexity of scenarios overwhelming users.

Open questions:

- Exact confidence calibration methods and thresholds.
- How aggressively to surface sensitivity analysis vs simpler stories.
- When to graduate from simple rule‑based models to more complex statistical or ML forecasts.

These should be refined based on pilot data and user research, in coordination with Goal OS and Recommendation Engine owners.[file:2]

