"use client";

import dynamic from "next/dynamic";

const FrictionInteractiveLazy = dynamic(
  () => import("@/components/home/FrictionInteractive"),
  { ssr: false }
);

export default FrictionInteractiveLazy;
