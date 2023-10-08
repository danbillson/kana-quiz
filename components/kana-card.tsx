"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hiragana } from "@/lib/kana";
import { Input } from "./ui/input";
import { FocusEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function KanaCard({ kana, answer }: { kana: Hiragana; answer: string }) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
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
