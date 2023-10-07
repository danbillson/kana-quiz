import { type HiraganaCategory } from "@/lib/kana";
import { atom, useAtom, useAtomValue } from "jotai";

const kanaAtom = atom<HiraganaCategory[]>([]);
export const useKana = () => useAtom(kanaAtom);
export const useKanaValue = () => useAtomValue(kanaAtom);
