"use client";

import { Button } from "@/components/ui/button";
import { Hiragana, hiraganaQuestions } from "@/lib/kana";
import { useKanaStore } from "@/lib/state";
import { shuffle } from "@/lib/utils";
import { KanaCard } from "./kana-card";

export function KanaQuiz() {
  const selectedKana = useKanaStore((state) => state.kana);

  const kanaQuestions = selectedKana.reduce(
    (acc, key) => ({ ...acc, ...hiraganaQuestions[key] }),
    {},
  );

  const questions = Object.entries(kanaQuestions).map(([answer, kana]) => ({
    kana: kana as Hiragana,
    answer,
  }));

  const shuffledQuestions = shuffle(questions);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 p-8">
        {shuffledQuestions.map((question) => (
          <KanaCard key={question.answer} {...question} />
        ))}
      </div>

      <Button variant="default">Submit</Button>
    </>
  );
}
