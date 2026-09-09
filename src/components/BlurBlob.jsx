import React from 'react';

export const BlurBlob = ({ position, size, color = "from-cyan-950/30 via-indigo-900/20 to-transparent" }) => {
  const { top, left } = position;
  const { width, height } = size;

  return (
    <div
      className="pointer-events-none absolute -z-10 transition-all duration-1000"
      style={{
        top: top,
        left: left,
        width: width,
        height: height,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div
        className={`w-full h-full bg-gradient-to-tr ${color} rounded-full blur-[120px] animate-blob`}
      />
    </div>
  );
};

export default BlurBlob;
