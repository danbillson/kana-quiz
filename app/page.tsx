"use client";

import { KanaQuiz } from "@/components/kana-quiz";
import KanaSelect from "@/components/kana-select";
import { Results } from "@/components/results";
import { Button } from "@/components/ui/button";
import {
  combinationHiraganaCategories,
  dakutenHiraganaCategories,
  mainHiraganaCategories,
} from "@/lib/kana";
import { useKanaStore } from "@/lib/state";

export default function Home() {
  const stage = useKanaStore((state) => state.stage);
  const nextStage = useKanaStore((state) => state.nextStage);
  const selectedKana = useKanaStore((state) => state.kana);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold tracking-widest">Kana Quiz</h1>

      {stage === "select" && (
        <>
          <div className="grid grid-cols-3 gap-8">
            <KanaSelect
              title="main kana"
              kanaCategories={mainHiraganaCategories}
            />
            <KanaSelect
              title="dakuten kana"
              kanaCategories={dakutenHiraganaCategories}
            />
            <KanaSelect
              title="combination kana"
              kanaCategories={combinationHiraganaCategories}
            />
          </div>

          <Button
            variant="secondary"
            disabled={selectedKana.length === 0}
            onClick={nextStage}
          >
            Start Quiz
          </Button>
        </>
      )}

      {stage === "quiz" && <KanaQuiz />}

      {stage === "results" && <Results />}
    </main>
  );
}
