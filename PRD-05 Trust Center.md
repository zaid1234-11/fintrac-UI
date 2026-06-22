# PRD‑05 — Trust Center

## 1. Overview and purpose

The **Trust Center** answers a single question:

> **“Can I trust FinTrac?”**

Most finance apps never answer this explicitly. The Trust Center exists to make trust **visible, measurable, and controllable**.[file:1][file:2]

Its responsibilities are to:

- Show what data FinTrac has and how fresh it is.
- Explain how recommendations and forecasts are generated.
- Surface confidence, evidence, and model provenance.
- Give users control over permissions and corrections.
- Provide an overall **Trust Score** that reflects the system’s trustworthiness at a point in time.[file:1][file:2]

If users cannot see *why* they should trust FinTrac, the Trust Center is failing its job.


## 2. Product philosophy

### 2.1 Transparency over opacity

Most finance apps hide everything:

- Where data comes from.
- How old data is.
- How AI models behave.
- How to correct mistakes.

FinTrac’s Trust Center should instead expose:

- **Data Sources**
- **Data Freshness**
- **Confidence**
- **Evidence**
- **Corrections**
- **Permissions**[file:1]

Trust should be something the user can **see and inspect**, not something they are asked to assume.

### 2.2 Relationship to core engines

The Trust Center sits downstream of the intelligence stack:

Recommendation Engine  
↓  
Goal OS  
↓  
Forecasting Engine  
↓  
Explainability Layer  
↓  
**Trust Center**  
↓  
Command Center[file:1][file:2]

It **consumes** outputs from these systems. It does not generate recommendations or forecasts itself; it explains and governs them.


## 3. Core mission and questions

The Trust Center should provide clear answers to:

- What data does FinTrac have?
- How recent is it?
- How was this recommendation generated?
- How confident is FinTrac?
- Can I correct mistakes?
- Who can access my data?
- What permissions have I granted?[file:2]

If a user cannot get these answers, the Trust Center is failing its mission.


## 4. Trust architecture

### 4.1 Trust stack

Conceptual architecture:

- **Data Sources** — SMS, bank statements, UPI, cards, manual entries.
- **Core Engines** — Goal OS, Forecasting Engine, Recommendation Engine.
- **Explainability Layer** — Explanation and Evidence Objects.
- **Trust Center** — trust scoring, transparency, permissions, corrections, audit.
- **Command Center** — consumes Trust Score and trust signals for UX and prioritization.[file:1][file:2]

### 4.2 Trust Center components

Trust Center is composed of:

- **Trust Score Engine**
- **Data Sources View**
- **Data Freshness Center**
- **Recommendation Provenance**
- **Forecast Provenance**
- **User Corrections Center**
- **Permission Center**
- **Audit Center**
- **Trust Events and Metrics**
- **Trust Center API Contract**


## 5. Trust Score

### 5.1 Definition

The **Trust Score** is a 0–100 metric summarizing how trustworthy FinTrac is for a given user at a given time.

Example:

- Trust Score: **87/100**[file:2]

### 5.2 Components

Trust Score is built from:

- **Data Completeness** — how much of the user’s financial life is actually connected (e.g., SMS coverage, bank accounts, cards).[file:2]
- **Data Freshness** — how recent key data sources and evidence are.
- **Forecast Accuracy** — alignment between predicted and actual outcomes over time.
- **Recommendation Reliability** — acceptance rates and absence of obvious errors.
- **User Corrections** — rate of corrections vs total transactions/recommendations (healthy correction pattern vs constant misclassification).[file:2]

Example breakdown:

- Data Completeness: 95
- Freshness: 90
- Forecast Accuracy: 82
- Recommendation Reliability: 85

Aggregated into Trust Score: 87/100 (conceptually Trust Score ≈ Freshness + Accuracy + Coverage + Reliability).[file:2]

Exact formulas may evolve; the PRD defines components and directionality rather than a fixed equation.

### 5.3 Trust health states

Define interpretive bands:

- **Excellent**: Trust Score ≥ 90
- **Good**: 75–89
- **Fair**: 60–74
- **Needs Attention**: < 60

Each state should come with guidance:

- Needs Attention: highlight which component is pulling trust down (e.g., stale data, low forecast accuracy) and what the user or system can do about it (e.g., reconnect sources, retrain models, review problematic recommendations).


## 6. Data Sources

### 6.1 Data source inventory

The Trust Center should list all supported data sources:

- SMS
- Bank statements
- Manual entries
- UPI
- Credit cards
- Other integrations (as added)[file:1]

### 6.2 Per‑source details

For each source, show:

- **Status** — Connected / Disconnected / Error.
- **Last Sync** — timestamp of last successful sync.
- **Coverage** — rough measure of what share of relevant data is captured (e.g., “SMS Coverage: 98% of messages parsed in last 30 days”).[file:2]

Example:

- SMS  
  - Status: Connected  
  - Last Sync: 2 hours ago  
  - Coverage: 98%

