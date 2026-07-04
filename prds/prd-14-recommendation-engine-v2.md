# PRD‑14 — Recommendation Engine

## 1. Overview and purpose

The Recommendation Engine is the **core product primitive** of FinTrac.

Every major surface in the product either **produces**, **consumes**, **explains**, or **evaluates** recommendations: the Command Center, Goal OS, Future Simulator, Leak Detection, Weekly Review, Behavior views, and the Trust Center.

This PRD defines **how FinTrac decides what to recommend and in what order**, how recommendations are scored, ranked, explained, tracked, and attributed back to measurable improvements in user decisions.[file:1][file:2]


## 2. Alignment with product strategy

### 2.1 FinTrac mission and Decision Rule

FinTrac exists to help users make better financial decisions today by showing how those decisions change tomorrow.[file:1]

Every recommendation must satisfy at least one of the FinTrac Decision Rule pillars:

1. **Improve Decisions** — show a clear, better path than the current trajectory.
2. **Increase Trust** — make the system safer, more transparent, or more controllable.
3. **Strengthen Habits** — reinforce helpful behavior and reduce self‑sabotaging patterns.[file:1][file:2]

If a proposed recommendation type cannot be mapped to at least one of these pillars, it should not be implemented.

### 2.2 North Star metric and Trust Score

The Recommendation Engine is the primary driver of:

- **Financial Decision Improvement Rate (FDIR)** — percentage of recommendations that lead to measurable positive user actions in a defined attribution window.[file:1]
- **Internal Trust Score** — an internal metric derived from recommendation acceptance vs rejection, explainability usage, correction rate, and feedback sentiment.[file:2]

All logic in this PRD should ultimately be evaluated against its impact on FDIR and Trust Score.

### 2.3 User journey stages

Recommendations should be aware of where the user is in the FinTrac user journey:

- Stage 1 — Awareness: "I don't know where my money goes."
- Stage 2 — Visibility: "Now I know where it goes."
- Stage 3 — Understanding: "Now I know why it goes there."
- Stage 4 — Optimization: "Now I know what to change."
- Stage 5 — Automation: "Now FinTrac helps me do it."

Early‑stage users should receive simpler, more foundational recommendations (visibility, leaks, basic savings), while later stages unlock more advanced optimization and automation.


## 3. Scope and non‑scope

### 3.1 In scope

This PRD covers:

- The **taxonomy of recommendation types** FinTrac supports in the next 12–18 months.
- The **scoring model** used to prioritize recommendations.
- **Ranking and orchestration** rules for which recommendation appears first in a given context.
- The **recommendation lifecycle** from generation to completion or abandonment.
- **FDIR attribution rules** connecting recommendations to measurable user actions.
- **Explainability requirements** for every recommendation.

### 3.2 Out of scope

The following are out of scope for this document and owned by other PRDs:

- Exact UI layouts for surfaces like Command Center, Weekly Review, or Timeline.
- Low‑level ML model architectures for risk scoring or text classification.
- Legal and regulatory details for execution flows (Execution Layer PRD).
- Data ingestion, parsing, and classification pipelines (covered by readiness guide and classifier PRDs).[file:2]


## 4. Recommendation taxonomy

The engine supports a small, opinionated set of **recommendation types**, each with clear semantics and measurement.

### 4.0 Source architecture (conceptual)

Most recommendations flow through a common pipeline:

Goals → Future Simulator → Recommendation Generator → Scoring Engine → Ranking Engine → Recommendation Feed

and

Transactions → Behavior Engine (health, leaks, patterns) → Recommendation Generator → Scoring Engine → Ranking Engine → Recommendation Feed

Trust‑related recommendations originate from the Trust Center but still pass through the same generator, scoring, and ranking stages.

This architecture ensures that all sources eventually produce a unified recommendation object that downstream surfaces can consume.



### 4.1 Savings Opportunity

Purpose: Increase savings without major lifestyle disruption.

Examples:

- "Move ₹2,000 to your emergency fund this month to stay on track."
- "Round up your salary‑day transfer by ₹500 to hit your laptop goal earlier."

