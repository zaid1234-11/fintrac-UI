# PRD‑02 — Goal Operating System (Goal OS)

## Overview and purpose

The Goal Operating System (Goal OS) is the **emotional center** of FinTrac.

Where the Recommendation Engine is the core primitive, the Goal OS is the primary **context** in which users understand and feel the impact of their decisions.[file:1][file:2]

Its job is to answer three questions for every user:

1. **What am I trying to achieve?**
2. **Am I on track?**
3. **How can I reach it sooner?**

Every major decision surface — Command Center, Forecasting Engine, Recommendation Engine, Journey Map — should be able to anchor back to one or more goals, because goals are what users care about: emergency funds, laptops, bikes, houses, vacations, and ultimately financial freedom.[file:1]


## Alignment with product strategy

### Decision Rule pillars

Goal OS primarily supports:

- **Strengthen Habits** — by turning abstract saving into concrete, emotionally meaningful targets.
- **Improve Decisions** — by making trade‑offs visible in terms of goal timelines and probabilities.

It indirectly supports **Increase Trust** when predictions and states are explainable and consistent.[file:1]

### North Star metric and FDIR

Goal OS contributes to the North Star metric **FDIR** by:

- Producing **Goal Acceleration** and **Savings Opportunity** recommendations into the Recommendation Engine (PRD‑14).[file:1]
- Providing a clear baseline for measuring whether actions (cuts, contributions) actually accelerate goals.

Success gates for Goal OS must be framed in terms of:

- Percentage of active users with at least one **meaningful goal** configured.
- Percentage of users who **change behavior** (e.g. increase contributions, reduce leaks) in response to goal‑driven recommendations.

### User journey stages

Goal OS is relevant across multiple stages of the user journey:

- **Visibility:** show all current goals and their status at a glance.
- **Understanding:** explain why a goal is on track, delayed, or at risk.
- **Optimization:** suggest concrete changes to reach the goal sooner.
- **Automation:** orchestrate future auto‑moves or rule‑based contributions once Execution Layer exists.[file:1]


## Scope and non‑scope

### In scope

This PRD covers:

- Goal taxonomy and **Goal Types**.
- Goal object schema and **Goal States**.
- **Goal Health** and **Goal Confidence** definitions.
- How goals **generate recommendations** into PRD‑14.
- Integration with Forecasting Engine (PRD‑03) and Journey Map.
- UX flows for creating, editing, monitoring, and completing goals.
- Analytics, FDIR connections, and success gates for Goal OS.

### Out of scope

- Low‑level investment allocation or portfolio optimization logic.
- Execution of external actions (e.g. bank transfers, broker trades) — covered by Execution Layer (PRD‑13).
- Detailed simulator algorithms — covered by Forecasting Engine PRD (PRD‑03).

Goal OS defines **what it means** to have a goal in FinTrac and how that goal behaves and evolves over time.


## Goal taxonomy

### Core goal types

At MVP, FinTrac supports a small, opinionated set of goal types:[file:1]

1. **Emergency Fund** — buffer for N months of expenses.
2. **Laptop** — one‑time purchase.
3. **Bike** — one‑time purchase.
4. **House Down Payment** — large, longer‑term target.
5. **Vacation / Travel** — time‑bound experience.
6. **Financial Freedom** — long‑horizon wealth / income goal.

Each type may have type‑specific defaults and templates (e.g. default emergency fund target: 3–6 months of average expenses; default vacation timeframe: within 12 months).

### Custom goals (future)

Beyond MVP, users may define custom goals with their own labels and parameters, but initial UX should emphasize the above types to reduce cognitive load and align with the roadmap examples.[file:1]


## Goal object schema

### Data model

A **Goal** is represented as a structured object that other systems can consume.

Example JSON shape:

