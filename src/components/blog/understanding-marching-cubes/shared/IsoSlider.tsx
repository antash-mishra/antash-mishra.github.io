type IsoSliderProps = { value: number; onChange: (value: number) => void };

/** Shared iso-value slider. */
const IsoSlider = ({ value, onChange }: IsoSliderProps) => (
  <label className="flex min-w-48 items-center gap-3 font-mono text-xs text-ind-text-dim">
    iso {value.toFixed(2)}
    <input type="range" min="0.15" max="0.85" step="0.01" value={value} onChange={(event) => onChange(Number(event.target.value))} className="accent-ind-accent" />
  </label>
);

export default IsoSlider;
