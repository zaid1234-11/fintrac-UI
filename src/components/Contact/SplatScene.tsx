"use client";

import React, { Component, ErrorInfo, ReactNode, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Splat, OrbitControls } from "@react-three/drei";

interface ErrorBoundaryProps {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = { hasError: false };

  public static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Splat failed to load:", error);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

export default function SplatScene() {
  return (
    <div className="w-full h-[100vh] relative bg-[#2E2F2B]">
      <ErrorBoundary 
        fallback={
          <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-center p-8 z-50">
            <div className="border border-white/20 p-8 rounded-xl bg-white/5 backdrop-blur-md">
              <h2 className="text-2xl font-display mb-4">Gaussian Splat Missing</h2>
              <p className="text-white/60 mb-2">Please add a valid `.splat` file to your `public` folder named `shoe.splat`.</p>
              <p className="text-white/60 text-sm">External URLs are currently blocked by CORS/Auth.</p>
            </div>
          </div>
        }
      >
        <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
          <OrbitControls 
            makeDefault 
            autoRotate 
            autoRotateSpeed={1.5} 
            enableZoom={false} 
            enablePan={false}
            maxPolarAngle={Math.PI / 2 + 0.2}
            minPolarAngle={Math.PI / 2 - 0.2}
          />
          <Suspense fallback={null}>
            <Splat
              src="/train.splat"
              position={[0, -0.5, 0]}
              rotation={[0, 0, 0]}
              scale={1}
            />
          </Suspense>
        </Canvas>
      </ErrorBoundary>

      {/* Overlay Content */}
      <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center bg-gradient-to-b from-black/10 via-transparent to-[#2e2f2b]">
        <div className="text-center mt-auto mb-24">
          <h1 className="text-5xl md:text-7xl font-display text-white mb-6 drop-shadow-xl">
            Get In Touch
          </h1>
          <p className="text-white/80 text-xl font-light max-w-lg mx-auto drop-shadow-md">
            Scroll down to reveal the story.
          </p>
        </div>
      </div>
    </div>
  );
}
