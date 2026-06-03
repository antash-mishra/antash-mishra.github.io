type CodeBlockProps = {
  children: string;
};

/** Minimal code block: quiet black surface, subtle border, monospace text. */
const CodeBlock = ({ children }: CodeBlockProps) => (
  <pre className="not-prose my-5 overflow-x-auto border border-white/10 bg-black px-4 py-3 text-[13px] leading-6 text-neutral-200">
    <code className="font-mono">{children}</code>
  </pre>
);

export default CodeBlock;
