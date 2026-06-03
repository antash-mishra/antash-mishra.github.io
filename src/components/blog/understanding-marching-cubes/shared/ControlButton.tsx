import type { ReactNode } from 'react';

type ControlButtonProps = { children: ReactNode; onClick: () => void; active?: boolean };

/** Small article-specific button used for step controls and mode switches. */
const ControlButton = ({ children, onClick, active = false }: ControlButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors ${
      active
        ? 'border-ind-accent bg-ind-accent text-gray-950'
        : 'border-ind-border bg-ind-surface-alt text-ind-text-dim hover:border-ind-accent hover:text-ind-accent'
    }`}
  >
    {children}
  </button>
);

export default ControlButton;
