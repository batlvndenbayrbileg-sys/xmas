"use client";
import Image from "next/image";
import { useState } from "react";

// Product images fade + settle in as they decode, instead of popping. The single
// inline transition covers BOTH opacity and transform, so a card's hover-zoom
// (driven by a group-hover scale class) still animates at 700ms; priority/LCP
// images skip the fade so they never delay perceived load.

/**
 * Photographic image via next/image (responsive srcset + AVIF/WebP + lazy) with
 * a graceful fallback. Uses `fill`, so the PARENT must be positioned
 * (relative/absolute) and sized. If the image fails, we render the fallback so
 * the UI never shows a broken image.
 */
export function Photo({
  src, alt, fallback, imgClassName, className, sizes, priority,
}: {
  src?: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  fallback?: React.ReactNode;
  sizes?: string;
  priority?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  if (!src || failed) return <>{fallback}</>;
  // Fade in on decode, but NEVER stay hidden: cached images can skip onLoad, so
  // a ref callback marks already-complete images visible immediately.
  return (
    <Image
      ref={(el) => { if (el && el.complete) setLoaded(true); }}
      src={src}
      alt={alt}
      fill
      sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
      priority={priority}
      onError={() => setFailed(true)}
      onLoad={() => setLoaded(true)}
      className={imgClassName ?? className}
      style={priority ? undefined : {
        opacity: loaded ? 1 : 0,
        transition: "opacity .5s ease",
      }}
    />
  );
}