This ties directly into Data Completeness and Freshness components of Trust Score.


## 7. Data Freshness Center

### 7.1 Purpose

Users should never wonder if insights are based on yesterday’s data or last month’s data. The Data Freshness Center makes this **explicit**.

### 7.2 Freshness states

Define:

- **Fresh**: < 24 hours old
- **Aging**: 24–72 hours
- **Stale**: > 72 hours

These states can be computed per evidence category (e.g., transactions, goals, forecasts) using the `generated_at` and `freshness_hours` fields in Evidence Objects.[file:2]

### 7.3 UI

Show:

- “Last updated 3 hours ago” for key modules (Spending insights, Goal projections, Recommendations, Forecasts).
- When data is Aging or Stale, highlight it and suggest actions (e.g., “Refresh your bank statements”, “Reconnect SMS permissions”).


## 8. Recommendation provenance

### 8.1 Why this recommendation?

For each recommendation, Trust Center should show:

- **Recommendation text.**
- **Why generated?** — key triggers/explanation summary (from Explainability Layer).
- **Which engine?** — e.g., Recommendation Engine v1.4.
- **Which evidence?** — high‑level evidence summary (e.g., “6 months of spending history, food delivery category”).[file:1][file:2]
- **Linked forecast** — a reference to the ID of the underlying forecast scenario if any (e.g., Forecast `fc_001`).[file:2]

Example:

- Recommendation: “Reduce Food Delivery by ₹700.”  
- Generated By: Recommendation Engine v1.4.  
- Evidence: 6 months of food delivery spend, 18% increase vs last month.  
- Forecast link: Forecast `fc_001` (Emergency Fund 4 months sooner).


## 9. Forecast provenance

### 9.1 Forecast transparency

For each forecast, Trust Center should show:

- **Assumptions** — what changed (e.g., “Reduce spending ₹700/month and redirect to Emergency Fund”).[file:1]
- **Constraints** — which constraints were applied (e.g., Surplus Cap, Essential Spend Floor).
- **Model Version** — e.g., Forecast v3.
- **Evidence** — summary of historical data used (e.g., income history, contribution history, spend variability).[file:2]

This allows users to see that forecasts did not come “from nowhere”; they rest on clear assumptions and guardrails.


## 10. User Corrections Center

### 10.1 Purpose

Trust increases when users can **fix mistakes** and see those corrections respected and learned from.

The Corrections Center should allow:

- Merchant corrections (e.g., Swiggy → Food instead of Entertainment).
- Category corrections.
- Recommendation feedback (e.g., “Not relevant”).[file:2]

### 10.2 Behavior

- Corrections write to the existing `transaction_corrections` and `recommendation_feedback` tables from the implementation guide.[file:2]
- Trust Center explains how corrections influence future behavior (e.g., “We will categorize similar transactions as Food going forward, and re‑train the model periodically.”).


## 11. Permission Center

### 11.1 What data can FinTrac access?

The Permission Center lists:

- SMS access
- Statement access
- Notifications
- Analytics / Telemetry
- Other integrations (as added)

For each permission:

- **Status** — Enabled / Disabled.
- **Purpose** — why FinTrac needs this (e.g., “To categorize transactions from SMS messages”).
- **Controls** — ability to enable/disable within legal and functional constraints.[file:2]

This directly supports DPDP and Trust & Transparency requirements.


## 12. Audit Center

### 12.1 Purpose

The Audit Center gives users and internal teams a **timeline of important financial and model events**, powered by the Explainability Layer’s audit trail.[file:2]

### 12.2 Timeline

Show a chronological list such as:

- Jan 12 — Recommendation generated: “Reduce food delivery by ₹700”.
- Jan 13 — Forecast created: Emergency Fund scenario (`fc_001`).
- Jan 15 — Goal “Emergency Fund” became **At Risk**.
- Jan 20 — Goal “Laptop” completed.

Every item must include a link back to its corresponding **Explanation Object** (recommendation, forecast, goal) so users can tap **“Why?”** for details.[file:2]

### 12.3 Filters and scope

- Filter by type (Recommendations, Forecasts, Goals, Data Changes).
- Filter by date range (e.g., last 30 days, last 90 days).
- Optionally filter by goal (Emergency Fund, Laptop, etc.).

### 12.4 Event details

Clicking any item on the Audit Center timeline should open an **Event Details** view.

Example payload:

```json
{
  "event_id": "evt_001",
  "event_type": "recommendation_generated",
  "timestamp": "2026-01-12T10:00:00Z",
  "target_id": "rec_001",
  "explanation_id": "exp_001",
  "engine": "Recommendation Engine v1.4",
  "confidence": 0.88
}
```

From Event Details, the user can:

Timeline → Click event → Event Details → Open Explanation → Open Evidence

This creates a complete **trust chain** from high‑level event down to underlying data.[file:2]

### 12.5 Data change history

Trust is not only about recommendations and forecasts; it is also about **what happened to my data**.

The Audit Center should include a **Data Change History** view showing events such as:

