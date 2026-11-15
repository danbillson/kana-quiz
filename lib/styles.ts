// Shared class strings. Hover is mouse-only (see the hover-mouse variant in
// globals.css); keyboard focus shows the same end state straight away.

export const kicker = "text-xs font-medium tracking-[0.08em] uppercase";

export const pageTitle =
  "font-display text-[clamp(3.25rem,8.5vw,9.5rem)] leading-[0.92] font-semibold tracking-[-0.045em] text-balance";

export const lede =
  "font-display text-xl leading-snug font-medium tracking-tight text-pretty text-muted md:text-2xl";

const buttonBase =
  "inline-flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-150 ease-out-expo focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground focus-visible:transition-none data-disabled:cursor-not-allowed";

export const button = `${buttonBase} bg-foreground text-background hover-mouse:bg-accent hover-mouse:text-foreground focus-visible:bg-accent focus-visible:text-foreground data-disabled:bg-foreground/5 data-disabled:text-muted`;

export const buttonOutline = `${buttonBase} border border-foreground text-foreground hover-mouse:bg-accent focus-visible:bg-accent`;

/** A bar that sticks to the bottom of the viewport while its stage is on screen. */
export const actionBar =
  "page-grid sticky bottom-0 z-10 border-t border-rule bg-background py-3";

// Hairline grids: every tile draws all four rules and overlaps its
// neighbours by a pixel, so short rows end cleanly. The rule is mixed
// opaque against the page, so two overlapping rules don't darken.
export const tileGrid = "grid pt-px pl-px";
export const tile =
  "-mt-px -ml-px border border-[color-mix(in_oklab,var(--foreground)_15%,var(--background))]";
