import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Romaji, hiraganaQuestions } from "@/lib/kana";
import { useKanaStore } from "@/lib/state";

export function Results() {
  const selectedKana = useKanaStore((state) => state.kana);
  const answers = useKanaStore((state) => state.answers);
  const reset = useKanaStore((state) => state.reset);
  const retry = useKanaStore((state) => state.retry);

  return (
    <div className="py-8">
      <h1 className="text-xl">Results</h1>
      <div className="grid grid-cols-2 gap-4">
        {selectedKana.map((kanaCategory) => (
          <Card key={kanaCategory} className="bg-primary">
            <CardContent>
              <div className="grid grid-cols-5 gap-4 p-2 pt-6">
                {Object.entries(hiraganaQuestions[kanaCategory]).map(
                  ([key, kana]) => (
                    <div key={kana} className="grid">
                      <span>{kana}</span>
                      <span>{answers[key as Romaji] ? "✅" : "❌"}</span>
                    </div>
                  ),
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-8 flex gap-4">
        <Button onClick={reset}>Reset</Button>
        <Button onClick={retry}>Retry</Button>
      </div>
    </div>
  );
}
