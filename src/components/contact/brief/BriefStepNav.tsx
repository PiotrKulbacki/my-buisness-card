import { Button } from "@/components/ui/Button";

type BriefStepNavProps = {
  step: number;
  loading?: boolean;
  backLabel: string;
  nextLabel: string;
  submitLabel: string;
  sendingLabel: string;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
};

export function BriefStepNav({
  step,
  loading,
  backLabel,
  nextLabel,
  submitLabel,
  sendingLabel,
  onBack,
  onNext,
  onSubmit,
}: BriefStepNavProps) {
  return (
    <div className="border-line bg-bg/95 sticky bottom-[calc(3.5rem+env(safe-area-inset-bottom,0px))] z-20 -mx-1 mt-8 flex flex-wrap gap-3 border-t px-1 pt-5 pb-3 backdrop-blur-md md:static md:bottom-auto md:bg-transparent md:px-0 md:pt-6 md:pb-0 md:backdrop-blur-none">
      {step > 1 ? (
        <Button type="button" variant="secondary" disabled={loading} onClick={onBack}>
          {backLabel}
        </Button>
      ) : null}
      {step < 6 ? (
        <Button
          key="brief-next"
          type="button"
          disabled={loading}
          onClick={onNext}
          className="min-w-32"
        >
          {nextLabel}
        </Button>
      ) : (
        <Button
          key="brief-submit"
          type="button"
          loading={loading}
          className="min-w-36"
          onClick={onSubmit}
        >
          {loading ? sendingLabel : submitLabel}
        </Button>
      )}
    </div>
  );
}
