# FinTrac Product Requirements (PRD)

## 1. Purpose of this document

This document sits beside the **Production Readiness Implementation Guide** and the **Product Experience & Differentiation Roadmap** and answers a different question: not only *why* and *what* to build, but **how each core feature should behave** at the product level.

- The readiness guide focuses on security, compliance, infrastructure, reliability, and pilot discipline.
- The roadmap focuses on positioning, behavioral differentiation, and long‑term vision.
- This PRD index focuses on concrete, testable behavior for each major feature.

Each feature listed here should eventually have its own dedicated PRD file (e.g. `future-simulator-prd.md`), using the shared template in section 4.

## 2. Product pillars and north star

FinTrac is a **Financial Decision Operating System**: it exists to help users make better financial decisions today by showing how those decisions change tomorrow.

Every feature must satisfy at least one of the three Decision Rule pillars:

1. **Improve Decisions** — help users understand trade‑offs, simulate outcomes, or choose a better path.
2. **Increase Trust** — make the system more transparent, auditable, and safe.
3. **Strengthen Habits** — reinforce positive financial behavior over time.

The company‑level **North Star Metric** is:

> **Financial Decision Improvement Rate (FDIR)** — percentage of recommendations that lead to a measurable positive user action within a defined attribution window.

All feature PRDs should map their success metrics back to FDIR (directly or indirectly) plus any supporting health metrics (e.g. retention, task completion, error rates).

In addition to FDIR, FinTrac maintains an **internal Trust Score** that is not directly shown to users but is used to monitor whether the system is earning or losing trust.

Trust Score inputs may include:

Trust Score inputs may include:

- Recommendation acceptance vs rejection and ignore rates.
- Explainability usage (do users open "why" views before acting?).
- Correction rate on classifications and recommendations.
- Feedback sentiment from explicit comments or surveys.

If Trust Score degrades materially while other metrics look healthy, the product team should treat that as a critical signal that something is wrong in the experience or model behavior.

**Core product primitive — Recommendation Engine.** All major product surfaces eventually produce, consume, explain, or evaluate recommendations: goals generate recommended contributions, the simulator suggests behavioral changes, leaks and subscriptions propose cuts, weekly reviews and behavior views highlight actions to take. The Recommendation Engine PRD is therefore the heart of the product and should be treated as a first‑class platform, not just a UI detail.

- Recommendation acceptance vs rejection and ignore rates.
- Explainability usage (do users open "why" views before acting?).
- Correction rate on classifications and recommendations.
- Feedback sentiment from explicit comments or surveys.

If Trust Score degrades materially while other metrics look healthy, the product team should treat that as a critical signal that something is wrong in the experience or model behavior.

## 3. Feature PRD index

Each row below represents a **separate PRD document** that should be created and maintained. This index is intentionally strategic and high‑level; detailed behavior belongs in the individual PRDs.

| Domain        | Priority | ID    | Feature / Surface            | Primary Pillar(s)                         | User Journey Stage(s)         | Notes / Dependencies                              |
|--------------|----------|-------|------------------------------|-------------------------------------------|-------------------------------|---------------------------------------------------|
| Decision     | P0       | PRD‑01 | Financial Command Center     | Improve Decisions                         | Awareness, Visibility         | Depends on reliable data ingestion and categorization. |
| Decision     | P0       | PRD‑02 | Goal Operating System        | Strengthen Habits, Improve Decisions      | Visibility, Optimization      | Ties to Future Simulator, Journey Map.           |
| Decision     | P0       | PRD‑03 | Future Simulator             | Improve Decisions                         | Optimization                  | Consumes goals, habits, and transaction patterns. |
| Decision     | P0       | PRD‑14 | Recommendation Engine        | Improve Decisions                         | Understanding, Optimization   | Central logic for what advice to show and in what order. |
| Trust        | P0       | PRD‑04 | Explainability Layer         | Increase Trust                            | Understanding, Optimization   | Shared pattern across classifier, leaks, simulator. |
| Trust        | P1       | PRD‑12 | Trust & Transparency Center  | Increase Trust                            | All stages                    | Surfaces consent, audit trail, data controls.    |
| Behavior     | P1       | PRD‑05 | Financial Health Score       | Improve Decisions                         | Visibility                    | Summary metric; supports, not replaces, deeper views. |
| Behavior     | P2       | PRD‑06 | Behavior Intelligence Dashboard | Improve Decisions                      | Understanding                 | Uses behavioral models and corrections data.     |
| Behavior     | P2       | PRD‑07 | Financial Leak Detection     | Improve Decisions                         | Optimization                  | Reuses transaction and subscription intelligence. |
| Behavior     | P2       | PRD‑08 | Subscription Intelligence    | Improve Decisions                         | Optimization                  | Subset of leaks; strong, concrete actions.       |
| Habit        | P1       | PRD‑09 | Weekly Financial Review      | Strengthen Habits                         | Optimization                  | Weekly ritual; pulls from scores, goals, leaks.  |
| Habit        | P3       | PRD‑10 | Financial Timeline           | Strengthen Habits                         | Understanding, Optimization   | Narrative history of key events and streaks.     |
| Habit        | P3       | PRD‑11 | Financial Journey Map        | Strengthen Habits, Improve Decisions      | Understanding, Optimization   | Long‑range view of goals and independence.       |
| Automation   | P4       | PRD‑13 | Execution Layer (Automation) | Improve Decisions, Strengthen Habits, Increase Trust | Automation           | Orchestrates safe "click‑to‑do" flows with explicit consent. |

