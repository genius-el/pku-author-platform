import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type SceneProps = ComponentProps<"svg">;

const sceneClass = "h-auto w-full text-foreground";

/** A reflective character scene for the homepage introduction. */
export function ThinkingCharacterScene({ className, ...props }: SceneProps) {
  return (
    <svg viewBox="0 0 280 250" fill="none" className={cn(sceneClass, className)} aria-hidden="true" {...props}>
      <path d="M28 215c45-8 90-9 131-4 35 4 67 3 95-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M173 46c22-13 40 4 34 23 20 8 20 34 3 44-2 24-19 35-39 29-18-7-25-26-19-45-9-20 0-42 21-51Z" fill="var(--color-cream)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M157 69c-1-26 18-40 41-32 13 4 20 13 20 25-11-7-18-10-25-9-8 1-12 8-22 11-4 1-9 2-14 5Z" fill="var(--color-charcoal)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M174 89c3-3 7-3 10 0m14-1c3-3 7-2 9 1m-19 17c7 4 14 3 19-2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M164 137c-18 5-30 20-33 44l-2 32c19 8 49 10 74 1l-3-43c-2-16-15-29-36-34Z" fill="var(--color-teal)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m161 150-20 24 22 17m30-31 13 18-19 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m144 216-5 15m50-14 8 13" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M223 48c13-17 34-15 40-2 4 10-4 18-14 18" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="m226 31 4-10 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill="var(--color-butter)" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M36 85c9-11 23-10 27-2 3 7-3 13-10 13m-5-30 3-8m15 13 7-4" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

/** A choosing gesture and branching signposts, distinct from the home pathways. */
export function WayfinderCharacterScene({ className, ...props }: SceneProps) {
  return (
    <svg viewBox="0 0 300 260" fill="none" className={cn(sceneClass, className)} aria-hidden="true" {...props}>
      <path d="M253 228c-60-11-133-12-207-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M190 218V70" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="m187 82-70-12-12 17 11 17 71-8m4-12 61-16 16 17-15 18-62-5" fill="var(--color-pink-soft)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="M113 88h48m39 0 47-11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M76 116c-4-19 8-38 25-40 18-1 29 15 24 33-3 13-13 20-26 19-11-1-20-4-23-12Z" fill="var(--color-cream)" stroke="currentColor" strokeWidth="3" />
      <path d="M78 94c2-20 17-30 33-24 9 4 15 11 15 21-7-4-13-6-19-5-8 1-16 9-29 8Z" fill="var(--color-charcoal)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M91 103h1m17 0h1m-15 11c5 3 10 3 14-1" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M91 129c-15 5-23 18-25 39l-2 40c20 9 47 11 68 3l-3-45c-1-19-16-34-38-37Z" fill="var(--color-primary)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m80 144-22 18 12 18m51-32 20-15 15 6m-15-6 15 6-10 11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m72 209-7 19m52-15 11 16" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="m47 61 4-11 4 11 11 4-11 4-4 11-4-11-11-4 11-4Z" fill="var(--color-butter)" stroke="currentColor" strokeWidth="1.8" />
      <path d="M232 139c9-5 17-5 24 0m-20 10c6-3 11-3 16 0" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** A person helping a tangled thought become a clearer route. */
export function UntanglingCharacterScene({ className, ...props }: SceneProps) {
  return (
    <svg viewBox="0 0 340 230" fill="none" className={cn(sceneClass, className)} aria-hidden="true" {...props}>
      <path d="M18 158c11-30 28 17 39-14 12-31-21-35-9-54 13-20 35 23 48 2 12-20-16-37-1-49 17-14 34 24 44 8" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" />
      <path d="M138 82c-8-14-3-34 12-41 13-7 30 0 34 15 6 17-3 33-19 37-12 3-21-1-27-11Z" fill="var(--color-cream)" stroke="currentColor" strokeWidth="3" />
      <path d="M136 62c-2-17 11-30 26-29 12 1 20 8 22 19-10-5-16-5-22-1-8 6-14 11-26 11Z" fill="var(--color-charcoal)" stroke="currentColor" strokeWidth="2.5" />
      <path d="m150 67 4-2m12-2 4 1m-17 12c5 1 9 0 12-4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M147 96c-18 6-27 18-28 37l-1 59c19 10 52 11 74 0l-7-59c-2-20-17-34-38-37Z" fill="var(--color-teal)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m132 112-21 24 18 12m57-24 23 14 29-11" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m131 192-7 19m47-16 8 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M213 133c17-1 27-9 43-19 11-7 20 4 12 11m-12-11 11 1-2 10m-30 21c20 0 37-8 55-18 10-6 17 5 9 11m-10-12 11 1-3 10" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M274 119c12-17 27-14 31-5 3 7-2 13-9 13m-7 31c12-16 27-14 31-5 3 7-2 13-9 13" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="m78 187 4-10 4 10 10 4-10 4-4 10-4-10-10-4 10-4Z" fill="var(--color-butter)" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

/** A relaxed reader scene built around an open book and margin notes. */
export function ReaderCharacterScene({ className, ...props }: SceneProps) {
  return (
    <svg viewBox="0 0 310 210" fill="none" className={cn(sceneClass, className)} aria-hidden="true" {...props}>
      <path d="M101 82c-2-17 10-32 27-33 17-1 28 12 27 29-1 15-12 24-27 23-14-1-25-7-27-19Z" fill="var(--color-cream)" stroke="currentColor" strokeWidth="3" />
      <path d="M101 70c1-18 14-30 31-27 12 2 20 11 21 22-9-4-17-5-23-1-8 5-15 9-29 6Z" fill="var(--color-charcoal)" stroke="currentColor" strokeWidth="2.5" />
      <path d="m113 77 2-1m15 1 2 1m-15 10c5 4 10 4 15 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M111 102c-17 5-26 19-28 39l-3 18c21 9 49 8 70-1l-5-19c-5-22-16-34-34-37Z" fill="var(--color-primary)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m95 119 21 31m36-25 13 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="m179 59 4-13 4 13 13 4-13 4-4 13-4-13-13-4 13-4Z" fill="var(--color-butter)" stroke="currentColor" strokeWidth="1.8" />
      <path d="M225 83c9-9 22-8 27-1 4 6 0 12-8 13m-15-25 3-7m12 12 7-3" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="m70 182-3-20 10 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** A student notices a phone alert, considers an offer, and builds a repeatable path. */
export function BankAlertStoryScene({ className, ...props }: SceneProps) {
  return (
    <svg viewBox="0 0 520 230" fill="none" className={cn(sceneClass, className)} aria-hidden="true" {...props}>
      <path d="M40 194c120-12 271-12 435-1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M83 66c-3-19 10-34 27-35 17-1 28 13 26 30-1 15-12 24-27 23-13-1-24-6-26-18Z" fill="var(--color-cream)" stroke="currentColor" strokeWidth="3" />
      <path d="M83 52c2-19 16-29 31-26 12 2 19 10 21 21-9-4-16-4-22 0-8 5-16 8-30 5Z" fill="var(--color-charcoal)" stroke="currentColor" strokeWidth="2.5" />
      <path d="m96 59 2-1m15 1 2 1m-14 10c5 3 9 3 13-1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M94 86c-15 4-23 17-25 35l-2 69c21 9 49 8 69-1l-6-70c-2-19-16-31-36-33Z" fill="var(--color-teal)" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
      <path d="m81 105 27 27m31-26 17 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <path d="M158 95V51c0-6 4-10 10-10h27c6 0 10 4 10 10v58c0 6-4 10-10 10h-27c-6 0-10-4-10-10V95Z" fill="var(--color-pink-soft)" stroke="currentColor" strokeWidth="3" />
      <path d="M168 55h27m-22 10h17m-11 42h7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="m214 65 15-8m-12 21 16-1m-22-29 7-12" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M249 116h55" stroke="var(--color-primary)" strokeWidth="2.5" strokeDasharray="4 7" strokeLinecap="round" />
      <path d="m295 108 11 8-11 8" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M319 72c9-12 23-12 31-5 7 7 6 18-1 24-8 9-22 6-29-2-7-7-7-11-1-17Z" fill="var(--color-butter)" stroke="currentColor" strokeWidth="2.5" />
      <path d="M323 83c5-4 10-5 16-3m-18 12 9 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M365 116h53" stroke="var(--color-primary)" strokeWidth="2.5" strokeDasharray="4 7" strokeLinecap="round" />
      <path d="m409 108 11 8-11 8" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M435 72h43v48h-43z" fill="var(--color-pink-soft)" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M443 84h27m-27 10h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M446 148c-8-9-21-10-29-4-8 7-7 17 1 23 8 7 20 5 27-3m0-16c8-9 21-10 29-4 8 7 7 17-1 23-8 7-20 5-27-3m0-16v25" stroke="var(--color-teal)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m287 50 4-11 4 11 11 4-11 4-4 11-4-11-11-4 11-4Z" fill="var(--color-primary)" />
      <path d="m460 44 3-8 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" fill="var(--color-teal)" />
    </svg>
  );
}
