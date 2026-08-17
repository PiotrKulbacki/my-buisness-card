type BriefProgressProps = {
  current: number;
  total: number;
  label: string;
  stepTitle: string;
};

export function BriefProgress({ current, total, label, stepTitle }: BriefProgressProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="space-y-2" aria-label={label}>
      <div className="flex items-baseline justify-between gap-3 text-sm">
        <p className="text-fg-muted" aria-live="polite">
          {label}
        </p>
        <p className="text-fg-muted">{stepTitle}</p>
      </div>
      <div className="bg-bg-elevated h-1.5 overflow-hidden rounded-full">
        <div
          className="bg-accent h-full rounded-full transition-[width] duration-300 motion-reduce:transition-none"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
