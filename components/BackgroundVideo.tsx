import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface BackgroundVideoProps {
  src: string;
  fallbackImage?: string;
}

export default function BackgroundVideo({ src, fallbackImage }: BackgroundVideoProps) {
  const [videoError, setVideoError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Use the provided fallback image or default to a static color background
  const posterSrc = fallbackImage || "/wayberBg4.png";

  useEffect(() => {
    // Reset state when src changes
    setVideoError(false);
    setIsLoaded(false);

    // Force video reload when src changes
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [src]);

  // Handle video loading issues
  const handleVideoError = () => {
    console.error("Video failed to load:", src);
    setVideoError(true);
  };

  return (
    <div className="w-full relative overflow-hidden rounded-[20px]">
      <div className="w-full">
        {!videoError ? (
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            poster={posterSrc}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onError={handleVideoError}
            onLoadedData={() => setIsLoaded(true)}
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          // Fallback to an image if video fails to load
          <div className="w-full h-full bg-blue-500 rounded-[20px] relative overflow-hidden">
            <Image
              src={posterSrc}
              alt="Video thumbnail"
              layout="fill"
              objectFit="cover"
              onError={() => console.error("Fallback image failed to load")}
            />
          </div>
        )}
      </div>
    </div>
  );
}
