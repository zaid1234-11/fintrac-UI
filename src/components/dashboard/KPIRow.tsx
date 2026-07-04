"use client";

import React from "react";
import SavingsCard from "./SavingsCard";
import HealthScoreCard from "./HealthScoreCard";
import FrictionKPICard from "./FrictionKPICard";

interface KPIRowProps {
  savings: { amount: number; deltaPercent: number };
  healthScore: number;
  frictionCount: number;
}

export default function KPIRow({ savings, healthScore, frictionCount }: KPIRowProps) {
  return (
    <div className="flex flex-col gap-3 sm:grid sm:grid-cols-3">
      <SavingsCard amount={savings.amount} deltaPercent={savings.deltaPercent} />
      <HealthScoreCard score={healthScore} />
      <FrictionKPICard pendingCount={frictionCount} />
    </div>
  );
}
