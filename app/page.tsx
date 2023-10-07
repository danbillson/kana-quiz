"use client";

import { KanaQuiz } from "@/components/kana-quiz";
import KanaSelect from "@/components/kana-select";
import { Button } from "@/components/ui/button";
import {
  combinationHiraganaCategories,
  dakutenHiraganaCategories,
  mainHiraganaCategories,
} from "@/lib/kana";
import { useKanaStore } from "@/lib/state";
import { useState } from "react";

export default function Home() {
  const [quiz, setQuiz] = useState(false);
  const selectedKana = useKanaStore((state) => state.kana);

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold tracking-widest">Kana Quiz</h1>

      {quiz ? (
        <KanaQuiz />
      ) : (
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
            onClick={() => setQuiz(true)}
          >
            Start Quiz
          </Button>
        </>
      )}
    </main>
  );
}