```json
{
  "id": "goal_001",
  "user_id": "user_123",
  "type": "emergency_fund",
  "name": "Emergency Fund",
  "description": "4 months of essential expenses",
  "target_amount": 80000,
  "currency": "INR",
  "current_amount": 32000,
  "start_date": "2026-01-01",
  "target_date": "2026-11-01",
  "priority_rank": 1,
  "priority_label": "critical",
  "state": "active",
  "health_rank": 1,
  "health_label": "on_track",
  "health_reason": "Consistent monthly contributions of ₹5,000.",
  "confidence": 0.92,
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-02-15T10:00:00Z",
  "completed_at": null,
  "archived_at": null,
  "simulated_completion_date": "2026-10-01",
  "source": "user",
  "tags": ["safety", "core"]
}
```

### Required fields

- `id`, `user_id`
- `type`, `name`, `target_amount`, `currency`
- `current_amount`, `start_date`, `target_date`
- `priority_rank`, `priority_label`
- `state`, `health_rank`, `health_label`, `confidence`
- `created_at`, `updated_at`

### Optional / derived fields


All services (Command Center, Simulator, Recommendation Engine, Journey Map) must operate on this shared schema.

## Goal contribution engine

The Goal Contribution Engine defines **how money actually flows into goals**. Without explicit contribution models, simulator outputs and recommendations become fuzzy.

### Contribution models

Each goal must declare one of the following contribution models (MVP set):

1. **Fixed Monthly**
   - Example: `₹5,000/month` to Emergency Fund.
   - Implemented as a fixed target contribution per month.

2. **Percentage of Savings**
   - Example: `20% of monthly savings` to a goal.
   - Requires a definition of "monthly savings" (e.g. income minus non‑goal spending); contributions adjust dynamically as savings change.

3. **Round‑Up Contributions**
   - Example: "Round every card transaction to the nearest ₹10/₹100 and allocate the difference to [Goal]."
   - MVP may simulate round‑ups using statement data rather than executing real‑time transfers until Execution Layer exists.[file:1][file:2]

4. **Manual Only**
   - User contributes whenever they choose; Goal OS tracks contributions but does not assume a schedule.

### Contribution model fields

Extend the Goal object with:

- `contribution_model` — one of `fixed_monthly`, `percentage_savings`, `round_up`, `manual`.
- `contribution_params` — structured params (e.g. fixed amount, percentage, rounding unit).

These fields are required inputs for Forecasting Engine and for generating Goal Acceleration recommendations.



All services (Command Center, Simulator, Recommendation Engine, Journey Map) must operate on this shared schema.


## Goal priority system

Priority determines **which goals should get attention and money first** when resources are limited.

### Priority levels

Goal OS uses four user‑visible priority levels:

- **Critical** — must be funded before others (e.g. Emergency Fund).
- **High** — important but not survival‑level (e.g. Laptop needed for work).
- **Medium** — nice‑to‑have with moderate impact (e.g. Vacation).
- **Low** — discretionary / optional (e.g. Gaming PC).

The `priority` field in the Goal object should be stored both as an ordered rank and a label.

### Effects of priority

Priority influences:

- **Recommendations** — high‑priority goals are more likely to generate Goal Acceleration and Savings Opportunity recommendations.
- **Simulator suggestions** — when disposable savings are insufficient for all goals, Critical and High goals are favored in allocation.
- **Future automation** — once Execution Layer exists, automated transfers should fund Critical goals first by default.

Goal OS must provide clear copy explaining priority implications to avoid user surprise.

## Goal states


Goal states capture where a goal is in its lifecycle.

### State definitions

- **Draft** — user has entered basic info but not committed (e.g. target amount or date missing).
- **Active** — goal is live; FinTrac tracks progress and includes it in recommendations.
- **At Risk** — goal is active but trending poorly (health issues). State flag is separate from health category but may be derived from it.
- **Paused** — temporarily inactive; contributions on hold, not used for FDIR attribution during pause.
- **Completed** — target reached or user marks as done.
- **Archived** — no longer relevant; hidden from primary views but kept for history.

### State transitions

- Draft → Active (user confirms goal setup).
- Active → At Risk (health rules triggered).
- Active/At Risk → Paused (user pauses).
- Active/At Risk/Paused → Completed (target reached or user confirms completion).
- Completed → Archived (optional, user or system tidy‑up).

