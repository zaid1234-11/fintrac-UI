"use client";

import { useRef } from "react";
import { m, useInView } from "framer-motion";
import { Scale, Zap, Shield, Repeat } from "lucide-react";

const pillars = [
  {
    icon: Scale,
    title: "Spending Stability",
    description:
      "Measures the volatility of your core expenses. High stability means predictable, easily manageable baseline costs.",
  },
  {
    icon: Shield,
    title: "Savings Consistency",
    description:
      "Tracks the reliable frequency of your deposits. Consistent, smaller additions score higher than erratic windfalls.",
  },
  {
    icon: Zap,
    title: "Impulse Pacing",
    description:
      "Monitors high-friction 'want' purchases. A good score indicates these are spaced out sufficiently to absorb the impact.",
  },
  {
    icon: Repeat,
    title: "Subscription Buffer",
    description:
      "Calculates the ratio of fixed recurring costs against your flexible income. Ensures you aren't over-leveraged on monthly fees.",
  },
];

const alertTriggers = [
  {
    title: "Velocity Alerts",
    desc: "Warns you when spending speed across a specific category accelerates beyond your historical norm.",
  },
  {
    title: "Habit Drift",
    desc: "Notifies you when previously low-friction categories start absorbing more of your monthly income.",
  },
  {
    title: "Recovery Coaching",
    desc: "Provides step-by-step rebuilding targets after an unexpected financial shock or emergency expense.",
  },
];

export default function BehaviorSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="behavior"
      ref={ref}
      className="relative py-16 sm:py-24 lg:py-32 z-10"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-12">
        {/* Section header */}
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 lg:mb-20"
        >
          <span className="text-white/40 text-sm font-semibold tracking-widest uppercase mb-4 block">
            How we coach you
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light text-white font-display mb-6 text-balance tracking-tight">
            Active <span className="text-white/50">Intervention</span>
          </h2>
          <p className="text-white/60 text-[15px] md:text-[16px] font-light max-w-2xl mx-auto leading-relaxed">
            By analyzing the friction behind your habits, our coaching engine provides real-time wellness pillars and contextual alerts to keep your ecosystem balanced.
          </p>
        </m.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* Wellness Pillars */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/[0.02] border border-white/10 rounded-[24px] p-8 md:p-10 backdrop-blur-sm shadow-2xl"
          >
            <div className="mb-10 border-b border-white/10 pb-6">
              <h3 className="text-xl font-display font-medium text-white mb-2">
                Wellness Score Pillars
              </h3>
              <p className="text-sm text-white/50 font-light">
                Your financial health measured through four behavioral vectors.
              </p>
            </div>
            
            <div className="space-y-8">
              {pillars.map((pillar, i) => (
                <div key={pillar.title} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center">
                    <pillar.icon className="w-5 h-5 text-white/70" />
                  </div>
                  <div>
                    <h4 className="text-[15px] font-medium text-white/90 mb-1">
                      {pillar.title}
                    </h4>
                    <p className="text-[14px] text-white/50 font-light leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </m.div>

          {/* Alert Triggers & Engine */}
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-8"
          >
            {/* Contextual Alerts */}
            <div className="bg-white/[0.02] border border-white/10 rounded-[24px] p-8 md:p-10 backdrop-blur-sm shadow-2xl flex-1">
              <h3 className="text-xl font-display font-medium text-white mb-6">
                Contextual Alert Triggers
              </h3>
              <div className="space-y-6">
                {alertTriggers.map((alert) => (
                  <div key={alert.title} className="bg-black/20 rounded-2xl p-5 border border-white/5">
                    <h4 className="text-[14px] font-medium text-white/90 mb-2">{alert.title}</h4>
                    <p className="text-[13px] text-white/50 font-light leading-relaxed">
                      {alert.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coaching Engine Mini Card */}
            <div className="bg-white/[0.04] border border-white/20 rounded-[24px] p-8 backdrop-blur-md relative overflow-hidden">
               <div
                className="absolute -right-10 -bottom-10 w-48 h-48 opacity-20 pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
                }}
              />
              <h3 className="text-xl font-display font-medium text-white mb-3">
                Continuous Coaching Engine
              </h3>
              <p className="text-[14px] text-white/60 font-light leading-relaxed">
                The engine never sleeps. It constantly re-evaluates the friction metrics
                of your categories to ensure that your recovery periods are gentle, and your
                growth periods are maximized.
              </p>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
