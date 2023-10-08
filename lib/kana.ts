export const hiraganaA = {
  a: "あ",
  i: "い",
  u: "う",
  e: "え",
  o: "お",
} as const;

export const hiraganaK = {
  ka: "か",
  ki: "き",
  ku: "く",
  ke: "け",
  ko: "こ",
} as const;

export const hiraganaS = {
  sa: "さ",
  shi: "し",
  su: "す",
  se: "せ",
  so: "そ",
} as const;

export const hiraganaT = {
  ta: "た",
  chi: "ち",
  tsu: "つ",
  te: "て",
  to: "と",
} as const;

export const hiraganaN = {
  na: "な",
  ni: "に",
  nu: "ぬ",
  ne: "ね",
  no: "の",
} as const;

export const hiraganaH = {
  ha: "は",
  hi: "ひ",
  fu: "ふ",
  he: "へ",
  ho: "ほ",
} as const;

export const hiraganaM = {
  ma: "ま",
  mi: "み",
  mu: "む",
  me: "め",
  mo: "も",
} as const;

export const hiraganaY = { ya: "や", yu: "ゆ", yo: "よ" } as const;

export const hiraganaR = {
  ra: "ら",
  ri: "り",
  ru: "る",
  re: "れ",
  ro: "ろ",
} as const;

export const hiraganaW = { wa: "わ", wo: "を" } as const;

export const hiraganaN2 = { n: "ん" } as const;

export const hiraganaG = {
  ga: "が",
  gi: "ぎ",
  gu: "ぐ",
  ge: "げ",
  go: "ご",
} as const;

export const hiraganaZ = {
  za: "ざ",
  ji: "じ",
  zu: "ず",
  ze: "ぜ",
  zo: "ぞ",
} as const;

export const hiraganaD = {
  da: "だ",
  ji: "ぢ",
  zu: "づ",
  de: "で",
  do: "ど",
} as const;

export const hiraganaB = {
  ba: "ば",
  bi: "び",
  bu: "ぶ",
  be: "べ",
  bo: "ぼ",
} as const;

export const hiraganaP = {
  pa: "ぱ",
  pi: "ぴ",
  pu: "ぷ",
  pe: "ぺ",
  po: "ぽ",
} as const;

export const hiraganaKya = {
  kya: "きゃ",
  kyu: "きゅ",
  kyo: "きょ",
} as const;

export const hiraganaSya = {
  sha: "しゃ",
  shu: "しゅ",
  sho: "しょ",
} as const;

export const hiraganaTya = {
  cha: "ちゃ",
  chu: "ちゅ",
  cho: "ちょ",
} as const;

export const hiraganaNya = {
  nya: "にゃ",
  nyu: "にゅ",
  nyo: "にょ",
} as const;

export const hiraganaHya = {
  hya: "ひゃ",
  hyu: "ひゅ",
  hyo: "ひょ",
} as const;

export const hiraganaMya = {
  mya: "みゃ",
  myu: "みゅ",
  myo: "みょ",
} as const;

export const hiraganaRya = {
  rya: "りゃ",
  ryu: "りゅ",
  ryo: "りょ",
} as const;

export const mainHiraganaCategories = {
  a: "あ",
  ka: "か",
  sa: "さ",
  ta: "た",
  na: "な",
  ha: "は",
  ma: "ま",
  ya: "や",
  ra: "ら",
  wa: "わ",
} as const;

export const mainHiragana = {
  ...hiraganaA,
  ...hiraganaK,
  ...hiraganaS,
  ...hiraganaT,
  ...hiraganaN,
  ...hiraganaH,
  ...hiraganaM,
  ...hiraganaY,
  ...hiraganaR,
  ...hiraganaW,
  ...hiraganaN2,
} as const;

export const dakutenHiraganaCategories = {
  ga: "が",
  za: "ざ",
  da: "だ",
  ba: "ば",
  pa: "ぱ",
} as const;

export const dakutenHiragana = {
  ...hiraganaG,
  ...hiraganaZ,
  ...hiraganaD,
  ...hiraganaB,
  ...hiraganaP,
} as const;

export const combinationHiraganaCategories = {
  kya: "きゃ",
  sha: "しゃ",
  cha: "ちゃ",
  nya: "にゃ",
  hya: "ひゃ",
  mya: "みゃ",
  rya: "りゃ",
} as const;

export const combinationHiragana = {
  ...hiraganaKya,
  ...hiraganaSya,
  ...hiraganaTya,
  ...hiraganaNya,
  ...hiraganaHya,
  ...hiraganaMya,
  ...hiraganaRya,
} as const;

export const hiraganaCategories = {
  ...mainHiraganaCategories,
  ...dakutenHiraganaCategories,
  ...combinationHiraganaCategories,
} as const;

export const hiragana = {
  ...mainHiragana,
  ...dakutenHiragana,
  ...combinationHiragana,
} as const;

export type HiraganaCategories = typeof hiraganaCategories;
export type HiraganaCategory = keyof HiraganaCategories;
export type Hiragana = (typeof hiragana)[keyof typeof hiragana];
export type Romaji = keyof typeof hiragana;

export const hiraganaQuestions = {
  a: hiraganaA,
  ka: hiraganaK,
  sa: hiraganaS,
  ta: hiraganaT,
  na: hiraganaN,
  ha: hiraganaH,
  ma: hiraganaM,
  ya: hiraganaY,
  ra: hiraganaR,
  wa: hiraganaW,
  ga: hiraganaG,
  za: hiraganaZ,
  da: hiraganaD,
  ba: hiraganaB,
  pa: hiraganaP,
  kya: hiraganaKya,
  sha: hiraganaSya,
  cha: hiraganaTya,
  nya: hiraganaNya,
  hya: hiraganaHya,
  mya: hiraganaMya,
  rya: hiraganaRya,
} as const;
