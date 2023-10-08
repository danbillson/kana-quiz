"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Hiragana, Romaji } from "@/lib/kana";
import { useKanaStore } from "@/lib/state";
import { cn } from "@/lib/utils";
import { FocusEvent, useRef, useState } from "react";

export function KanaCard({ kana, answer }: { kana: Hiragana; answer: Romaji }) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const addAnswer = useKanaStore((state) => state.addAnswer);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setValue(value);
    addAnswer(answer, value === answer);
    const nextInput = inputRef.current?.nextElementSibling as HTMLElement;
    if (nextInput) {
      nextInput.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Card
      className={cn(
        value === answer
          ? "bg-emerald-300"
          : value !== "" && value !== answer
          ? "bg-red-300"
          : "bg-primary",
        "transition-all duration-300 focus-within:scale-105 focus-within:bg-yellow-500",
      )}
    >
      <CardHeader>
        <CardTitle className="text-center text-4xl">{kana}</CardTitle>
      </CardHeader>
      <CardContent>
        <Input type="text" ref={inputRef} onBlur={handleBlur} />
      </CardContent>
    </Card>
  );
}
