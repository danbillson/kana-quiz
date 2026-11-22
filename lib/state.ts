import {
  hiraganaCategories,
  type HiraganaCategory,
  type Hiragana,
} from "@/lib/kana";
import { create } from "zustand";

export type Stage = "select" | "quiz" | "results";
// Keyed by kana, not romaji: じ and ぢ are both "ji", ず and づ both "zu".
type Answers = Partial<Record<Hiragana, string>>;

type KanaState = {
  stage: Stage;
  kana: HiraganaCategory[];
  answers: Answers;
  setKana: (
    group: readonly HiraganaCategory[],
    selected: HiraganaCategory[],
  ) => void;
  answer: (kana: Hiragana, value: string) => void;
  start: () => void;
  finish: () => void;
  retry: () => void;
  reset: () => void;
};

const order = Object.keys(hiraganaCategories) as HiraganaCategory[];

export const useKanaStore = create<KanaState>()((set) => ({
  stage: "select",
  kana: [],
  answers: {},
  // Replaces one section's rows and keeps the rest, in table order so the
  // results read like the chart.
  setKana: (group, selected) =>
    set((state) => {
      const next = new Set([
        ...state.kana.filter((k) => !group.includes(k)),
        ...selected,
      ]);
      return { kana: order.filter((k) => next.has(k)) };
    }),
  // First answer counts, so retyping can't fix a miss.
  answer: (kana, value) =>
    set((state) =>
      state.answers[kana] !== undefined
        ? state
        : { answers: { ...state.answers, [kana]: value } },
    ),
  start: () => set({ stage: "quiz", answers: {} }),
  finish: () => set({ stage: "results" }),
  retry: () => set({ stage: "quiz", answers: {} }),
  reset: () => set({ stage: "select", kana: [], answers: {} }),
}));
