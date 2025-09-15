import React from "react";

export default function BackgroundVideo({ src }: { src: string }) {
  return (
    <div className="w-full relative overflow-hidden rounded-[20px]">
      <div className="w-full">
        <video className="w-full h-full object-cover" src={src} autoPlay loop muted playsInline />
      </div>
    </div>
  );
}