- Jan 12 — SMS source connected.
- Jan 18 — Bank statement uploaded.
- Jan 20 — Merchant correction applied (Swiggy: Entertainment → Food).
- Jan 25 — Permission revoked for SMS access.

These events are critical for:

- Debugging and user support (“Why did my insights change?”).
- Compliance and DPDP/GDPR‑style audits.
- User reassurance that data and permission changes are recorded and visible.[file:2]

### 12.6 Audit usage metrics

Track how users interact with transparency features:

- `audit_viewed` — user opens the Audit Center.
- `audit_filtered` — user applies filters (by type, date range, goal).
- `audit_exported` — user exports an audit history.

These metrics help measure whether users actually use the transparency tools and inform future UX improvements.


## 13. Trust events

To measure and improve trust, the system must emit domain‑level **Trust Events**.

Core events:

- `trust_center_opened` — user opens the Trust Center.
- `correction_submitted` — a user submits a correction (transaction, category, recommendation).
- `permission_changed` — a permission is enabled/disabled (e.g., SMS access, statements).
- `source_connected` — a new data source (e.g., SMS, bank account) is successfully connected.
- `source_disconnected` — a data source is disconnected or fails.
- `audit_viewed` — Audit Center opened.
- `audit_filtered` — filters applied.
- `audit_exported` — user exports an audit history.[file:2]

These events are used for:

- Analytics (which trust features are used).
- Trust Score components (e.g., healthy correction behavior vs constant recategorization).
- Monitoring permission churn and data source stability.


## 14. Trust metrics

### 14.1 Primary metric

- **Trust Score** — as defined earlier, updated periodically (e.g., daily).

### 14.2 Secondary metrics

- **Correction Rate** — corrections per transaction or per recommendation.
- **Explanation Usage** — how often users open explanations from Command Center and Trust Center.
- **Permission Retention** — how many users keep sensitive permissions enabled over time.
- **Forecast Acceptance** — how often forecast‑driven recommendations are applied.
- **Audit Usage** — rates for `audit_viewed`, `audit_filtered`, `audit_exported`.[file:2]

These help evaluate whether FinTrac is earning, keeping, or losing user trust.


## 15. Trust health states

Define interpretive bands for Trust Score:

- **Excellent** (90+) — data is comprehensive and fresh; forecasts and recommendations are accurate; low correction rate.
- **Good** (75–89) — minor gaps but overall trustworthy.
- **Fair** (60–74) — noticeable gaps; Trust Center should highlight actions to improve.
- **Needs Attention** (<60) — serious issues (stale data, low accuracy, many corrections); may warrant deemphasizing certain features or prompting users to reconnect data.

This mapping is shown in Trust Center and can also be consumed by Command Center to subtly adapt UX.


## 16. Trust Center API contract (integration surface)

The Trust Center consumes inputs from core engines and Explainability, then exposes trust metrics to other surfaces.

### 16.1 Consumes from Explainability Layer

For trust visualization:

```json
{
  "explanation_id": "exp_001",
  "quality_score": 84,
  "freshness_hours": 24
}
```

Used for:

- Trust Score components (quality and freshness).
- Audit Center entries (linking events to explanations).
- Provenance views (Recommendation and Forecast Provenance).[file:2]

### 16.2 Consumes from Recommendation Engine

```json
{
  "recommendation_id": "rec_001",
  "confidence": 0.88
}
```

Used for:

- Recommendation Reliability metrics.
- Trust views summarizing how confident the system is in recent recommendations.

### 16.3 Consumes from Forecasting Engine

```json
{
  "forecast_id": "fc_001",
  "confidence": 0.82
}
```

Used for:

- Forecast Accuracy and confidence components of Trust Score.
- Forecast Provenance in the Trust Center.[file:2]

### 16.4 Consumes from Goal OS

```json
{
  "goal_id": "goal_emergency_fund",
  "health_label": "on_track"
}
```

Used for:

- Goal health timelines in Audit Center.
- Trust components related to stability of goals and their explanations.[file:2]

### 16.5 Outputs to Command Center

Optionally, Trust Center can expose:

```json
{
  "trust_score": 87,
  "trust_health_label": "good",
  "data_freshness_state": "fresh",
  "flags": {
    "forecasts_stale": false,
    "low_data_coverage": false
  }
}
```

Command Center uses these outputs to:

- Display Trust Score (if desired).
- Adjust emphasis or messaging (e.g., prompt to reconnect data when freshness is low).


## 17. Final architecture (post‑PRD‑05)

With Trust Center in place, the high‑level FinTrac architecture is:

Recommendation Engine  
↓  
Goal OS  
↓  
Forecasting Engine  
↓  
Explainability Layer  
↓  
Trust Center  
↓  
Command Center[file:1][file:2]

- Core engines compute **what** to say.
- Explainability makes each output **understandable**.
- Trust Center makes the overall system **trustworthy and inspectable**.
- Command Center becomes the user’s **decision cockpit**, powered by all of the above.
