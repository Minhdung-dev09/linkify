"use client";

import { useEffect, useState } from "react";
import type { BuilderElement } from "@/app/builder/page";

export default function CanvasCarousel({ element }: { element: BuilderElement }) {
  const images: string[] = element.props.images || [];
  const captions: string[] = element.props.captions || [];
  const intervalMs: number = Math.max(1000, Number(element.props.intervalMs ?? 3000));
  const showIndicators: boolean = element.props.showIndicators ?? true;
  const showArrows: boolean = element.props.showArrows ?? true;
  const autoplay: boolean = element.props.autoplay ?? true;
  const pauseOnHover: boolean = element.props.pauseOnHover ?? true;
  const loop: boolean = element.props.loop ?? true;
  const transition: 'fade' | 'slide' = element.props.transition || 'fade';
  const objectFit: React.CSSProperties['objectFit'] = (element.props.objectFit || 'cover') as any;

  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const count = images.length;

  useEffect(() => {
    if (!autoplay || count <= 1) return;
    if (pauseOnHover && isHovered) return;
    const id = setInterval(() => {
      setIndex(prev => {
        const next = prev + 1;
        if (loop) return next % count;
        return next >= count ? prev : next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [autoplay, count, intervalMs, loop, pauseOnHover, isHovered]);

  const goPrev = () => setIndex(prev => (prev - 1 + count) % count);
  const goNext = () => setIndex(prev => (prev + 1) % count);

  return (
    <div
      className="w-full h-full rounded-lg overflow-hidden bg-black relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {count > 0 ? (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {transition === 'fade' && images.map((src, i) => (
            <img
              key={`${element.id}-fade-${i}`}
              src={src}
              alt={captions[i] || `Slide ${i + 1}`}
              className="absolute inset-0 w-full h-full transition-opacity duration-500"
              style={{ opacity: i === index ? 1 : 0, objectFit }}
            />
          ))}
          {transition === 'slide' && (
            <div
              className="absolute inset-0 flex h-full transition-transform duration-500"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {images.map((src, i) => (
                <img
                  key={`${element.id}-slide-${i}`}
                  src={src}
                  alt={captions[i] || `Slide ${i + 1}`}
                  className="w-full h-full flex-shrink-0"
                  style={{ objectFit }}
                />
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-gray-200 text-sm">No Images</div>
      )}

      {showArrows && count > 1 && (
        <>
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
          >
            ‹
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white text-black rounded-full w-8 h-8 flex items-center justify-center"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
          >
            ›
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
          {images.map((_, i) => (
            <button
              key={`dot-${i}`}
              className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/50'}`}
              onClick={(e) => { e.stopPropagation(); setIndex(i); }}
            />
          ))}
        </div>
      )}

      {count > 0 && captions[index] && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/40 text-white text-xs px-3 py-2">
          {captions[index]}
        </div>
      )}
    </div>
  );
}


