import { useRef } from 'react';
import type { PointerEvent, ReactNode, Ref } from 'react';

type SceneShellProps = {
  title: string;
  children: ReactNode;
  controls?: ReactNode;
  containerRef?: Ref<HTMLDivElement>;
  isVisualPaused?: boolean;
  onVisualTap?: () => void;
};

const TAP_MOVE_THRESHOLD = 10;
const TAP_TIME_THRESHOLD_MS = 400;

/** Consistent frame for all interactive scenes. */
const SceneShell = ({ title, children, controls, containerRef, isVisualPaused, onVisualTap }: SceneShellProps) => {
  const pointerStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!onVisualTap) return;

    // Mouse secondary-clicks should not count as visual pause/resume gestures.
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    pointerStartRef.current = {
      x: event.clientX,
      y: event.clientY,
      time: window.performance.now(),
    };
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!onVisualTap || !pointerStartRef.current) return;

    const start = pointerStartRef.current;
    pointerStartRef.current = null;

    const movedX = event.clientX - start.x;
    const movedY = event.clientY - start.y;
    const distance = Math.hypot(movedX, movedY);
    const duration = window.performance.now() - start.time;

    // A quick, still tap means “pause/resume”. A drag or long hold is probably
    // camera orbiting, scrolling, or touch exploration, so leave playback alone.
    if (distance <= TAP_MOVE_THRESHOLD && duration <= TAP_TIME_THRESHOLD_MS) {
      onVisualTap();
    }
  };

  const handlePointerCancel = () => {
    pointerStartRef.current = null;
  };

  return (
    <div ref={containerRef} className="not-prose my-8 overflow-hidden border border-ind-border bg-ind-surface-alt">
      <div className="flex flex-col gap-3 border-b border-ind-border bg-ind-surface p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ind-accent">Interactive visual</div>
          <h3 className="m-0 font-display text-2xl font-bold text-white">{title}</h3>
        </div>
        {controls && <div className="flex flex-wrap items-center gap-2">{controls}</div>}
      </div>
      <div
        className="relative h-[360px] w-full md:h-[440px]"
        onPointerCancel={handlePointerCancel}
        onPointerDown={handlePointerDown}
        onPointerLeave={handlePointerCancel}
        onPointerUp={handlePointerUp}
      >
        {children}
        {onVisualTap && (
          <div className="pointer-events-none absolute bottom-3 right-3 border border-ind-border/80 bg-black/55 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ind-text-dim backdrop-blur-sm">
            {isVisualPaused ? 'paused · click/tap to resume' : 'click/tap visual to pause'}
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneShell;
