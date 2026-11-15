"use client";

import { KanaQuiz } from "@/components/kana-quiz";
import { KanaSelect } from "@/components/kana-select";
import { Results } from "@/components/results";
import { SiteHeader } from "@/components/site-header";
import { useKanaStore } from "@/lib/state";
import { useEffect, useRef } from "react";

export default function Home() {
  const stage = useKanaStore((state) => state.stage);
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // A stage swap replaces the whole page, so start it from the top. The quiz
  // focuses its first input itself; the others hand focus to <main>.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    window.scrollTo({ top: 0 });
    if (stage !== "quiz") mainRef.current?.focus({ preventScroll: true });
  }, [stage]);

  return (
    <>
      <SiteHeader stage={stage} />
      <main
        ref={mainRef}
        id="main"
        tabIndex={-1}
        className="flex grow flex-col pt-16 outline-none md:pt-24"
      >
        {stage === "select" && <KanaSelect />}
        {stage === "quiz" && <KanaQuiz />}
        {stage === "results" && <Results />}
      </main>
    </>
  );
}
