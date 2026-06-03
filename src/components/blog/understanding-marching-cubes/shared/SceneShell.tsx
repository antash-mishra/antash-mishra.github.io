import type { ReactNode } from 'react';

type SceneShellProps = { title: string; children: ReactNode; controls?: ReactNode };

/** Consistent frame for all interactive scenes. */
const SceneShell = ({ title, children, controls }: SceneShellProps) => (
  <div className="not-prose my-8 overflow-hidden border border-ind-border bg-ind-surface-alt">
    <div className="flex flex-col gap-3 border-b border-ind-border bg-ind-surface p-4 md:flex-row md:items-center md:justify-between">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-ind-accent">Interactive visual</div>
        <h3 className="m-0 font-display text-2xl font-bold text-white">{title}</h3>
      </div>
      {controls && <div className="flex flex-wrap items-center gap-2">{controls}</div>}
    </div>
    <div className="h-[360px] w-full md:h-[440px]">{children}</div>
  </div>
);

export default SceneShell;
