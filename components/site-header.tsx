import type { Stage } from "@/lib/state";

const steps: { stage: Stage; label: string }[] = [
  { stage: "select", label: "Choose" },
  { stage: "quiz", label: "Quiz" },
  { stage: "results", label: "Results" },
];

export function SiteHeader({ stage }: { stage: Stage }) {
  return (
    <header className="page-grid items-center py-(--margin)">
      <p className="col-span-5 flex items-baseline gap-2 font-display text-lg font-semibold tracking-tight whitespace-nowrap md:col-span-2">
        <span lang="ja">かな</span>
        <span>Kana quiz</span>
      </p>
      <ol
        aria-label="Progress"
        className="col-span-7 flex justify-end gap-3 text-[13px] font-medium whitespace-nowrap sm:gap-4 md:col-span-6 md:col-start-7 md:justify-between md:text-sm"
      >
        {steps.map((step, i) => {
          const current = step.stage === stage;
          return (
            <li
              key={step.stage}
              aria-current={current ? "step" : undefined}
              className={current ? "" : "text-muted"}
            >
              <span className="tabular-nums">0{i + 1}</span> {step.label}
            </li>
          );
        })}
      </ol>
    </header>
  );
}