### 3.1 Feature dependency diagrams (conceptual)

High‑level dependencies between domains can be visualized as follows. These diagrams are conceptual; individual PRDs should specify precise data and service dependencies.

Decision flow:

Transactions → Command Center → Goals → Future Simulator → Recommendation Engine → Explainability → Trust Center

Behavior flow:

Transactions → Behavior Engine (models and scores) → {Health Score, Leak Detection, Weekly Review, Timeline, Journey Map}

Seeing these flows helps new engineers and product contributors understand where a given feature sits in the overall system within minutes.


## 4. Standard feature PRD template

Each feature should have its own PRD file using the template below. Replace "[Feature]" with the concrete feature name (e.g. "Future Simulator").

### 4.1 Header

- **Feature name:** [Feature]
- **Owner:** Product lead / engineer responsible.
- **Related pillars:** Improve Decisions / Increase Trust / Strengthen Habits.
- **Related metrics:** How this feature moves FDIR; any supporting metrics (e.g. weekly active users for this surface, completion rate, accuracy, trust scores).
- **User journey stages:** Awareness / Visibility / Understanding / Optimization / Automation.
- **Dependencies:** Other systems or PRDs this feature relies on (e.g. Goal OS, Explainability, data ingestion).

### 4.2 Problem statement

- What specific user problem does this feature solve?
- How do users currently experience this problem (inside or outside FinTrac)?
- What happens if FinTrac does nothing?

### 4.3 Goals and non‑goals

- **Goals:** 3–5 clear, testable outcomes the feature should achieve.
- **Non‑goals:** Behaviors or use cases explicitly out of scope for this feature, to prevent scope creep.

### 4.4 User stories by journey stage

For each relevant user stage, describe the key user stories.

- **Visibility:** e.g. "As a user, I want to see my [Feature‑specific] state at a glance so I understand where I stand."
- **Understanding:** e.g. "As a user, I want to know *why* FinTrac is showing this [Feature output] so I can trust it."
- **Optimization:** e.g. "As a user, I want to see how changing X affects my outcome so I can choose the best path."
- **Automation (if relevant):** e.g. "As a user, I want FinTrac to execute the agreed change safely with my consent."

### 4.5 Success gates

Define clear gates for moving the feature from **Build → Pilot → Validated → Production**.

- **Pilot gate examples:** understanding rate, adoption rate, repeat usage. For Future Simulator, this might be: N% of users report they understand the output, M% create at least one scenario, and K% adopt at least one simulator‑driven recommendation.
- **Production gate examples:** measurable impact on FDIR, stable recommendation confidence, user trust or satisfaction scores above a threshold, acceptable error/complaint rate.

No feature should be considered "done" until its success gates are met and instrumented.

### 4.6 Detailed behavior

For each relevant user stage, describe the key user stories.

- **Visibility:** e.g. "As a user, I want to see my [Feature‑specific] state at a glance so I understand where I stand."
- **Understanding:** e.g. "As a user, I want to know *why* FinTrac is showing this [Feature output] so I can trust it."
- **Optimization:** e.g. "As a user, I want to see how changing X affects my outcome so I can choose the best path."
- **Automation (if relevant):** e.g. "As a user, I want FinTrac to execute the agreed change safely with my consent."

