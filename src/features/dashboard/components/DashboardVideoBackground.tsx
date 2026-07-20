'use client';

import React from 'react';

export function DashboardVideoBackground({ src = "/dashboard video.mp4" }: { src?: string }) {
  return (
    <video
      className="fixed z-[-50] object-cover"
      style={{
        width: '102%',
        height: '102%',
        left: '-1%',
        top: '-1%',
      }}
      autoPlay
      loop
      muted
      playsInline
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
