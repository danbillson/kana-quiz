"use client";

import { KanaCard } from "@/components/kana-card";
import { Button } from "@/components/ui/button";
import { hiraganaQuestions, type Hiragana, type Romaji } from "@/lib/kana";
import { useKanaStore } from "@/lib/state";
import { shuffle } from "@/lib/utils";

export function KanaQuiz() {
  const nextStage = useKanaStore((state) => state.nextStage);
  const selectedKana = useKanaStore((state) => state.kana);

  const kanaQuestions = selectedKana.reduce(
    (acc, key) => ({ ...acc, ...hiraganaQuestions[key] }),
    {},
  );

  const questions = Object.entries(kanaQuestions).map(([answer, kana]) => ({
    kana: kana as Hiragana,
    answer: answer as Romaji,
  }));

  const shuffledQuestions = shuffle(questions);

  return (
    <>
      <div className="grid grid-cols-4 gap-2 p-8">
        {shuffledQuestions.map((question) => (
          <KanaCard key={question.answer} {...question} />
        ))}
      </div>

      <Button variant="default" onClick={nextStage}>
        Submit
      </Button>
    </>
  );
}