Each transition must emit analytics events so the product can track goal lifecycles and success rates.


## Goal conflict resolution

Goal allocation engine

Purpose

Distribute the **available goal budget** across goals in a way that respects priorities, dependencies, and contribution models.

Inputs

- Available goal budget (estimated monthly amount available for goals).
- priority_rank and priority_label (Critical, High, Medium, Low).
- dependency_type and depends_on_goal_ids (hard vs soft dependencies).
- contribution_model and contribution_params per goal.
- Current goal health (On Track, Slightly Delayed, At Risk, Off Track).

Outputs

- A recommended monthly allocation plan per goal.

Example

Available budget: ₹10,000

- Emergency Fund (Critical): ₹6,000
- Laptop (High): ₹3,000
- Vacation (Medium): ₹1,000

Allocation rules

1. Respect hard dependencies (fund upstream goals like Emergency Fund before downstream goals like House Down Payment).
2. Fund Critical goals before High, High before Medium, Medium before Low.
3. Preserve minimum contributions for important goals where possible.
4. If the budget is insufficient to meet minimum contributions, generate a recommendation asking the user to adjust goals, dates, or priorities.

Users often define contributions that exceed their true monthly capacity.

Example:

- Emergency Fund — ₹5,000/month
- Bike — ₹5,000/month
- Vacation — ₹4,000/month
- Available for goals — only ₹6,000/month.

Without rules, simulations and recommendations become inconsistent.

### Available budget input

Goal OS must receive or compute an estimate of **monthly amount available for goals** (e.g. from cash‑flow analysis).

### Allocation rules (conceptual)

When total desired contributions > available budget:

1. Fully fund **Critical** goals up to their target contribution.
2. Allocate remaining budget pro‑rata among High, then Medium, then Low priority goals.
3. If budget is still insufficient, suggest reducing or pausing lower‑priority goals.

These rules must be shared with the Forecasting Engine and Recommendation Engine so all components use the same allocation logic.

### User‑visible behavior

When conflicts exist, surfaces should:

- Inform users that their current plan is not feasible.
- Offer suggested re‑allocations (e.g. "Reduce Vacation contribution to ₹1,000 and increase Emergency Fund to ₹4,000").

## Goal architecture flow (conceptual)

End‑to‑end processing can be visualized as:

Goal Creation → Goal Contribution Engine → Goal Allocation Engine → Goal Health Engine → Goal Confidence Engine → Goal Recommendation Layer → Forecasting Engine → Updated Goal State

This diagram should be reflected in data flows and code boundaries so new engineers can see how changes propagate through the system at a glance.

## Goal health





Goal **health** summarizes whether a goal is on track.

### Health categories

- **On Track** — projected completion date is on or before target date with healthy buffer.
- **Slightly Delayed** — projected completion date is somewhat later than target (e.g. 0–3 months delay).
- **At Risk** — projected completion date is significantly later than target, or contributions have dropped.
- **Off Track** — contributions have stopped or reversed; goal is drifting indefinitely.

### Inputs to health

- Historical contribution pattern (monthly or weekly).
- Variability of contributions.
- Remaining time vs remaining amount.
- Leak / spending patterns that threaten contributions.

### Health calculation (conceptual)

At a high level:

- Estimate **projected completion date** based on recent contribution rate and variance.
- Compare projected completion date to target date.
- Apply thresholds and stability checks (e.g. require several periods of under‑contribution before declaring "At Risk").

This calculation should be shared between Goal OS and Forecasting Engine to avoid conflicting dates.

### Provisional thresholds (pilot)

For V1, use simple delay‑based thresholds (to be validated with pilot data):

- **On Track**: projected completion within 0–15 days of target date.
- **Slightly Delayed**: projected completion 15–60 days after target date.
- **At Risk**: projected completion 60–180 days after target date.
- **Off Track**: projected completion more than 180 days after target date.

These values are **pilot defaults** only and should be revisited once real user behavior and variance are measured.


## Goal milestones