Primary pillars: Improve Decisions, Strengthen Habits.

### 4.2 Leak Reduction

Purpose: Eliminate quiet money leaks.

Examples:

- "Cut late‑night food delivery by ₹1,000 per month; you save ₹12,000 per year."
- "Cancel/ downgrade this unused subscription; you save ₹119 per month."

Primary pillars: Improve Decisions.

### 4.3 Goal Acceleration

Purpose: Bring emotionally important goals closer.

Examples:

- "Increase your emergency fund contribution by ₹700; you reach 4 months of runway 3 months earlier."
- "Pause low‑priority spending to buy your bike 2 months sooner."

Primary pillars: Improve Decisions, Strengthen Habits.

### 4.4 Risk Alert

Purpose: Warn users about unhealthy or dangerous patterns.

Examples:

- "Your balance has gone negative twice this month; consider reducing discretionary spend."
- "EMI payments are consuming 60% of income; flag as high risk."

Primary pillars: Improve Decisions, Increase Trust.

### 4.5 Behavior Change

Purpose: Nudge behavior patterns linked to poor outcomes.

Examples:

- "Weekend spending is 2× weekdays; cap Friday‑Sunday food delivery at ₹X."
- "You broke your consistency streak; try a smaller, easier target this week."

Primary pillars: Strengthen Habits.

### 4.6 Trust Action

Purpose: Increase user trust, control, and transparency.

Examples:

- "Review data sources used for your recommendations."
- "Download a copy of your data and audit history."
- "Review and update your consent settings."

Primary pillars: Increase Trust.

### 4.7 System hygiene and meta‑recommendations

These are internal or low‑frequency recommendations aimed at product quality, not day‑to‑day decisions (e.g. "Help us correct this misclassified transaction"), and should be rate‑limited so they never dominate the feed.


## 5. Inputs and data model

### 5.1 Core inputs

The engine consumes:

- **Transactions:** categorized, time‑stamped, with merchant and channel when available.[file:2]
- **Goals:** targets, current progress, deadlines, priority labels.[file:1]
- **Behavior signals:** consistency scores, impulse markers, day‑of‑week patterns, streaks.
- **Leaks and subscriptions:** detected recurring charges, unused services, duplicate services.
- **Simulator outputs:** projected goal dates under different scenarios, sensitivity to changes.[file:1]
- **User preferences:** risk tolerance, categories to avoid touching, opt‑out flags for certain recommendation types.
- **Trust signals:** previous acceptance/rejection history, ignored rate, complaint rate.

### 5.2 Minimal viable feature set

For the first iteration, the Recommendation Engine should support at least:

- Savings Opportunity
- Leak Reduction
- Goal Acceleration
- Trust Action (basic consent and data‑control prompts)

with clear attribution mechanisms for each.

### 5.3 Recommendation object schema

All recommendations are represented as a common object so that any FinTrac service can produce or consume them.

Example JSON shape:

```json
{
  "id": "rec_123",
  "type": "goal_acceleration",
  "title": "Reach Emergency Fund Faster",
  "description": "Increase savings by ₹1000/month",
  "impact": {
    "money": 12000,
    "time_saved_months": 2
  },
  "confidence": 0.91,
  "urgency": 0.7,
  "effort": 0.2,
  "score": 84,
  "status": "generated",
  "source": "future_simulator",
  "goal_id": "goal_001",
  "expires_at": "2026-03-01T00:00:00Z",
  "snoozed_until": null,
  "created_at": "2026-02-01T00:00:00Z",
  "updated_at": "2026-02-01T00:00:00Z"
}
```

Required fields:

- `id` — unique identifier.
- `type` — one of the supported recommendation types.
- `title` / `description` — user‑facing text.
- `impact` — structured impact metrics (money, time, risk indices).
- `confidence`, `urgency`, `effort`, `score` — numeric fields used by the scoring and ranking engine.
- `status` — lifecycle state (see section 8).
- `source` — origin subsystem (simulator, leaks, goals, behavior engine, trust center, etc.).
- `created_at`, `updated_at` — timestamps.

Optional but recommended:

