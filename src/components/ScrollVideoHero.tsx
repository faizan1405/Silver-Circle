import { useEffect, useRef } from "react";
import { Magnetic } from "./Magnetic";

const revealStyle = (progress: number, start: number, span = 0.12) => {
  const amount = Math.min(Math.max((progress - start) / span, 0), 1);
  return {
    opacity: `${amount}`,
    transform: `translate3d(0, ${(1 - amount) * 28}px, 0)`,
  };
};

export function ScrollVideoHero() {
  const wrapRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const copy = copyRef.current;
    const video = videoRef.current;
    if (!wrap || !copy || !video) return;

    // Prevent autoplay/audio hijacking across all browsers and iOS Safari
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.load();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = Array.from(copy.querySelectorAll<HTMLElement>("[data-hero-line]"));
    let frame = 0;
    let duration = 0;
    let targetTime = 0;

    // Keep the video permanently paused; timeline is driven strictly by page scroll
    const keepPaused = () => {
      if (!video.paused) {
        video.pause();
      }
    };
    video.addEventListener("play", keepPaused);

    const scrollProgress = () => {
      const total = Math.max(wrap.offsetHeight - window.innerHeight, 1);
      return Math.min(Math.max(-wrap.getBoundingClientRect().top / total, 0), 1);
    };

    const update = () => {
      frame = 0;
      const progress = scrollProgress();

      items.forEach((item) => {
        const start = Number(item.dataset["heroLine"] ?? 0);
        Object.assign(item.style, revealStyle(progress, start));
      });

      const fade = progress < 0.82 ? 1 : Math.max(0, 1 - (progress - 0.82) / 0.16);
      copy.style.opacity = `${fade}`;

      if (!reduceMotion && duration > 0) {
        const safeDuration = Math.max(duration - 0.05, 0);
        targetTime = Math.min(Math.max(progress * safeDuration, 0), safeDuration);
      }
    };

    const measureDuration = () => {
      if (
        Number.isFinite(video.duration) &&
        video.duration > 0 &&
        !Number.isNaN(video.duration)
      ) {
        duration = video.duration;
        const safeDuration = Math.max(duration - 0.05, 0);
        targetTime = Math.min(targetTime, safeDuration);
        update();
      }
    };

    video.addEventListener("loadedmetadata", measureDuration);
    video.addEventListener("durationchange", measureDuration);
    video.addEventListener("canplay", measureDuration);
    measureDuration();

    // High-performance rAF loop for responsive, jitter-free scrubbing without drifting:
    // - Clamps currentTime safely within [0, safeDuration]
    // - Immediately snaps if difference is small (<0.02s) so the video STOPS DEAD when user stops scrolling
    // - Uses responsive easing (0.38 - 0.55) while active to remove wheel/touch stepping without inertia lag
    let rafId = 0;
    const tick = () => {
      if (duration > 0 && video.readyState >= 1) {
        const safeDuration = Math.max(duration - 0.05, 0);
        const clampedTarget = Math.min(Math.max(targetTime, 0), safeDuration);
        const diff = clampedTarget - video.currentTime;
        const absDiff = Math.abs(diff);

        if (absDiff > 0.003) {
          if (absDiff < 0.02) {
            // Close enough to target: snap directly to stop drifting immediately
            video.currentTime = clampedTarget;
          } else {
            const ease = absDiff > 0.4 ? 0.55 : 0.38;
            const next = video.currentTime + diff * ease;
            video.currentTime = Math.min(Math.max(next, 0), safeDuration);
          }
        }
      }
      rafId = window.requestAnimationFrame(tick);
    };

    const requestUpdate = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    rafId = window.requestAnimationFrame(tick);
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      video.removeEventListener("play", keepPaused);
      video.removeEventListener("loadedmetadata", measureDuration);
      video.removeEventListener("durationchange", measureDuration);
      video.removeEventListener("canplay", measureDuration);
    };
  }, []);

  return (
    <section ref={wrapRef} className="relative h-[320vh]" aria-label="Silver Circle Travel introduction">
      <div className="sticky top-0 h-screen min-h-[38rem] w-full overflow-hidden bg-navy-deep">
        {/* Poster image placed behind video to guarantee no black frame while video initialises */}
        <img
          src="/images/hero-scroll-poster.webp"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        />
        <video
          ref={videoRef}
          src="/videos/hero-scroll.mp4"
          poster="/images/hero-scroll-poster.webp"
          muted
          playsInline
          preload="auto"
          disablePictureInPicture
          controls={false}
          className="absolute inset-0 h-full w-full object-cover will-change-transform"
        />
        <div className="hero-video-shade pointer-events-none absolute inset-0" />

        <div className="pointer-events-auto relative mx-auto flex h-full max-w-7xl items-center px-5 pb-20 pt-28 lg:px-8 lg:pb-24 lg:pt-36">
          <div ref={copyRef} className="w-full max-w-3xl text-left will-change-[opacity]">
            <p data-hero-line="0" className="mb-5 text-sm font-semibold uppercase tracking-[0.28em] text-silver-light opacity-0 sm:text-base">
              Silver Circle Travel
            </p>
            <h1 className="text-primary-foreground">
              <span data-hero-line="0.08" className="block opacity-0">Travel Freely.</span>
              <span data-hero-line="0.2" className="mt-2 block text-silver-light opacity-0">We Take Care of the Rest.</span>
            </h1>
            <p data-hero-line="0.34" className="mt-7 max-w-xl text-lg text-primary-foreground/85 opacity-0 sm:text-2xl">
              Curated international journeys for travellers 60+
            </p>
            <div data-hero-line="0.48" className="mt-9 flex flex-col items-start gap-4 opacity-0 sm:flex-row">
              <Magnetic><a href="#travel-search" className="btn-base btn-silver">Plan My Journey</a></Magnetic>
              <Magnetic><a href="#featured-destinations" className="btn-base btn-hero-outline">View Destinations</a></Magnetic>
            </div>
            <p data-hero-line="0.6" className="mt-10 text-sm uppercase tracking-[0.22em] text-primary-foreground/65 opacity-0">
              Scroll to discover
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
