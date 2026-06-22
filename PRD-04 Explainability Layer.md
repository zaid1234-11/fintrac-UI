## 16. Explanation API contract (integration surface)

The Explainability Layer exposes structured outputs that other systems consume.

### 16.1 Command Center

For each card that supports “Why?”:

```json
{
  "explanation_id": "exp_001",
  "type": "recommendation",
  "target_id": "rec_001",
  "levels": {
    "simple": "...",
    "detailed": "...",
    "audit": {
      "evidence_ids": ["ev_101", "ev_102"],
      "constraints_applied": ["surplus_cap"],
      "model_version": "rec_model_v4"
    }
  },
  "confidence": 0.88,
  "quality_score": 84
}
```

Command Center mainly uses `levels.simple` (and sometimes `levels.detailed`) plus `confidence` and `quality_score` to decide whether to show the “Why?” affordance.

### 16.2 Goal views

Goal detail screens consume goal‑specific explanations:

```json
{
  "explanation_id": "exp_goal_001",
  "type": "goal",
  "target_id": "goal_emergency_fund",
  "health_label": "at_risk",
  "health_reason": "Contributions dropped 35% vs plan for 2 months; projected delay from Nov 2026 to Mar 2027.",
  "confidence": 0.72,
  "confidence_reason": "Limited contribution history and volatile discretionary spending.",
  "levels": {
    "simple": "Your Emergency Fund is at risk because recent contributions fell below plan.",
    "detailed": "...",
    "audit": { "...": "..." }
  }
}
```

Goal views primarily use `health_reason`, `confidence_reason`, and the appropriate level for user depth.

### 16.3 Forecast views

Forecast screens consume forecast‑specific explanations:

```json
{
  "explanation_id": "exp_fc_001",
  "type": "forecast",
  "target_id": "fc_001",
  "assumptions": {
    "food_delivery_delta": -700,
    "goal_contribution_overrides": {"goal_emergency_fund": 700}
  },
  "baseline": {
    "completion_date": "2027-02-01",
    "health_label": "slightly_delayed"
  },
  "scenario": {
    "completion_date": "2026-10-01",
    "health_label": "on_track",
    "time_saved_days": 123
  },
  "levels": {
    "simple": "If you reduce food delivery by ₹700/month, you reach your Emergency Fund about 4 months sooner.",
    "detailed": "...",
    "audit": {
      "evidence_ids": ["ev_101"],
      "constraints_applied": ["surplus_cap"],
      "model_version": "forecast_v3"
    }
  },
  "confidence": 0.88
}
```

Forecast views rely on `assumptions`, `baseline`, `scenario`, and `levels.simple/detailed` to render the current vs optimized path story.

### 16.4 Trust Center / Audit tools

The Trust Center and internal audit tools consume the most complete view:

```json
{
  "explanation_id": "exp_001",
  "user_id": "user_123",
  "type": "recommendation",
  "target_id": "rec_001",
  "evidence_ids": ["ev_101", "ev_102"],
  "quality_score": 84,
  "quality_components": {
    "completeness": 0.95,
    "evidence_coverage": 0.9,
    "helpfulness": 0.8,
    "usage_rate": 0.7
  },
  "freshness_hours": 24,
  "levels": {
    "simple": "...",
    "detailed": "...",
    "audit": {
      "constraints_applied": ["surplus_cap"],
      "model_version": "rec_model_v4"
    }
  },
  "created_at": "2026-02-01T00:00:00Z"
}
```

Trust Center uses these fields for:

- User‑visible data and explanation export.  
- Internal audits of model behavior and constraint application.  
- Monitoring explanation quality and freshness over time.[file:2]
