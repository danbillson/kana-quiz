import { type HiraganaCategory, type Romaji } from "@/lib/kana";
import { create } from "zustand";

type KanaState = {
  stage: "select" | "quiz" | "results";
  kana: HiraganaCategory[];
  answers: { [key in Romaji]: boolean };
  nextStage: () => void;
  toggleKana: (kana: HiraganaCategory) => void;
  toggleAllKana: (kana: HiraganaCategory[]) => void;
  addAnswer: (romaji: Romaji, correct: boolean) => void;
  reset: () => void;
  retry: () => void;
};

export const useKanaStore = create<KanaState>()((set) => ({
  stage: "select",
  kana: [] as HiraganaCategory[],
  answers: {} as { [key in Romaji]: boolean },
  nextStage: () =>
    set((state) => ({ stage: state.stage === "select" ? "quiz" : "results" })),
  toggleKana: (kana) =>
    set((state) => ({
      kana: state.kana.includes(kana)
        ? state.kana.filter((k) => k !== kana)
        : [...state.kana, kana],
    })),
  toggleAllKana: (kana) =>
    set((state) => ({
      kana: kana.every((k) => state.kana.includes(k))
        ? state.kana.filter((k) => !kana.includes(k))
        : [...new Set([...state.kana, ...kana])],
    })),
  addAnswer: (romaji, correct) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [romaji]: state.answers[romaji] ?? correct,
      },
    })),
  reset: () =>
    set({
      stage: "select",
      kana: [],
      answers: {} as { [key in Romaji]: boolean },
    }),
  retry: () =>
    set({ stage: "quiz", answers: {} as { [key in Romaji]: boolean } }),
}));