### 4.5 Detailed behavior

Describe **how the feature works**, not just what screens exist.

- Inputs (data sources, user inputs).
- Core logic (how decisions, scores, or simulations are computed at a product level).
- Outputs (what the user sees; any notifications/digests produced).
- State transitions (how states change over time, e.g. from "suggested" to "accepted" to "completed").

This section should include:

- Happy‑path flows (step‑by‑step from first entry to desired outcome).
- Empty‑state behavior (what users see when there is not enough data).
- Failure states (what happens when data or external services are unavailable).

### 4.7 UX principles and constraints

- Layout and hierarchy guidelines (e.g. keep time‑to‑first‑insight under N seconds).
- Accessibility expectations.
- Mobile vs desktop considerations.
- Copy principles (e.g. avoid jargon; show concrete rupee amounts and time impacts where possible).

### 4.8 Edge cases and guardrails

- Known edge cases (e.g. zero income months, highly volatile expenses, multiple currencies).
- Safety guardrails (e.g. limits, confirmations, cool‑down periods for automation).
- How the feature behaves when upstream models or services fail.

### 4.9 Analytics and instrumentation

- Events and properties that must be tracked (e.g. viewed, interacted, accepted, rejected, modified).
- How success is measured in terms of FDIR and feature‑specific metrics.
- Any dashboards or alerts required.

### 4.10 Risks and open questions

- Key product risks (e.g. misinterpretation, over‑confidence, privacy perceptions).
- Technical risks (e.g. performance, data quality, external dependencies).
- Open questions that must be resolved before implementation or GA.

## 5. Example: Future Simulator PRD outline (PRD‑03)

This section shows a **filled‑in outline** for one critical feature; the full PRD should live in its own file.

- **Feature name:** Future Simulator
- **Primary pillars:** Improve Decisions; Strengthen Habits (indirectly via goal acceleration).
- **User journey stage focus:** Optimization (with dependencies on Visibility and Understanding).
- **Core promise to user:** "Show me how changing today's behavior changes the dates of my goals and my long‑term outcomes."

### 5.1 Key goals

- Let users compare **current path vs optimized path** for key goals.
- Help users answer concrete questions like "If I reduce food delivery by ₹1,000 per month, when do I hit my emergency fund target?".
- Produce recommendations that can be traced into higher FDIR (users actually follow through with changes).

### 5.2 Non‑goals

- Not a full financial‑planning suite or investment advisory tool.
- Not a generic scenario editor for every possible financial variable; start with a small, opinionated set (income, savings rate, selected spending categories, goal contributions).

### 5.3 Behavior summary

- Uses existing goals, income, savings rate, and selected habit variables as inputs.
- Displays a side‑by‑side view: **Current Path** vs **Adjusted Path** with estimated completion dates for each major goal.
- Integrates with Explainability so users can see which assumptions drive output.
- Emits events when users explore scenarios and when they commit to a change (e.g. "lock in new monthly cap").

The full Future Simulator PRD should expand each of the template sections (problem statement, user stories, detailed flows, edge cases, analytics, risks) using this outline as its starting point.

---

This PRD index should remain relatively short and strategic. Individual feature PRDs should carry the detailed behavior and implementation requirements, so the main readiness guide and roadmap do not balloon into a 300‑page all‑in‑one document.


## 6. FinTrac MVP definition

The PRD index intentionally covers more than the first release. To avoid accidental over‑building, FinTrac should maintain a clear MVP definition.

**MVP — must have for first meaningful pilot:**

- ✓ Command Center (PRD‑01)
- ✓ Goal Operating System (PRD‑02)
- ✓ Future Simulator (PRD‑03)
- ✓ Recommendation Engine (PRD‑14)
- ✓ Explainability Layer (PRD‑04)
- ✓ Trust & Transparency Center (PRD‑12)

**Not required for MVP (can follow once core loop works):**

- ✗ Timeline (PRD‑10)
- ✗ Journey Map (PRD‑11)
- ✗ Subscription Intelligence (PRD‑08)
- ✗ Advanced Behavior Dashboard (PRD‑06 beyond basics)
- ✗ Execution Layer / Automation (PRD‑13)

This explicit MVP list should be updated sparingly; changes should be deliberate decisions, not the result of ad‑hoc feature creep.
