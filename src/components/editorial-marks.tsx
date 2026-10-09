import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type MarkProps = ComponentProps<"svg">;

export function MarginScribble({ className, ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 140 64" fill="none" className={cn("text-primary", className)} aria-hidden="true" {...props}>
      <path d="M8 42c22-25 42 22 67-8 18-21 26 12 57-18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M97 43c13-4 24-2 35 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function PaperPlaneMark({ className, ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 92 72" fill="none" className={cn("text-primary", className)} aria-hidden="true" {...props}>
      <path d="m8 34 72-25-24 55-13-22L8 34Z" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m43 42 37-33M43 42l-3 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function NotebookMark({ className, ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 112 112" fill="none" className={cn("text-primary", className)} aria-hidden="true" {...props}>
      <path d="M28 17h58v78H28z" stroke="currentColor" strokeWidth="3" />
      <path d="M39 34h35M39 49h35M39 64h24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M19 29h18M19 45h18M19 61h18M19 77h18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="m69 78 8 8 17-21" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GrowthMark({ className, ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={cn("text-primary", className)} aria-hidden="true" {...props}>
      <path d="M60 104V45M60 65C47 65 37 56 35 43c14-2 24 5 25 22ZM61 50c2-16 13-25 29-23-1 14-12 23-29 23Z" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M33 104h54M42 113h37" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M20 25h12M26 19v12M93 60h10M98 55v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function BankAlertMark({ className, ...props }: MarkProps) {
  return (
    <svg viewBox="0 0 124 112" fill="none" className={cn("text-primary", className)} aria-hidden="true" {...props}>
      <rect x="24" y="12" width="64" height="88" rx="10" stroke="currentColor" strokeWidth="3" />
      <path d="M43 29h26M39 77h34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M99 28c8 5 12 12 12 21M101 17c12 7 19 18 20 31" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M46 54h20M56 44v20" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Small, irregular marks are shared by public pages; each illustration has a specific editorial idea. */
export function ThoughtSpark({ className, ...props }: MarkProps) {
  return <svg viewBox="0 0 88 88" fill="none" className={cn("text-primary", className)} aria-hidden="true" {...props}>
    <path d="M44 7c-3 18-5 24-8 29-4 4-13 5-27 7 16 2 24 4 27 8 4 5 5 14 8 29 2-16 4-24 8-29 4-4 12-6 27-8-15-2-23-3-27-7-4-5-6-13-8-29Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
  </svg>;
}

export function HandArrow({ className, ...props }: MarkProps) {
  return <svg viewBox="0 0 126 72" fill="none" className={cn("text-primary", className)} aria-hidden="true" {...props}>
    <path d="M5 11c15 2 25 24 16 36-8 11-21-5-9-13 17-12 27 29 87 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="m85 34 20 8-15 14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}

const ink = "currentColor";

export function DirectionIllustration({ className, ...props }: MarkProps) {
  return <svg viewBox="0 0 290 244" fill="none" className={cn("text-foreground", className)} aria-hidden="true" {...props}>
    <path d="M22 221c48-11 73-12 121-4 40 6 80 6 127-7" stroke={ink} strokeWidth="2" strokeLinecap="round"/>
    <path d="M179 204V51m-2 14-55-10-13 18 13 17 56-8m2-21 54-13 19 17-18 19-56-4m-1 39-51-8-15 19 14 17 52-9" stroke={ink} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
    <path d="m125 57 46 9-1 18-44 5-12-16 11-16Zm63 4 44-11 17 15-16 16-45-4V61Zm-57 52 39 6v19l-39 8-14-16 14-17Z" fill="var(--color-pink-soft)"/>
    <path d="M179 204V51m-2 14-55-10-13 18 13 17 56-8m2-21 54-13 19 17-18 19-56-4m-1 39-51-8-15 19 14 17 52-9" stroke={ink} strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round"/>
    <path d="M72 121c3-14 19-21 30-12 12 9 5 28-8 32-12 2-26-7-22-20Z" fill="var(--color-cream)" stroke={ink} strokeWidth="2.8"/>
    <path d="M80 120c6-4 12-4 19-2m-29 2c0-15 14-23 25-17m-1 36c2 21-4 35-4 52m-15-40c12-9 26-8 35 0l-4 38-34-2 3-36Z" fill="var(--color-primary)" stroke={ink} strokeWidth="2.8" strokeLinejoin="round" strokeLinecap="round"/>
    <path d="m77 189-5 24-10 6m43-29 9 23 13 5m-51-58-20 14-10-8m61-6 22 10 12-9" stroke={ink} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m43 39 5-17 7 17 16 5-16 5-6 14-6-14-15-5 15-5Z" fill="var(--color-butter)" stroke={ink} strokeWidth="2"/>
    <path d="m255 116 3-12m-12 16-8 2m21 4 7 6" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>;
}

export function ClarityIllustration({ className, ...props }: MarkProps) {
  return <svg viewBox="0 0 300 150" fill="none" className={cn("text-foreground", className)} aria-hidden="true" {...props}>
    <path d="M10 73c12-35 40 15 16 22-23 7-10-45 16-36 26 8-4 54-13 33-9-25 33-46 42-22 9 24-34 26-15 9 18-17 38 0 28 18-8 14-30-2-10-15 18-10 33 7 54 4" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M129 86c28-2 43-13 64-13h91m-17-12 18 12-17 14" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m210 32 5-16 5 16 15 5-15 5-5 15-5-15-15-5 15-5Z" fill="var(--color-butter)" stroke="currentColor" strokeWidth="2"/>
    <path d="M138 107c27 13 52 14 74 4" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round"/>
  </svg>;
}

export function BookThoughtIllustration({ className, ...props }: MarkProps) {
  return <svg viewBox="0 0 310 210" fill="none" className={cn("text-foreground", className)} aria-hidden="true" {...props}>
    <path d="M29 155c42-17 75-15 126 7 47-22 86-24 128-8v33c-52-10-89-6-128 14-39-19-75-25-126-12v-34Z" fill="var(--color-pink-soft)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <path d="M155 162V198M37 164c41-10 78-7 110 8m16 0c42-17 77-19 110-10M59 177c24-4 43-2 62 3m68 3c25-9 43-11 64-10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M77 107 57 74l72-21 23 38-75 16Z" fill="var(--color-teal)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <path d="m95 62 17 33m-9-32 17 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="m194 114 27-79 10-8 8 14-27 81-20 15 2-23Z" fill="var(--color-butter)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round"/>
    <path d="m194 114 18 8m9-87 18 6" stroke="currentColor" strokeWidth="2"/>
    <path d="m46 30 5-16 5 16 14 5-14 4-5 14-5-14-14-4 14-5Zm210 62 3-10 3 10 10 3-10 3-3 10-3-10-10-3 10-3Z" fill="var(--color-primary)" stroke="currentColor" strokeWidth="1.5"/>
  </svg>;
}

export function AlertJourneyIllustration({ className, ...props }: MarkProps) {
  return <svg viewBox="0 0 380 116" fill="none" className={cn("text-foreground", className)} aria-hidden="true" {...props}>
    <path d="M41 40h28m38 0h29m38 0h29m38 0h29m39 0h29" stroke="var(--color-primary)" strokeWidth="2.5" strokeDasharray="4 5" strokeLinecap="round"/>
    <path d="M13 17h31v51H13zM20 26h17m-18 18h19m-14 9h9" fill="var(--color-pink-soft)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
    <path d="m80 58 7-40 27 6-8 42-26-8Zm5-22 18 4m-20 4 17 4" fill="var(--color-cream)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"/>
    <path d="m148 52 1-30 34 2-1 30-17 11-17-13Zm0-27 17 14 18-13" fill="var(--color-butter)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/>
    <path d="M221 17c-12 1-16 9-16 17 0 13 9 21 22 21 10 0 17-6 17-17 0-12-8-21-23-21Zm-12 49c2-7 9-10 18-10s17 3 20 11" fill="var(--color-teal)" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M280 23c13-16 38-13 47 4 10 18-1 35-18 37m-3 0 9 1-4-10M330 52c-13 17-39 14-48-3-9-17 1-35 19-37m3 0-9-1 4 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M29 92h294" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".35"/>
  </svg>;
}

export function PathwayCue({ index, className }: { index: number; className?: string }) {
  const shared = { stroke: "currentColor", strokeWidth: 2.2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  const shapes = [
    <><path d="M7 10c3-3 27-4 34 0 4 4 3 19-1 22-5 4-13 4-21 3L9 42l2-10c-6-4-7-18-4-22Z"/><path d="M14 21h23m-22 7h14"/></>,
    <><path d="M5 38c12-4 12-27 23-28 12 0 7 22 20 21"/><path d="m39 23 10 8-10 7"/></>,
    <><rect x="13" y="5" width="28" height="43" rx="5"/><path d="M19 13h16m-15 12h13m-11 13h10"/></>,
    <><path d="M7 11c15-5 25-4 39 1v34c-13-5-25-6-39-1V11Zm7 12h23m-23 8h16"/><path d="m40 35 9-20"/></>,
    <><path d="M7 10c14-4 22-2 25 3v32c-5-5-13-7-25-4V10Zm25 3c5-5 13-7 21-4v32c-11-3-17-1-21 4"/><path d="M14 20h11m-11 7h8m18-8h7"/></>,
    <><circle cx="15" cy="16" r="7"/><circle cx="44" cy="16" r="7"/><path d="M4 43c0-12 22-12 22 0m7 0c0-12 22-12 22 0M23 24c7 6 11 6 17 0"/></>,
  ];
  return <svg viewBox="0 0 60 52" fill="none" className={cn("text-current", className)} aria-hidden="true" {...shared}>{shapes[index] ?? shapes[0]}</svg>;
}