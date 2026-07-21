import React from "react";
import FrictionInteractiveLazy from "@/components/home/FrictionInteractiveLazy";
import ScrollFadeIn from "@/components/ScrollFadeIn";

export default function FrictionSection() {
  return (
    <section 
      className="relative w-full py-16 sm:py-24 md:py-32 px-5 sm:px-8 md:px-12 z-20 pointer-events-auto max-w-[1200px] mx-auto"
      style={{ contentVisibility: "auto", containIntrinsicSize: "1000px" }}
    >
      <div className="mb-10 sm:mb-16 text-center max-w-2xl mx-auto">
        <h2 className="font-display text-3xl md:text-5xl text-white font-light tracking-tight mb-6">
          Elastic <span className="text-white/50">Savings Engine</span>
        </h2>
        <p className="text-[15px] md:text-[16px] text-white/60 leading-relaxed font-light">
          Unlike static budgets that blindly slash categories, FinTrac reshapes
          your savings targets in real-time based on psychological friction—protecting
          what matters and cutting where it hurts least.
        </p>
      </div>

      <ScrollFadeIn delay={0.2}>
        <FrictionInteractiveLazy />
      </ScrollFadeIn>
    </section>
  );
}
