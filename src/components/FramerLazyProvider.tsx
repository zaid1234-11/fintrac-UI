"use client";

import React from "react";
import { LazyMotion } from "framer-motion";

const loadFeatures = () => import("framer-motion").then((res) => res.domAnimation);

export default function FramerLazyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LazyMotion features={loadFeatures} strict>
      {children}
    </LazyMotion>
  );
}
