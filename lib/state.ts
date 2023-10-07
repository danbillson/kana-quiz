import { type HiraganaCategory } from "@/lib/kana";
import { create } from "zustand";

type KanaState = {
  kana: HiraganaCategory[];
  toggleKana: (kana: HiraganaCategory) => void;
  toggleAllKana: (kana: HiraganaCategory[]) => void;
};

export const useKanaStore = create<KanaState>()((set) => ({
  kana: [] as HiraganaCategory[],
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
}));