Between 0% and 100% completion, users need **visible progress markers**.

### Milestone thresholds

Default milestone levels:

- 25% of target amount
- 50% of target amount
- 75% of target amount
- 100% (completion)

Additional micro‑milestones (e.g. every ₹10,000) may be used for large goals.

### Usage

Milestones feed into:

- **Motivation and retention** — small celebrations and streaks.
- **Weekly Review** — "You reached 50% of your Emergency Fund this week."
- **Timeline and Journey Map** — milestone markers along the financial history.[file:1]

Goal OS must emit events when milestones are crossed so other systems can respond.

## Goal confidence


**Goal Confidence** expresses how likely it is that the user will hit the goal by the target date (or within an acceptable window).

### Definition

- Confidence is a value between 0 and 1 (or 0–100%).
- It reflects both contribution behavior and income/spend volatility.

### Factors

- Consistency of past contributions.
- Ratio of target to income and typical savings.
- Presence of conflicting goals and leaks.

### Interpretation

Examples:

- **0.92 (92%)** — "Very likely; contributions are stable and sufficient."
- **0.60 (60%)** — "Uncertain; you are under‑contributing or spending is volatile."
- **0.30 (30%)** — "Unlikely; contributions are rare or much too small."

UI surfaces should map confidence into plain text and color bands, and explain *why* confidence is high or low.

## Goal explainability

Goal OS must provide **explanations** for health and confidence states.

Example: user sees `Goal Health: At Risk` and taps "Why?".

Explainability panel should show:

- **Target:** target amount and date (e.g. ₹100,000 by March 2027).
- **Current:** current amount (e.g. ₹30,000).
- **Expected:** what current amount *should* be by now (e.g. ₹42,000) based on original plan.
- **Contribution drop:** change in contribution rate (e.g. −35% vs previous months).
- **Estimated delay:** projected delay (e.g. 4 months later than target).

This mirrors the Recommendation Engine’s explainability standards and directly supports the Trust pillar by making goal status auditable and understandable.[file:1]



## Goal recommendations (integration with PRD‑14)

Every **Active** goal should be capable of generating recommendations into the Recommendation Engine.[file:1]

### Recommendation types from goals

The main goal‑driven recommendations are:

- **Goal Acceleration** — increase contributions, redirect leak savings, or reorder priorities to bring the goal earlier.
- **Savings Opportunity** — shift small amounts from lower‑priority spend into goal contributions.
- **Behavior Change** — adjust harmful patterns that are slowing progress.

### When to generate

- On goal creation.
- When health deteriorates (On Track → Slightly Delayed/At Risk/Off Track).
- When user interacts with Forecasting Engine.
- Periodically (e.g. monthly review cycles).

### Payload into Recommendation Engine

Goal OS must construct a fully‑formed **Recommendation Object** (see PRD‑14) with:

- Action (e.g. "Increase emergency fund contribution by ₹700/month").
- Impact (e.g. money per year, months earlier).
- Reason (e.g. "Your contributions have been ₹3,000/month vs ₹5,000/month target").
- Confidence (aligned with goal confidence and simulator output).


## Forecasting Engine integration

Goal OS defines the **goals**; Forecasting Engine defines the **paths**.

### Simulator inputs from Goal OS

For each goal, the simulator receives:

- Target amount and date.
- Current amount.
- Contribution rules (fixed, percentage‑of‑income, occasional top‑ups).
- Priority and dependencies (which goals can be slowed or paused).

### Simulator outputs back to Goal OS

Forecasting Engine returns:

- Simulated completion dates under different scenarios.
- Recommended contribution changes.
- Sensitivity metrics (how much impact each change has).

Goal OS then:

- Updates `simulated_completion_date` and health.
- Generates corresponding Goal Acceleration and Savings recommendations.

### UX expectations

From the user perspective:

- Every goal should have a **"Simulate"** action.
- Simulator results should clearly answer "Am I on track?" and "What happens if I change X?" for that specific goal.


## Goal dependency model

Some goals are naturally **dependent** on others.

Examples:

- Emergency Fund → House Down Payment (build safety before long‑term leverage).
- Laptop → Freelance Income Goal (tool before income expansion).

### Modeling dependencies

Extend the Goal object with:

- `depends_on_goal_ids`, `dependency_type`: list of goal IDs that should ideally be completed or reach a threshold before this goal is fully funded.
- `dependency_type`: `soft` or `hard` — whether the dependency is a strong requirement (e.g. Emergency Fund before House Down Payment) or a recommended ordering (e.g. Laptop before Freelance Income Goal).

### Behavioral implications

- When a dependency exists, Goal OS and Forecasting Engine should **prioritize upstream goals** in allocations and recommendations.
- Downstream goals may remain in Draft or low‑priority state until dependencies reach specified milestones.

### UX expectations

- Show dependency chains in goal details (e.g. "This goal depends on Emergency Fund reaching 100%").
- Warn when users try to over‑fund downstream goals while upstream goals are under‑funded.

## Journey Map integration (future dependency)
 (future dependency)

The Journey Map (PRD‑11) consumes Goal OS data.

### Inputs to Journey Map

For each goal:

- Type, name, and priority.
- Target and simulated completion dates.
- Historical milestones (created, first contribution, milestones reached, completed).

### Representation

- Goals appear along a timeline with status (On Track, At Risk, Completed).
- The map can show how today’s decisions shift the long‑term layout of goals, especially for Financial Freedom.

### Dependency

Goal OS must provide a clean API / data view for Journey Map, but Journey Map’s design and storytelling are specified in its own PRD.


## Goal creation and editing UX

### Creation flow

For MVP, goal creation should be simple and guided:

1. User selects a **Goal Type** (e.g. Emergency Fund, Laptop, Bike, House, Vacation, Financial Freedom).
2. FinTrac suggests defaults:
   - Emergency Fund: compute recommended target from recent expenses.
   - Laptop/Bike/Vacation/House: suggest common ranges, but let users edit.
3. User sets **target amount** and **target date** (or accepts defaults).
4. User sets **priority** (e.g. High, Medium, Low) and optional description.
5. FinTrac shows a first estimate: "At your current savings rate, you will reach this goal around [Date]."
6. User confirms, moving state from Draft → Active.

### Editing flow

Users can edit:

- Target amount and date.
- Name and description.
- Priority.

Edits should:

- Trigger recalculation of health and confidence.
- Potentially regenerate recommendations.

### Constraints

- Show warnings when target date is unrealistic given income and historical savings.
- Avoid letting users set contradictory priorities (e.g. too many "High" priorities without guidance).


## Goal monitoring UX

### Goal list view

- Shows all Active goals with key fields:
  - Name / type.
  - Progress bar (current vs target).
  - Health (On Track / Slightly Delayed / At Risk / Off Track).
  - Confidence band.
  - Target vs simulated completion date.

### Goal detail view

- Detailed timeline of contributions.
- Graph of projected vs actual progress.
- Health and confidence explanation.
- List of goal‑specific recommendations.
- "Simulate" and "Edit" actions.


## Goal completion experience

Goal completion should feel **rewarding and memorable**, not just a numeric change.

### Completion triggers

A goal can be marked Completed when:

- `current_amount ≥ target_amount`, and the user confirms completion, or
- The user manually marks it as completed (e.g. they bought the laptop at a slightly different price).

### Completion UX

On completion:

- Show a celebratory moment (animation, badge, milestone screen) that:
  - Recaps the journey (how long it took, how much was saved).
  - Highlights key behavior changes that made it possible.
- Invite the user to:
  - Allocate freed‑up contributions to other goals.
  - Add a new goal.

### Post‑completion behavior

- Move goal to Completed state; optionally Archive later.
- Update Journey Map with a milestone.
- Feed completion data into habit and FDIR analysis (how often goals are successfully reached).


## Edge cases and guardrails

Key edge cases:

- Multiple competing high‑priority goals.
- Significant income shocks (promotion, job loss) affecting feasibility.
- Currency changes or multi‑currency accounts.
- Users repeatedly creating and abandoning goals.

