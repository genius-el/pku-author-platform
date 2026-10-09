import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, BookOpen } from "lucide-react";

import { siteAssets } from "@/components/site-assets";
import { BookThoughtIllustration, NotebookMark } from "@/components/editorial-marks";
import { ReaderCharacterScene } from "@/components/editorial-characters";
import { BadgeNote } from "@/components/site-sections";
import { Button } from "@/components/ui/button";
import { routeHead } from "@/lib/page-meta";
import { getPublishedCatalogue, type PublicCatalogueItem } from "@/lib/catalogue-public.functions";

export const Route = createFileRoute("/books")({
  head: () => routeHead(
    "Books — Priscilla Kuti-Ukaegbu",
    "The books I am writing and developing, beginning with Dear Bank Alert and How Much For Your Nikes?",
    "/books",
  ),
  loader: () => getPublishedCatalogue({ data: { type: "book" } }),
  component: BooksPage,
});

const isDba = (b: PublicCatalogueItem) => b.slug === "dear-bank-alert" || b.title.trim().toLowerCase() === "dear bank alert";
const isNikes = (b?: PublicCatalogueItem) => !b || /how much for your nikes/i.test(b.title);
const paras = (s: string) => s.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

// Approved static copy is used when no published book exists (migration safeguard),
// and as the fallback for any field the admin left empty.
function FeaturedBook({ book }: { book?: PublicCatalogueItem }) {
  const desc = book ? paras(book.description) : [];
  return (
    <article className="grid overflow-hidden border-y bg-background lg:grid-cols-[0.8fr_1.2fr] lg:border">
      <figure className="grid place-items-center bg-pink-soft p-7 md:p-10">
        {book?.image ? (
          <img src={book.image} alt={`${book.title} book cover`} className="w-full max-w-sm rounded-xl object-contain shadow-lift" />
        ) : (
          <>
            <img src={siteAssets.bookMockup} alt="Temporary Dear Bank Alert book mockup" className="w-full max-w-sm rounded-xl object-contain shadow-lift" />
            <figcaption className="mt-4 text-xs text-muted-foreground">Temporary book mockup</figcaption>
          </>
        )}
      </figure>
      <div className="p-7 md:p-12">
        <BadgeNote tone="butter">Coming soon.</BadgeNote>
        <h2 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-6xl">{book?.title ?? "Dear Bank Alert"}</h2>
        <p className="mt-4 font-display text-2xl leading-snug text-primary md:text-3xl">{book?.short_description ?? "Build your first real source of income while you’re still a student."}</p>
        {desc.length ? desc.map((p) => <p key={p} className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">{p}</p>) : (
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground md:text-lg">A practical, Nigerian, no-fluff guide to identifying what people will pay you for, packaging it, selling it and building a repeatable income skill before graduation.</p>
        )}
        <Button asChild size="lg" className="mt-8">
          <Link to="/dear-bank-alert">DISCOVER DEAR BANK ALERT <ArrowRight aria-hidden="true" /></Link>
        </Button>
      </div>
    </article>
  );
}

function ShelfBook({ book, first }: { book?: PublicCatalogueItem; first?: boolean }) {
  const nikes = isNikes(book);
  const desc = book ? paras(book.description) : [];
  return (
    <article className={`${first ? "" : "mt-12 "}grid gap-8 border-t border-border bg-background py-10 lg:grid-cols-[0.6fr_1.4fr] lg:items-start`}>
      {book?.image ? (
        <img src={book.image} alt={`${book.title} book cover`} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      ) : (
        <div className="relative flex min-h-52 items-center justify-center bg-accent/55 text-charcoal">
          <NotebookMark className="w-28 text-charcoal" />
          <BookOpen className="absolute bottom-6 right-7 h-8 w-8 opacity-30" aria-hidden="true" />
        </div>
      )}
      <div>
        {nikes && <BadgeNote tone="teal">In development</BadgeNote>}
        <h2 className="mt-5 font-display text-4xl leading-tight text-foreground md:text-5xl">{book?.title ?? "How Much For Your Nikes?"}</h2>
        {(book?.short_description ?? (nikes ? "A book about stewardship." : null)) && (
          <p className="mt-3 font-display text-2xl text-primary">{book?.short_description ?? "A book about stewardship."}</p>
        )}
        <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-muted-foreground md:text-lg">
          {desc.length ? desc.map((p) => <p key={p}>{p}</p>) : nikes ? (
            <>
              <p>What if your real problem is not productivity?</p>
              <p>What if you simply have not learned to carry what has been entrusted to you with the weight it deserves?</p>
              <p>How Much For Your Nikes? is about gifts, assignments, discipline, sacrifice and the courage to protect what matters.</p>
              <p>Publication date and format will be announced.</p>
            </>
          ) : null}
        </div>
        {book?.external_url ? (
          <Button asChild variant="charcoal" size="lg" className="mt-8">
            <a href={book.external_url} target="_blank" rel="noopener noreferrer">{`MEET ${book.title.toUpperCase()}`} <ArrowRight aria-hidden="true" /></a>
          </Button>
        ) : (
          <Button asChild variant="charcoal" size="lg" className="mt-8">
            <Link to="/writing">FOLLOW THE WRITING <ArrowRight aria-hidden="true" /></Link>
          </Button>
        )}
      </div>
    </article>
  );
}

function BooksPage() {
  const books = Route.useLoaderData();
  return (
    <>
      <section className="relative overflow-hidden border-b bg-background">
        <div className="container-page grid gap-5 py-14 md:grid-cols-[minmax(0,1fr)_minmax(180px,0.37fr)] md:items-center md:py-20">
          <div className="max-w-4xl">
            <p className="text-sm font-bold uppercase text-primary">Books</p>
            <h1 className="mt-5 font-display text-5xl leading-[1.05] text-foreground md:text-7xl">I write the books I wish somebody had shoved into my hands earlier.</h1>
            <div className="mt-7 max-w-2xl space-y-3 text-base leading-8 text-muted-foreground md:text-lg">
              <p>Some ideas need more room than a class, a caption or a WhatsApp voice note can give them.</p>
              <p className="font-display text-2xl text-foreground">So I write.</p>
            </div>
          </div>
          <div className="relative mx-auto w-48 max-w-full md:w-full md:max-w-72">
            <BookThoughtIllustration className="block w-full" />
            <ReaderCharacterScene className="absolute inset-0 h-full w-full" />
          </div>
        </div>
      </section>

       <section className="relative overflow-hidden bg-paper">
        <div className="container-page py-16 md:py-24">
          {books.length === 0 ? (
            <>
              <FeaturedBook />
              <ShelfBook />
            </>
          ) : (
            books.map((b, i) => isDba(b)
              ? <FeaturedBook key={b.id} book={b} />
              : <ShelfBook key={b.id} book={b} first={i === 0} />)
          )}
        </div>
      </section>

      <section className="bg-charcoal text-primary-foreground">
        <div className="container-page py-16 md:flex md:items-end md:justify-between md:gap-10 md:py-20">
          <div className="max-w-3xl">
            <p className="font-display text-3xl leading-tight md:text-5xl">There are more books in my head than is probably reasonable.</p>
            <p className="mt-5 text-base leading-8 text-primary-foreground/75 md:text-lg">Good Mornings With Kuku is usually where you will hear about them first.</p>
          </div>
          <Button asChild variant="butter" size="lg" className="mt-8 shrink-0 md:mt-0">
            <Link to="/writing">JOIN GOOD MORNINGS WITH KUKU <ArrowRight aria-hidden="true" /></Link>
          </Button>
        </div>
      </section>
    </>
  );
}