- `goal_id` or other entity references.
- `expires_at` — when the recommendation should automatically be considered stale.
- `snoozed_until` — when the recommendation may re‑enter the feed if snoozed.

All future surfaces should consume this object rather than invent their own schema.


For the first iteration, the Recommendation Engine should support at least:

- Savings Opportunity
- Leak Reduction
- Goal Acceleration
- Trust Action (basic consent and data‑control prompts)

with clear attribution mechanisms for each.


## 6. Recommendation scoring model

### 6.1 Base formula

Core scoring formula for a candidate recommendation:

\[
Score = \frac{Impact \times Confidence \times Urgency}{Effort}
\]

Where:

- **Impact:** estimated magnitude of improvement if the user accepts (e.g. rupees saved per year, months pulled forward on a goal, reduction in risk score).
- **Confidence:** model‑estimated probability that the recommendation is correct and helpful, based on historical patterns and FDIR for similar recommendations.
- **Urgency:** measure of time‑sensitivity (e.g. risk of overdraft this week, deadline proximity).
- **Effort:** qualitative or quantitative estimate of effort and friction for the user to act (cognitive effort, number of steps, amount of behavioral change).

All four components should be normalized to comparable scales before combination (e.g. 0–1 or 0–100). Effort should never be zero.

### 6.2 Component definitions

- **Impact**
  - Monetary: annualized savings, reduction in interest paid, increase in net worth.
  - Temporal: months pulled forward for a goal.
  - Risk: reduction in a risk index (e.g. probability of shortfall).

- **Confidence**
  - Based on: quality of data, stability of patterns, historical FDIR for this recommendation type and user cohort.
  - Penalized when: data is sparse, model disagreement is high, or explainability is weak.

- **Urgency**
  - High for: upcoming due dates, repeated risk events, expiring offers.
  - Medium for: slowly compounding leaks.
  - Low for: long‑horizon optimizations without immediate consequences.

- **Effort**
  - Lower for: one‑tap subscription cancellations, small incremental increases in contributions.
  - Higher for: significant lifestyle changes, multi‑step manual actions.

### 6.3 Adjustments and constraints

- **Diversity penalty:** avoid showing multiple near‑identical recommendations (e.g. four different food‑delivery cuts) in the same session.
- **Type caps:** enforce maximum number of recommendations of each type per time window.
- **User fatigue:** reduce score for types the user frequently rejects or ignores.
- **Safety override:** block or heavily penalize any recommendation that conflicts with safety, compliance, or user‑stated constraints.


## 7. Ranking and orchestration

### 7.1 Global vs contextual ranking

The engine produces rankings at two levels:

1. **Global priority list** for the user (top N recommendations overall).
2. **Contextual priority lists** per surface (e.g. Command Center, Weekly Review, Goal detail screen).

Contextual lists are derived from the global list but may apply additional filters (e.g. only goal‑related recommendations on a Goal screen).

### 7.2 Example ranking scenario

FinTrac detects three candidates:

1. **Leak Reduction:** Reduce Swiggy by ₹1,200/month.
2. **Subscription:** Cancel a ₹99/month unused service.
3. **Goal Acceleration:** Increase goal contribution to reach emergency fund 1 month earlier.

Ranking should answer:

- Which appears first **on the Command Center**?
- Which appears first **inside the Goal OS view**?

Possible logic:

- On Command Center: choose the highest overall Score, but apply a slight preference for **Goal Acceleration** if the impact on a high‑priority goal is significant.
- On Goal OS view: always prefer **Goal Acceleration** and savings actions linked directly to that goal, even if a leak elsewhere yields slightly higher monetary impact.

This behavior must be deterministic and documented in code comments and analytics dashboards.

### 7.3 Ranking rules

When computing final rank for a surface:

1. Filter candidate recommendations by eligibility (type, stage, user preferences).
2. Compute base Score for each.
3. Apply diversity penalties and user‑fatigue adjustments.
4. Apply context‑specific boosts (e.g. goal‑related recommendations boosted on Goal views).
5. Sort by final score and display top K, with K tuned per surface.


## 8. Recommendation lifecycle

Recommendations have a **state machine** that enables precise tracking and FDIR attribution.

