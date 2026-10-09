import { createFileRoute } from "@tanstack/react-router";
import { MessageCircle, Send } from "lucide-react";

import { BadgeNote } from "@/components/site-sections";
import { ThoughtSpark } from "@/components/editorial-marks";
import { Button } from "@/components/ui/button";
import { routeHead } from "@/lib/page-meta";

export const Route = createFileRoute("/contact")({
  head: () => routeHead(
    "Contact Priscilla Kuti-Ukaegbu",
    "Contact Priscilla Kuti-Ukaegbu for private strategy, speaking, teaching, partnerships, media, book support and other enquiries.",
    "/contact",
  ),
  component: ContactPage,
});

const enquiryTypes = [
  "Private coaching / strategy",
  "Speaking / teaching",
  "Partnership / collaboration",
  "Books / resources / order support",
  "Media",
  "Something else",
] as const;

function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container-page py-16 md:py-24">
          <p className="text-sm font-bold uppercase text-primary">Contact</p>
          <h1 className="mt-5 font-display text-5xl leading-tight text-foreground md:text-7xl">Okay, talk to me.</h1>
          <div className="mt-6 max-w-3xl space-y-3 text-base leading-8 text-muted-foreground md:text-lg">
            <p>Tell me what you need and give me enough context to understand it.</p>
            <p>If it belongs with someone on my team, I’ll make sure it gets to the right place.</p>
          </div>
          <ThoughtSpark className="absolute right-[12%] top-16 hidden w-9 text-primary/35 lg:block" />
        </div>
      </section>
      <section className="bg-paper">
        <div className="container-page grid gap-10 py-16 md:py-20 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <MessageCircle className="h-8 w-8 text-primary" aria-hidden="true" />
             <fieldset className="mt-5">
             <legend className="font-display text-3xl md:text-4xl">Choose the closest option:</legend>
             <div className="mt-6 grid gap-3">
              {enquiryTypes.map((type) => (
                <label key={type} className="flex items-center gap-3 border-b border-border py-3 text-sm font-semibold">
                  <input type="radio" name="enquiry-type" disabled className="h-4 w-4 accent-primary" />
                  {type}
                </label>
              ))}
            </div>
             </fieldset>
          </div>
          <form className="border bg-background p-6 md:p-8" aria-label="Contact form preview">
            <BadgeNote>Form preview</BadgeNote>
            <div className="mt-6 grid gap-5">
              <label className="grid gap-2 text-sm font-bold">Your name<input disabled className="h-12 rounded-full border bg-secondary px-4" /></label>
              <label className="grid gap-2 text-sm font-bold">Email<input type="email" disabled className="h-12 rounded-full border bg-secondary px-4" /></label>
              <label className="grid gap-2 text-sm font-bold">Tell me what you need<textarea disabled className="min-h-36 rounded-2xl border bg-secondary p-4" /></label>
               <Button type="button" disabled aria-describedby="contact-status" className="w-fit">SEND YOUR MESSAGE <Send aria-hidden="true" /></Button>
               <p id="contact-status" className="text-xs leading-5 text-muted-foreground">Messages open here soon.</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}