Guardrails:

- Avoid over‑promising: when confidence is low, be explicit about uncertainty.
- Prevent infinite proliferation of low‑quality goals by nudging users to refine or archive them.


## Goal events system (domain events)

In addition to analytics events, Goal OS should emit **domain events** that other systems can react to.

Core domain events:

- `goal_created`
- `goal_activated`
- `goal_milestone_reached`
- `goal_at_risk`
- `goal_paused`
- `goal_completed`
- `goal_archived`

These events are consumed by:

- Recommendation Engine — e.g. `goal_at_risk` triggers new Goal Acceleration recommendations; `goal_completed` suggests reallocating contributions or creating a new goal.
- Forecasting Engine — may re‑run projections when key events occur.
- Journey Map and Timeline — update narratives and milestones.

Domain events should be documented in an internal schema (e.g. event bus spec) so new services can subscribe without tightly coupling to Goal OS internals.

## Analytics and instrumentation


Goal OS must provide data for:

- Number and types of Active goals per user.
- Distribution of states (Draft, Active, At Risk, Paused, Completed, Archived).
- Health and confidence trends over time.
- Goal creation vs completion rates.
- Impact of goal‑driven recommendations on FDIR (via PRD‑14 attribution).

Events should include:

- `goal_created`, `goal_activated`, `goal_paused`, `goal_completed`, `goal_archived`.
- `goal_health_changed`, `goal_confidence_changed`.
- `goal_recommendation_generated` (linking to recommendation IDs).


## Success criteria and gates

### Pilot gate

- ≥ X% of active users have at least one Active goal after onboarding.
- ≥ Y% of users view their goal list or goal detail at least once per week.
- Clear, qualitative feedback that goals are understandable and feel meaningful.

### Production gate

- Steady or increasing **goal completion rate** over time.
- Measurable contribution to FDIR: users with configured goals show higher rates of recommendation‑driven behavior change than those without.
- High satisfaction/trust scores for goal‑related experiences; no significant complaints about misleading projections.


## Goal API contract (integration surface)

Goal OS is a **platform** that exposes structured outputs to other systems.

### Outputs to Recommendation Engine (PRD‑14)

For each goal:

- `goal_id`
- `type`, `priority`
- `health`, `health_reason`
- `confidence`
- `milestones` (recently crossed)

### Outputs to Forecasting Engine (PRD‑03)

For each goal:

- `goal_id`
- `target_amount`, `target_date`
- `current_amount`
- `contribution_model`, `contribution_params`
- `priority`
- `depends_on_goal_ids`, `dependency_type`

### Outputs to Command Center

For each goal:

- `goal_id`
- `name`, `type`
- `progress` (current vs target)
- `health`
- `next_milestone` (threshold and estimated date)

### Outputs to Journey Map / Timeline

For each goal:

- `goal_id`
- `type`, `name`, `priority`
- Milestones (amount and date)
- `completed_at` / `archived_at`
- `depends_on_goal_ids`, `dependency_type`

These contracts should be maintained in a shared schema definition so all services integrate consistently and avoid accidental drift.

## Goal success formula (conceptual)


Goal OS should convey a simple mental model of **what success looks like** for a goal.

Conceptually:

> Goal Success ≈ Progress + Consistency + Confidence

Where:

- **Progress** — how much of the target amount has been reached.
- **Consistency** — how reliably the user has contributed over time.
- **Confidence** — how likely it is that the goal will be reached on or near the target date.

This is not a strict mathematical formula, but a design principle guiding how health, confidence, and UX messaging are combined.

## Risks and open questions


Risks:

- Overly optimistic projections eroding trust.
- Users feeling overwhelmed by too many goals or too much configuration.
- Misalignment between Goal OS and simulator projections.

Open questions:

- Exact thresholds for health categories and confidence bands.
- How to prioritize goals when disposable income is limited.
- When and how to introduce more complex goal types (education, debt repayment) without overwhelming MVP.

These will be refined with pilot data and user research.

