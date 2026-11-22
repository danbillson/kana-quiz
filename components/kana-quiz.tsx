"use client";

import { questionsFor, type Question } from "@/lib/kana";
import { useKanaStore } from "@/lib/state";
import { actionBar, button, kicker, lede, tile, tileGrid } from "@/lib/styles";
import { cx, shuffle } from "@/lib/utils";
import { Button } from "@ui-sdk/react/button";
import { Field, FieldLabel } from "@ui-sdk/react/field";
import { Input } from "@ui-sdk/react/input";
import {
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";

const normalise = (value: string) => value.trim().toLowerCase();

export function KanaQuiz() {
  const kana = useKanaStore((state) => state.kana);
  const answers = useKanaStore((state) => state.answers);
  const answer = useKanaStore((state) => state.answer);
  const finish = useKanaStore((state) => state.finish);

  // Shuffled once per attempt. Retry remounts this, so it reshuffles.
  const [questions] = useState(() => shuffle(questionsFor(kana)));
  const [announcement, setAnnouncement] = useState("");
  const inputs = useRef<(HTMLInputElement | null)[]>([]);
  const finishRef = useRef<HTMLButtonElement>(null);

  const answered = questions.filter((q) => answers[q.kana] !== undefined);
  const right = answered.filter((q) => answers[q.kana] === q.answer).length;

  function commit({ kana, answer: romaji }: Question, raw: string) {
    const value = normalise(raw);
    if (!value || useKanaStore.getState().answers[kana] !== undefined) return;
    answer(kana, value);
    setAnnouncement(
      value === romaji ? `${kana}, right.` : `${kana}, wrong. It's ${romaji}.`,
    );
  }

  // Enter moves to the next unanswered kana, wrapping round. Once they're all
  // done it lands on Finish, so one more Enter submits.
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>, index: number) {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;
    event.preventDefault();
    commit(questions[index], event.currentTarget.value);

    const done = useKanaStore.getState().answers;
    for (let step = 1; step < questions.length; step++) {
      const next = (index + step) % questions.length;
      if (done[questions[next].kana] === undefined) {
        inputs.current[next]?.focus();
        return;
      }
    }
    finishRef.current?.focus();
  }

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        finish();
      }}
      className="flex grow flex-col gap-16 md:gap-24"
    >
      <section className="page-grid gap-y-8">
        <h1 className="rise col-span-12 max-w-[14ch] font-display text-[clamp(2.75rem,6.5vw,5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-balance md:col-span-6 md:col-start-2">
          Type the romaji
        </h1>
        <p
          style={{ "--d": "120ms" } as CSSProperties}
          className={`rise col-span-12 max-w-[36ch] self-end md:col-span-4 md:col-start-8 ${lede}`}
        >
          Enter moves you on. Your first answer counts, so no take-backs.
        </p>
      </section>

      <div className="page-grid">
        <div
          className={`${tileGrid} col-span-12 grid-cols-2 sm:grid-cols-3 md:col-span-10 md:col-start-2 md:grid-cols-4 lg:grid-cols-6`}
        >
          {questions.map((question, i) => {
            const given = answers[question.kana];
            const status =
              given === undefined
                ? "open"
                : given === question.answer
                  ? "right"
                  : "wrong";

            return (
              <Field
                key={question.kana}
                style={
                  { "--i": Math.min(i, 8), "--d": "200ms" } as CSSProperties
                }
                className={cx(
                  tile,
                  "rise flex flex-col gap-4 p-3 transition-colors duration-150 ease-out-expo focus-within:bg-accent focus-within:text-foreground focus-within:transition-none",
                  status === "right"
                    ? "bg-foreground text-background"
                    : "bg-white",
                )}
              >
                <span className="flex justify-between gap-2">
                  <span className={`${kicker} tabular-nums`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {status !== "open" && (
                    <span aria-hidden className={kicker}>
                      {status === "right" ? (
                        "Right"
                      ) : (
                        <span className="normal-case">→ {question.answer}</span>
                      )}
                    </span>
                  )}
                </span>
                <FieldLabel className="font-display text-5xl leading-none font-medium">
                  <span className="sr-only">Romaji for </span>
                  <span lang="ja">{question.kana}</span>
                </FieldLabel>
                <Input
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  autoFocus={i === 0}
                  readOnly={status !== "open"}
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  spellCheck={false}
                  enterKeyHint="next"
                  defaultValue={given}
                  onBlur={(e) => commit(question, e.currentTarget.value)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cx(
                    "w-full min-w-0 border-b border-current bg-transparent py-1 text-base font-medium outline-none",
                    status === "wrong" && "line-through decoration-2",
                  )}
                />
              </Field>
            );
          })}
        </div>
      </div>

      <p aria-live="polite" className="sr-only">
        {announcement}
      </p>

      <div className={`mt-auto ${actionBar}`}>
        <div className="col-span-12 flex items-center justify-between gap-4 md:col-span-10 md:col-start-2">
          <p className="text-sm font-medium text-muted">
            <span className="text-foreground tabular-nums">
              {answered.length} / {questions.length}
            </span>{" "}
            done · <span className="tabular-nums">{right}</span> right
          </p>
          <Button ref={finishRef} type="submit" className={button}>
            Finish <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    </form>
  );
}
