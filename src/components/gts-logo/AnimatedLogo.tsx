"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./AnimatedLogo.module.css";
import { ART_SIZE, LAYERS, LAYER_ORDER, type LayerName } from "./layers";

export type LogoVariant = "market-open" | "bull-vs-bear";

export type AnimatedLogoHandle = {
  /** Play the intro again from the start */
  replay: () => void;
};

type Props = {
  /** Which intro to play. Default: "market-open" */
  variant?: LogoVariant;
  /** Folder in /public that holds the layer PNGs. Default: "/gts-logo" */
  assetBase?: string;
  /** Wait until the logo scrolls into view before playing. Default: false (plays on mount) */
  playOnView?: boolean;
  /** Keep a slow shimmer running after the intro. Default: true */
  idle?: boolean;
  /** Called when the intro has finished */
  onComplete?: () => void;
  className?: string;
  /** Accessible name. Default: "GTS logo" */
  label?: string;
};

const pct = (v: number) => `${(v / ART_SIZE) * 100}%`;
const SPARK_COUNT = 18;

const AnimatedLogo = forwardRef<AnimatedLogoHandle, Props>(function AnimatedLogo(
  {
    variant = "market-open",
    assetBase = "/gts-logo",
    playOnView = false,
    idle = true,
    onComplete,
    className,
    label = "GTS logo",
  },
  ref
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const shakeRef = useRef<HTMLDivElement>(null);
  const ringDrawRef = useRef<SVGGElement>(null);
  const ringPathRefs = useRef<(SVGPathElement | null)[]>([]);
  const waveRef = useRef<SVGCircleElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const flashRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sparkRefs = useRef<(HTMLElement | null)[]>([]);
  const layerRefs = useRef<Partial<Record<LayerName, HTMLImageElement | null>>>({});

  const animations = useRef<Animation[]>([]);
  const timers = useRef<number[]>([]);
  const [pending, setPending] = useState(true);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const stop = useCallback(() => {
    animations.current.forEach((a) => a.cancel());
    animations.current = [];
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    stop();
    const L = layerRefs.current as Record<LayerName, HTMLImageElement>;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Show the finished logo, no motion
      setPending(false);
      onCompleteRef.current?.();
      return;
    }

    const halo = haloRef.current!;
    const shake = shakeRef.current!;
    const sweep = sweepRef.current!;
    const wave = waveRef.current!;
    const ringDraw = ringDrawRef.current!;
    const rings = ringPathRefs.current.filter(Boolean) as SVGPathElement[];
    const flashes = flashRefs.current.filter(Boolean) as HTMLDivElement[];
    const sparks = sparkRefs.current.filter(Boolean) as HTMLElement[];

    const A = (
      el: Element,
      frames: Keyframe[],
      delay: number,
      duration: number,
      easing = "cubic-bezier(.2,.7,.2,1)",
      extra: KeyframeAnimationOptions = {}
    ) => {
      const anim = el.animate(frames, { delay, duration, easing, fill: "both", ...extra });
      animations.current.push(anim);
      return anim;
    };

    const grow = (el: Element, delay: number, dur = 420) =>
      A(
        el,
        [
          { clipPath: "inset(100% 0 0 0)", opacity: 1 },
          { clipPath: "inset(0 0 0 0)", opacity: 1 },
        ],
        delay,
        dur,
        "cubic-bezier(.3,1.4,.5,1)"
      );

    const drawRing = (delay: number, dur: number, easing: string) => {
      rings.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = String(len);
        A(p, [{ strokeDashoffset: len, opacity: 1 }, { strokeDashoffset: 0, opacity: 1 }], delay, dur, easing);
      });
      A(L.ring, [{ opacity: 0 }, { opacity: 1 }], delay + dur - 150, 400, "ease-out");
      A(ringDraw, [{ opacity: 1 }, { opacity: 1, offset: 0.6 }, { opacity: 0 }], delay, dur + 500, "linear");
    };

    const circuits = (delay: number) =>
      A(
        L.circ,
        [
          { clipPath: "inset(0 50% 0 50%)", opacity: 1, filter: "brightness(2.2)" },
          { clipPath: "inset(0 0 0 0)", opacity: 1, filter: "brightness(1)" },
        ],
        delay,
        800,
        "cubic-bezier(.5,0,.3,1)"
      );

    const arrow = (delay: number, dur: number) =>
      A(
        L.arrow,
        [
          { clipPath: "inset(100% 100% 0 0)", opacity: 1, filter: "brightness(2)" },
          { clipPath: "inset(0 0 0 0)", opacity: 1, filter: "brightness(1)" },
        ],
        delay,
        dur,
        "cubic-bezier(.2,.9,.3,1)"
      );

    const lightSweep = (delay: number) => {
      A(sweep, [{ opacity: 1, backgroundPosition: "120% 0" }, { opacity: 1, backgroundPosition: "-20% 0" }], delay, 1000, "cubic-bezier(.45,0,.3,1)");
      A(halo, [{ opacity: 0.35 }, { opacity: 0.6 }, { opacity: 0.35 }], delay, 1400, "ease-in-out");
    };

    const startIdle = (after: number) => {
      if (!idle) return;
      A(
        sweep,
        [
          { opacity: 1, backgroundPosition: "120% 0" },
          { opacity: 1, backgroundPosition: "-20% 0", offset: 0.18 },
          { opacity: 1, backgroundPosition: "-20% 0" },
        ],
        after + 5000,
        7000,
        "ease-in-out",
        { iterations: Infinity, fill: "none" }
      );
      A(halo, [{ opacity: 0.35 }, { opacity: 0.55 }, { opacity: 0.35 }], after + 400, 5000, "ease-in-out", {
        iterations: Infinity,
        fill: "none",
      });
    };

    let flashIndex = 0;
    const flashAt = (x: number, y: number, size: number, delay: number) => {
      const f = flashes[flashIndex++ % flashes.length];
      Object.assign(f.style, { left: pct(x), top: pct(y), width: pct(size), height: pct(size) });
      A(
        f,
        [
          { opacity: 0, transform: "translate(-50%,-50%) scale(.3)" },
          { opacity: 1, transform: "translate(-50%,-50%) scale(1)", offset: 0.25 },
          { opacity: 0, transform: "translate(-50%,-50%) scale(1.4)" },
        ],
        delay,
        650,
        "ease-out"
      );
    };

    let end: number;

    if (variant === "market-open") {
      drawRing(0, 1100, "cubic-bezier(.6,0,.3,1)");
      circuits(500);
      (["c0", "c6", "c1", "c5", "c4", "c3", "c2"] as LayerName[]).forEach((k, i) => grow(L[k], 900 + i * 85));
      grow(L.m0, 1350, 380);
      grow(L.m1, 1450, 420);
      A(L.bull, [
        { opacity: 0, transform: "translateX(-55%) rotate(-10deg)" },
        { opacity: 1, transform: "translateX(6%) rotate(2deg)", offset: 0.7 },
        { opacity: 1, transform: "none" },
      ], 1500, 650);
      A(L.bear, [
        { opacity: 0, transform: "translateX(55%) rotate(10deg)" },
        { opacity: 1, transform: "translateX(-6%) rotate(-2deg)", offset: 0.7 },
        { opacity: 1, transform: "none" },
      ], 1700, 650);
      arrow(2050, 450);
      (["G", "T", "S"] as LayerName[]).forEach((k, i) =>
        A(L[k], [
          { opacity: 0, transform: "scale(1.4)", filter: "brightness(1.8)" },
          { opacity: 1, transform: "scale(.96)", filter: "brightness(1.4)", offset: 0.6 },
          { opacity: 1, transform: "scale(1)", filter: "brightness(1)" },
        ], 2400 + i * 150, 520, "cubic-bezier(.3,.6,.3,1)")
      );
      flashAt(512, 375, 300, 2700);
      lightSweep(3100);
      end = 4100;
    } else {
      const HIT = 1250;
      A(L.bull, [
        { opacity: 0, transform: "translateX(-150%)" },
        { opacity: 1, transform: "translateX(-130%)", offset: 0.12 },
        { opacity: 1, transform: "translateX(-130%) translateY(-4%) rotate(-5deg)", offset: 0.24 },
        { opacity: 1, transform: "translateX(-130%)", offset: 0.34 },
        { opacity: 1, transform: "translateX(-130%) translateY(-4%) rotate(-5deg)", offset: 0.44 },
        { opacity: 1, transform: "translateX(-140%)", offset: 0.62 },
        { opacity: 1, transform: "translateX(10%) rotate(4deg)", offset: 0.88 },
        { opacity: 1, transform: "translateX(-4%)", offset: 0.95 },
        { opacity: 1, transform: "none" },
      ], 0, HIT + 180, "linear");
      A(L.bear, [
        { opacity: 0, transform: "translateX(160%)" },
        { opacity: 1, transform: "translateX(140%)", offset: 0.12 },
        { opacity: 1, transform: "translateX(140%)", offset: 0.3 },
        { opacity: 1, transform: "translateX(140%) translateY(-4%) rotate(5deg)", offset: 0.4 },
        { opacity: 1, transform: "translateX(140%)", offset: 0.5 },
        { opacity: 1, transform: "translateX(150%)", offset: 0.62 },
        { opacity: 1, transform: "translateX(-10%) rotate(-4deg)", offset: 0.88 },
        { opacity: 1, transform: "translateX(4%)", offset: 0.95 },
        { opacity: 1, transform: "none" },
      ], 0, HIT + 180, "linear");

      // impact
      A(shake, [
        { transform: "none" },
        { transform: "translate(-1.4%,.8%)" },
        { transform: "translate(1.2%,-.6%)" },
        { transform: "translate(-.7%,.4%)" },
        { transform: "translate(.4%,0)" },
        { transform: "none" },
      ], HIT, 380, "linear", { fill: "none" });
      A(wave, [{ transform: "scale(1)", opacity: 0.95 }, { transform: "scale(14)", opacity: 0 }], HIT, 750, "cubic-bezier(.1,.6,.3,1)", { fill: "forwards" });
      flashAt(512, 420, 520, HIT - 40);
      sparks.forEach((s, i) => {
        const ang = (i / sparks.length) * Math.PI * 2 + (i % 3) * 0.3;
        const dist = ((150 + ((i * 53) % 170)) / 12.288) * 100;
        A(s, [
          { opacity: 1, transform: "translate(0,0) scale(1.4)" },
          { opacity: 0, transform: `translate(${Math.cos(ang) * dist}%,${Math.sin(ang) * dist}%) scale(.3)` },
        ], HIT, 600 + (i % 4) * 120, "cubic-bezier(.1,.7,.3,1)", { fill: "forwards" });
      });

      drawRing(HIT + 100, 650, "cubic-bezier(.2,.8,.3,1)");
      (["c0", "c1", "c2", "c3", "c4", "c5", "c6"] as LayerName[]).forEach((k, i) => grow(L[k], HIT + 250 + i * 45, 320));
      grow(L.m0, HIT + 450, 300);
      grow(L.m1, HIT + 500, 320);
      circuits(HIT + 300);

      A(L.G, [
        { opacity: 0, transform: "translateX(-70%) skewX(8deg)" },
        { opacity: 1, transform: "translateX(4%) skewX(-3deg)", offset: 0.7 },
        { opacity: 1, transform: "none" },
      ], 1800, 420, "cubic-bezier(.5,0,.2,1)");
      A(L.S, [
        { opacity: 0, transform: "translateX(70%) skewX(-8deg)" },
        { opacity: 1, transform: "translateX(-4%) skewX(3deg)", offset: 0.7 },
        { opacity: 1, transform: "none" },
      ], 1800, 420, "cubic-bezier(.5,0,.2,1)");
      A(L.T, [
        { opacity: 0, transform: "translateY(-60%)" },
        { opacity: 1, transform: "translateY(3%)", offset: 0.75 },
        { opacity: 1, transform: "none" },
      ], 2000, 380, "cubic-bezier(.6,0,.4,1)");
      A(shake, [{ transform: "none" }, { transform: "translateY(.6%)" }, { transform: "none" }], 2300, 200, "ease-out", { fill: "none" });
      flashAt(512, 375, 260, 2290);
      arrow(2400, 380);
      lightSweep(2700);
      end = 3700;
    }

    startIdle(end);
    setPending(false); // first frame of every layer is now set by the animations above
    timers.current.push(window.setTimeout(() => onCompleteRef.current?.(), end));
  }, [variant, idle, stop]);

  useImperativeHandle(ref, () => ({ replay: play }), [play]);

  useEffect(() => {
    let cancelled = false;
    let observer: IntersectionObserver | undefined;

    // Wait for every layer to decode so the intro doesn't start half-loaded
    const imgs = Object.values(layerRefs.current).filter(Boolean) as HTMLImageElement[];
    const ready = Promise.all(imgs.map((img) => img.decode().catch(() => undefined)));

    ready.then(() => {
      if (cancelled) return;
      if (playOnView && rootRef.current && "IntersectionObserver" in window) {
        observer = new IntersectionObserver(
          (entries) => {
            if (entries.some((e) => e.isIntersecting)) {
              observer?.disconnect();
              play();
            }
          },
          { threshold: 0.35 }
        );
        observer.observe(rootRef.current);
      } else {
        play();
      }
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      stop();
    };
  }, [play, playOnView, stop]);

  return (
    <div
      ref={rootRef}
      className={[styles.root, pending ? styles.pending : "", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={label}
    >
      <div ref={haloRef} className={styles.halo} aria-hidden="true" />
      <div ref={shakeRef} className={styles.shake}>
        <div className={styles.stage} aria-hidden="true">
          <svg viewBox="0 0 1024 1024" className={styles.fx}>
            <defs>
              <linearGradient id="gts-ring-gold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#fbe6a4" />
                <stop offset=".5" stopColor="#e6bb5c" />
                <stop offset="1" stopColor="#a87824" />
              </linearGradient>
            </defs>
            <g ref={ringDrawRef} className={styles.ringDraw} fill="none" stroke="url(#gts-ring-gold)" strokeLinecap="round">
              <path ref={(el) => { ringPathRefs.current[0] = el; }} d="M512 132 A375 375 0 0 1 512 882" strokeWidth={16} />
              <path ref={(el) => { ringPathRefs.current[1] = el; }} d="M512 132 A375 375 0 0 0 512 882" strokeWidth={16} />
              <path ref={(el) => { ringPathRefs.current[2] = el; }} d="M512 156 A351 351 0 0 1 512 858" strokeWidth={5} />
              <path ref={(el) => { ringPathRefs.current[3] = el; }} d="M512 156 A351 351 0 0 0 512 858" strokeWidth={5} />
            </g>
            <circle
              ref={waveRef}
              className={styles.wave}
              cx={512}
              cy={420}
              r={40}
              fill="none"
              stroke="#fbe6a4"
              strokeWidth={3}
              vectorEffect="non-scaling-stroke"
              opacity={0}
            />
          </svg>

          {LAYER_ORDER.map((name) => {
            const [x, y, w, h] = LAYERS[name];
            const origin =
              name === "bull" ? "90% 70%" :
              name === "bear" ? "10% 70%" :
              name === "arrow" ? "0% 100%" :
              name === "G" || name === "S" || name === "T" ? "50% 55%" : undefined;
            return (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={name}
                ref={(el) => { layerRefs.current[name] = el; }}
                src={`${assetBase}/${name}.png`}
                alt=""
                draggable={false}
                decoding="async"
                fetchPriority={name === "G" || name === "S" || name === "T" || name === "ring" ? "high" : undefined}
                style={{ left: pct(x), top: pct(y), width: pct(w), height: pct(h), transformOrigin: origin }}
              />
            );
          })}

          <div
            ref={sweepRef}
            className={styles.sweep}
            style={{ maskImage: `url(${assetBase}/mask.png)`, WebkitMaskImage: `url(${assetBase}/mask.png)` }}
          />
          {[0, 1].map((i) => (
            <div key={i} ref={(el) => { flashRefs.current[i] = el; }} className={styles.flash} />
          ))}
          {Array.from({ length: SPARK_COUNT }, (_, i) => (
            <i key={i} ref={(el) => { sparkRefs.current[i] = el; }} className={styles.spark} />
          ))}
        </div>
      </div>
    </div>
  );
});

export default AnimatedLogo;
