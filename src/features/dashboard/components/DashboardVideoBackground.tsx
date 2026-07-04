'use client';

import React from 'react';

export function DashboardVideoBackground() {
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
      <source src="/dashboard video.mp4" type="video/mp4" />
    </video>
  );
}
