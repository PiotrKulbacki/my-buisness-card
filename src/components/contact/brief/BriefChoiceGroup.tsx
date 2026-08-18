import { cn } from "@/lib/utils";

const fieldClassName =
  "border-line bg-bg-elevated w-full rounded-2xl border px-4 py-3 text-base transition-[border-color,box-shadow] focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_35%,transparent)] focus-visible:outline-none disabled:opacity-60";

export { fieldClassName };

export function RequiredMark() {
  return (
    <span className="ml-0.5 text-red-500" aria-hidden="true">
      *
    </span>
  );
}

export function OptionalHint({ label }: { label: string }) {
  return <span className="text-fg-muted ml-1">({label})</span>;
}

type Option = { value: string; label: string };

type BriefChoiceGroupProps = {
  legend: string;
  required?: boolean;
  hint?: string;
  optionalLabel?: string;
  name: string;
  type: "radio" | "checkbox";
  options: readonly Option[];
  value: string | readonly string[] | "";
  onChange: (next: string | string[]) => void;
  disabled?: boolean;
};

export function BriefChoiceGroup({
  legend,
  required,
  hint,
  optionalLabel,
  name,
  type,
  options,
  value,
  onChange,
  disabled,
}: BriefChoiceGroupProps) {
  const selected = Array.isArray(value) ? value : value ? [value] : [];

  return (
    <fieldset className="min-w-0" disabled={disabled}>
      <legend className="float-left mb-3 w-full px-0 text-sm leading-none">
        {legend}
        {required ? (
          <RequiredMark />
        ) : optionalLabel ? (
          <OptionalHint label={optionalLabel} />
        ) : null}
        {hint ? <OptionalHint label={hint} /> : null}
      </legend>
      <div className="clear-both mt-0 grid w-full gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const checked = selected.includes(option.value);
          return (
            <label
              key={option.value}
              className={cn(
                "border-line bg-bg-elevated has-focus-visible:border-accent flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-base transition-[border-color,background-color] has-focus-visible:shadow-[0_0_0_3px_color-mix(in_oklab,var(--accent)_35%,transparent)]",
                checked && "border-accent bg-accent/10",
                disabled && "cursor-not-allowed opacity-60",
              )}
            >
              <input
                type={type}
                name={name}
                value={option.value}
                checked={checked}
                disabled={disabled}
                className="border-line accent-accent mt-1 size-4 shrink-0"
                onChange={() => {
                  if (type === "radio") {
                    onChange(option.value);
                    return;
                  }
                  const next = checked
                    ? selected.filter((item) => item !== option.value)
                    : [...selected, option.value];
                  onChange(next);
                }}
              />
              <span>{option.label}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
