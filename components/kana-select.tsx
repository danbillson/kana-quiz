"use client";

import {
  combinationHiraganaCategories,
  dakutenHiraganaCategories,
  hiraganaQuestions,
  mainHiraganaCategories,
  questionsFor,
  type HiraganaCategory,
} from "@/lib/kana";
import { useKanaStore } from "@/lib/state";
import {
  actionBar,
  button,
  kicker,
  lede,
  pageTitle,
  tile,
  tileGrid,
} from "@/lib/styles";
import { Button } from "@ui-sdk/react/button";
import {
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
} from "@ui-sdk/react/checkbox";
import type { CSSProperties } from "react";

const sections = [
  {
    id: "main",
    title: "Main",
    range: "あ to ん",
    rows: mainHiraganaCategories,
  },
  {
    id: "dakuten",
    title: "Dakuten",
    range: "が to ぽ",
    rows: dakutenHiraganaCategories,
  },
  {
    id: "combination",
    title: "Combination",
    range: "きゃ to りょ",
    rows: combinationHiraganaCategories,
  },
].map((section) => ({
  ...section,
  keys: Object.keys(section.rows) as HiraganaCategory[],
}));

// The square box. Its colour follows the tile, so it reads on paper, ink and
// the accent alike.
const box =
  "grid size-4 shrink-0 place-items-center border border-current text-[11px] leading-none outline-none";

export function KanaSelect() {
  const kana = useKanaStore((state) => state.kana);
  const setKana = useKanaStore((state) => state.setKana);
  const start = useKanaStore((state) => state.start);
  const count = questionsFor(kana).length;

  return (
    <div className="flex grow flex-col gap-24 md:gap-32">
      <section className="page-grid gap-y-8">
        <h1
          className={`rise col-span-12 md:col-span-10 md:col-start-2 ${pageTitle}`}
        >
          Pick your rows
        </h1>
        <p
          style={{ "--d": "120ms" } as CSSProperties}
          className={`rise col-span-12 max-w-[36ch] md:col-span-4 md:col-start-8 ${lede}`}
        >
          Choose some hiragana, then type the romaji for each one. Enter moves
          you on.
        </p>
      </section>

      <div className="flex flex-col gap-16 md:gap-24">
        {sections.map((section, i) => (
          <section
            key={section.id}
            style={{ "--i": i, "--d": "200ms" } as CSSProperties}
            className="rise page-grid gap-y-6"
          >
            <div className="col-span-12 md:col-span-3 md:col-start-2">
              <h2
                id={`${section.id}-heading`}
                className="font-display text-4xl font-semibold tracking-tight"
              >
                {section.title}
              </h2>
              <p className="mt-2 text-sm font-medium text-muted">
                <span lang="ja">{section.range}</span> ·{" "}
                <span className="tabular-nums">
                  {questionsFor(section.keys).length}
                </span>{" "}
                kana
              </p>
            </div>

            <CheckboxGroup
              aria-labelledby={`${section.id}-heading`}
              value={kana.filter((k) => section.keys.includes(k))}
              onValueChange={(selected) => setKana(section.keys, selected)}
              allValues={section.keys}
              className="col-span-12 flex flex-col gap-3 md:col-span-7"
            >
              <label className="-my-2 flex cursor-pointer items-center gap-2 self-start py-2 text-sm font-medium has-focus-visible:bg-accent hover-mouse:bg-accent">
                <Checkbox parent className={box}>
                  <CheckboxIndicator>
                    {(state) => (state.indeterminate ? "–" : "✓")}
                  </CheckboxIndicator>
                </Checkbox>
                Select all
              </label>

              <div
                className={`${tileGrid} grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`}
              >
                {section.keys.map((category) => (
                  <label
                    key={category}
                    className={`${tile} flex cursor-pointer flex-col gap-6 bg-white p-3 transition-colors duration-150 ease-out-expo has-focus-visible:bg-accent has-focus-visible:text-foreground has-focus-visible:transition-none has-data-checked:bg-foreground has-data-checked:text-background hover-mouse:bg-accent hover-mouse:text-foreground`}
                  >
                    <span className="flex items-center justify-between">
                      <span className={kicker}>{category}</span>
                      <Checkbox value={category} className={box}>
                        <CheckboxIndicator aria-hidden>✓</CheckboxIndicator>
                      </Checkbox>
                    </span>
                    {/* One span per kana, so a line only breaks between
                        them and never splits きゃ from its ゃ. */}
                    <span
                      lang="ja"
                      className="flex flex-wrap gap-x-1 font-display text-2xl font-medium"
                    >
                      {Object.values(hiraganaQuestions[category]).map((k) => (
                        <span key={k}>{k}</span>
                      ))}
                    </span>
                  </label>
                ))}
              </div>
            </CheckboxGroup>
          </section>
        ))}
      </div>

      <div className={`mt-auto ${actionBar}`}>
        <div className="col-span-12 flex items-center justify-between gap-4 md:col-span-10 md:col-start-2">
          <p aria-live="polite" className="text-sm font-medium text-muted">
            {count === 0 ? (
              "Nothing picked yet"
            ) : (
              <>
                <span className="text-foreground tabular-nums">{count}</span>{" "}
                kana picked
              </>
            )}
          </p>
          <Button
            className={button}
            disabled={count === 0}
            focusableWhenDisabled
            onClick={start}
          >
            Start quiz <span aria-hidden>→</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
