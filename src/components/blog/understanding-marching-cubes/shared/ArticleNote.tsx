import type { ReactNode } from 'react';

const ArticleNote = ({ children }: { children: ReactNode }) => (
  <div className="not-prose my-6 border-l-4 border-ind-accent bg-ind-surface-alt p-4 text-sm leading-relaxed text-ind-text-dim">
    {children}
  </div>
);

export default ArticleNote;