States:

1. **Generated** — candidate computed and stored.
2. **Shown** — rendered in any user surface.
3. **Viewed** — user scrolled into view or expanded card.
4. **Accepted** — user explicitly accepts (e.g. taps "Do this" or "Apply change").
5. **Completed** — downstream action confirmed (e.g. transfer executed, subscription canceled, budget cap created).
6. **Rejected** — user explicitly dismisses or says "No".
7. **Ignored** — shown but neither accepted nor rejected within a time window.

Transitions:

- Generated → Shown (when included in a surface's ranked list).
- Shown → Viewed (on impression event).
- Viewed → Accepted/Rejected/Ignored.
- Accepted → Completed (on confirmation from downstream system or durable state change).

Every state transition must emit an analytics event keyed by a **recommendation ID**, type, and user ID.


## 9. FDIR attribution

FDIR requires linking recommendations to actual improvements.

### 9.1 Attribution model

For each recommendation, define:

- **Target metric:** what outcome this recommendation intends to move (e.g. spending in a category, goal completion date, savings rate, risk index).
- **Attribution window:** time window in which behavior change is credited (e.g. 30 days for leaks, 90 days for goal contributions).
- **Baseline:** user’s behavior before recommendation (1–3 months typical).

A recommendation is counted as **successful** for FDIR if:

- It reaches **Completed**, and
- The target metric shows an improvement relative to baseline, within the attribution window, beyond a minimum threshold.

Examples:

- Leak reduction recommendation: category spend decreases by at least X% or ₹Y over the next Z days compared to baseline.
- Goal acceleration recommendation: projected completion date moves earlier and the new pattern persists for at least N contribution cycles.

### 9.2 Multi‑touch considerations

Users may receive multiple recommendations that affect the same metric. For MVP, start with **single‑touch attribution** (credit the most recent relevant completed recommendation), then evolve toward multi‑touch models as data volume increases.

### 9.3 Reporting

The engine must:

- Compute FDIR by recommendation type, cohort, and user stage.
- Feed summary stats into the admin dashboard (e.g. top performing rec types, under‑performing cohorts).
- Expose per‑user history for support and debugging.


## 10. Explainability requirements

Every recommendation must be explainable.

Minimum explainability payload per recommendation:

- **Why now?** — trigger or condition that caused this recommendation (e.g. "4 recurring payments detected", "weekend spending 2× baseline").
- **Data sources used** — categories, goals, time period.
- **Impact estimate** — rupees saved, months gained, risk reduction.
- **Confidence** — numeric or qualitative band plus short text justification.
- **Model version** — identifier for the scoring or rule version.

UI requirements:

- A **"Why?" or "Details" affordance** on every recommendation card.
- Explainability content must be consistent across surfaces (Command Center, Weekly Review, etc.).
- Heavy reliance on jargon should be avoided; use plain language and concrete examples.

Explainability events (open/close, scroll depth) should also feed into Trust Score and FDIR analyses.


## 11. UX and surfaces

The Recommendation Engine does not own exact pixel layouts but sets contract requirements for surfaces that show recommendations.

Surfaces include:

- Command Center
- Goal detail views
- Future Simulator result screens
- Leak and Subscription views
- Weekly Review
- Timeline and Journey Map nodes
- Trust & Transparency Center

For each surface, the owning PRD must define:

- Max number of recommendations shown at once.
- Priority types for that surface.
- How "dismiss" and "snooze" actions map to lifecycle events.


## 12. Edge cases and guardrails

Key edge cases:

- **Sparse data:** do not generate high‑confidence recommendations on limited history; prefer basic savings and trust actions.
- **Conflicting recommendations:** avoid recommending both "increase savings" and "increase discretionary spend" concurrently.
- **Overlapping metrics:** ensure two recommendations targeting the same metric are coordinated.
- **User constraints:** respect explicit opt‑outs (e.g. do not recommend changes to rent or fixed obligations).

Guardrails:

- Hard caps per day/week on intrusive recommendation types.
- No recommendations that could reasonably be interpreted as regulated investment, tax, or legal advice without appropriate compliance wrappers.

## 13. Preference learning and personalization

The engine must learn from user responses over time.

Examples:

- If a user repeatedly rejects or ignores food‑delivery reductions but consistently accepts goal‑acceleration recommendations, the engine should **down‑weight** similar leak‑reduction suggestions and **up‑weight** goal‑related suggestions for that user.
- If trust actions are frequently accepted, the engine can prioritize additional trust‑building recommendations until Trust Score stabilizes.

Mechanism:

- Maintain per‑user, per‑type statistics (accept, reject, ignore, snooze counts).
- Feed these statistics into the scoring model as **personalization weights** that modulate Impact, Urgency, or Effort.
- Apply caps so one pattern does not fully suppress important risk alerts.

This preference feedback loop becomes a key component of FinTrac's moat: over time, recommendations become uniquely tuned to each user, making the system harder to copy.

## 14. Analytics and instrumentation
### 14. Analytics and instrumentation

The Recommendation Engine must emit events enabling:

- FDIR calculation.
- Trust Score calculation.
- Per‑type and per‑surface performance.
- Drop‑off analysis along the lifecycle (Generated → Completed).

Events should be standardized with fields for:

- `user_id`, `recommendation_id`, `type`, `source_surface`, `state`, `timestamp`.
- For Completed: `delta_metric`, `metric_type`, and attribution metadata.


## 14. Success criteria and gates

### 14.1 Pilot gate

For an initial pilot (e.g. 50–200 users):

- ≥ X% of users report that recommendations are **clear and understandable** in surveys.
- ≥ Y% of active users **interact** with at least one recommendation per week.
- ≥ Z% of completed recommendations meet the FDIR success criteria.
- No severe trust issues (complaints, "creepy" feedback) triggered by recommendations.

Exact thresholds (X, Y, Z) should be pre‑defined before pilot, consistent with the readiness guide’s emphasis on pre‑registration of success metrics.[file:2]

### 14.2 Production gate

Before broad rollout:

- FDIR stable or improving over multiple cohorts.
- Trust Score stable or improving; no significant negative spikes tied to recommendation changes.
- No critical compliance or safety incidents linked to recommendation logic.
- Operational metrics (latency, error rates) within acceptable bounds.


## 15. Recommendation quality framework

A recommendation is only as good as the **specific action** it asks the user to take.

### 15.1 Definition of a good recommendation

Every user‑facing recommendation must include, in plain language:

- **Action** — what exactly should the user do? (e.g. "Reduce Swiggy spending by ₹700/month"; not "Save more money").
- **Impact** — what changes if they do it? (e.g. "You save ₹8,400/year"; "Your emergency fund completes 1 month earlier").
- **Reason** — why is this being recommended now? (e.g. "Weekend food delivery is 2× your weekday baseline over the last 3 months").
- **Confidence** — how sure is FinTrac? (e.g. "91% confidence based on your past 6 months of spending and similar users").

Recommendations that do not meet all four criteria should not be shipped to users.

### 15.2 Examples

- **Bad:** "Save more money." (No clear action, no quantified impact, no reason, no confidence.)
- **Good:** "Reduce Swiggy spending by ₹700/month. Impact: save ₹8,400/year and reach your emergency fund 1 month earlier. Reason: weekend Swiggy orders averaged ₹1,200/month over the last 3 months. Confidence: 91%."

### 15.3 Quality monitoring

- Periodically sample live recommendations and score them against the framework.
- Track a "Recommendation Quality Score" as an internal QA metric.
- Use user feedback (thumbs up/down, comments) to validate whether recommendations feel specific and useful.

## 16. Risks and open questions


Key risks:

- Over‑aggressive recommendations that feel pushy or judgmental.
- Under‑performing FDIR due to weak personalization or noisy data.
- Explainability that is technically correct but not user‑understandable.

Open questions:

- Exact FDIR thresholds per recommendation type.
- Initial parameterization of Impact, Confidence, Urgency, Effort scales.
- Balance between rules‑based vs learned ranking for early versions.

These should be refined collaboratively by product, data, engineering, and compliance as real pilot data arrives.

