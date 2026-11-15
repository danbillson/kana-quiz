"use client";

import { hiraganaQuestions, questionsFor, type Hiragana } from "@/lib/kana";
import { useKanaStore } from "@/lib/state";
import {
  button,
  buttonOutline,
  kicker,
  lede,
  pageTitle,
  tile,
  tileGrid,
} from "@/lib/styles";
import { cx } from "@/lib/utils";
import { Button } from "@ui-sdk/react/button";
import type { CSSProperties } from "react";

function verdict(right: number, total: number) {
  if (right === total) return "Clean sheet. Time to add a few more rows.";
  if (right / total >= 0.8)
    return "Nearly there. Have another go at the ones you missed.";
  if (right / total >= 0.5)
    return "Getting there. The struck-out ones are worth another look.";
  return "Early days. Keep at it.";
}

export function Results() {
  const kana = useKanaStore((state) => state.kana);
  const answers = useKanaStore((state) => state.answers);
  const reset = useKanaStore((state) => state.reset);
  const retry = useKanaStore((state) => state.retry);

  const total = questionsFor(kana).length;
  const right = questionsFor(kana).filter(
    (q) => answers[q.kana] === q.answer,
  ).length;

  return (
    <div className="flex flex-col gap-16 pb-40 md:gap-24">
      <section className="page-grid gap-y-8">
        <p className={`rise col-span-12 text-muted md:col-start-2 ${kicker}`}>
          Results
        </p>
        <h1
          style={{ "--d": "60ms" } as CSSProperties}
          className={`rise col-span-12 tabular-nums md:col-span-6 md:col-start-2 ${pageTitle}`}
        >
          {right}/{total}
        </h1>
        <p
          style={{ "--d": "120ms" } as CSSProperties}
          className={`rise col-span-12 max-w-[36ch] self-end md:col-span-4 md:col-start-8 ${lede}`}
        >
          {verdict(right, total)}
        </p>
      </section>

      {/* Laid out like the chart: one row per line of kana, five across. */}
      <div className="page-grid">
        <div
          style={{ "--d": "200ms" } as CSSProperties}
          className={`${tileGrid} rise col-span-12 grid-cols-5 md:col-span-10 md:col-start-2`}
        >
          {kana.map((category) => {
            const row = Object.entries(hiraganaQuestions[category]);
            return [
              ...row.map(([romaji, glyph]) => {
                const given = answers[glyph as Hiragana];
                const correct = given === romaji;
                return (
                  <div
                    key={glyph}
                    className={cx(
                      tile,
                      "flex flex-col gap-3 p-2 md:p-3",
                      correct ? "bg-foreground text-background" : "bg-white",
                    )}
                  >
                    <span
                      lang="ja"
                      className="font-display text-2xl leading-none font-medium md:text-4xl"
                    >
                      {glyph}
                    </span>
                    <span
                      className="flex flex-wrap gap-x-2 text-xs font-medium tracking-[0.08em]"
                    >
                      <span>{romaji}</span>
                      {!correct && (
                        <span className="text-muted line-through">
                          {given || "–"}
                        </span>
                      )}
                    </span>
                    <span className="sr-only">
                      {correct
                        ? "right"
                        : given
                          ? `wrong, you typed ${given}`
                          : "skipped"}
                    </span>
                  </div>
                );
              }),
              ...Array.from({ length: 5 - row.length }, (_, i) => (
                <div key={`${category}-${i}`} aria-hidden className={tile} />
              )),
            ];
          })}
        </div>
      </div>

      <div className="page-grid">
        <div className="col-span-12 flex flex-wrap gap-3 md:col-span-10 md:col-start-2">
          <Button className={button} onClick={retry}>
            Try again <span aria-hidden>→</span>
          </Button>
          <Button className={buttonOutline} onClick={reset}>
            Pick new rows
          </Button>
        </div>
      </div>
    </div>
  );
}
