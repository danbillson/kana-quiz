"use client";

import { Button } from "@/components/ui/button";
import { HiraganaCategories, HiraganaCategory } from "@/lib/kana";
import { useKanaStore } from "@/lib/state";

export default function KanaSelect({
  title,
  kanaCategories,
}: {
  title: string;
  kanaCategories: Partial<HiraganaCategories>;
}) {
  const selectedKana = useKanaStore((state) => state.kana);
  const toggleKana = useKanaStore((state) => state.toggleKana);
  const toggleAllKana = useKanaStore((state) => state.toggleAllKana);

  const includesAllKana = Object.keys(kanaCategories).every((kana) =>
    selectedKana.includes(kana as HiraganaCategory),
  );

  return (
    <div className="grid auto-rows-min grid-cols-2 gap-2 py-8">
      <Button
        variant={includesAllKana ? "default" : "outline"}
        className="col-span-2"
        onClick={() =>
          toggleAllKana(Object.keys(kanaCategories) as HiraganaCategory[])
        }
      >
        All {title}
      </Button>
      {Object.entries(kanaCategories).map(([category, kana]) => (
        <Button
          key={category}
          variant={
            selectedKana.includes(category as HiraganaCategory)
              ? "default"
              : "outline"
          }
          onClick={() => toggleKana(category as HiraganaCategory)}
        >
          {kana}/{category}
        </Button>
      ))}
    </div>
  );
}
