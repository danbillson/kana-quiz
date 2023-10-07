"use client";

import { Button } from "@/components/ui/button";
import { HiraganaCategories, HiraganaCategory } from "@/lib/kana";
import { useKana } from "@/lib/state";

export default function KanaSelect({
  title,
  kanaCategories,
}: {
  title: string;
  kanaCategories: Partial<HiraganaCategories>;
}) {
  const [selectedKana, setSelectedKana] = useKana();
  const includesAllKana = Object.keys(kanaCategories).every((kana) =>
    selectedKana.includes(kana as HiraganaCategory),
  );

  const toggleAllKana = () => {
    if (!includesAllKana) {
      setSelectedKana((prevSelectedKana) => {
        return [
          ...new Set([...prevSelectedKana, ...Object.keys(kanaCategories)]),
        ] as HiraganaCategory[];
      });
    } else {
      setSelectedKana((prevSelectedKana) => {
        return prevSelectedKana.filter(
          (kana) => !Object.keys(kanaCategories).includes(kana),
        );
      });
    }
  };

  const toggleKana = (kana: HiraganaCategory) => {
    setSelectedKana((prevSelectedKana) => {
      if (prevSelectedKana.includes(kana)) {
        return selectedKana.filter((k) => k !== kana);
      }
      return [...selectedKana, kana];
    });
  };

  return (
    <div className="grid auto-rows-min grid-cols-2 gap-2 py-8">
      <Button
        variant={includesAllKana ? "default" : "outline"}
        className="col-span-2"
        onClick={toggleAllKana}
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
