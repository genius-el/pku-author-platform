import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Linkedin, Menu, Music2, Newspaper, Send, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navLinks, site } from "@/lib/site-data";
import { siteAssets } from "@/components/site-assets";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="container-page grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-3 lg:flex lg:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="Priscilla Kuti-Ukaegbu home">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-charcoal">
            <img src={siteAssets.logo} alt="Priscilla Kuti-Ukaegbu logo" className="h-7 w-7 object-contain" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[0.95rem] font-display leading-none text-foreground sm:text-lg xl:text-xl">
              Priscilla Kuti-Ukaegbu
            </span>
            <span className="hidden text-xs text-muted-foreground xl:block">Author platform</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2.5 lg:flex xl:gap-4" aria-label="Main navigation">
          {navLinks.filter((item) => item.to !== "/" && item.to !== "/start-here").map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-primary" }}
              className="whitespace-nowrap py-2 text-sm font-semibold text-foreground transition hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-2 lg:flex xl:gap-3">
          <Button asChild size="sm" variant="outline">
            <Link to="/dear-bank-alert">Dear Bank Alert</Link>
          </Button>
          <Button asChild size="sm">
            <Link to="/start-here">
              Start Here
              <ArrowRight aria-hidden="true" />
            </Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open navigation menu">
              <Menu aria-hidden="true" />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col bg-background">
            <SheetHeader className="text-left">
              <SheetTitle className="font-display text-2xl">{site.name}</SheetTitle>
            </SheetHeader>
            <nav className="mt-8 grid gap-3" aria-label="Mobile navigation">
              {navLinks.filter((item) => item.to !== "/" && item.to !== "/start-here").map((item) => (
                <SheetClose asChild key={item.to}>
                  <Link to={item.to} className="rounded-xl bg-secondary px-4 py-3 font-semibold text-foreground">
                    {item.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Button asChild variant="outline" className="mt-2">
                  <Link to="/dear-bank-alert">Dear Bank Alert</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild variant="default" className="mt-2">
                  <Link to="/start-here">Start Here <ArrowRight aria-hidden="true" /></Link>
                </Button>
              </SheetClose>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const substackUrl = "https://substack.com/@kutipriscillatemiloluwa?utm_source=share&utm_medium=android&r=2wm14y";
  const footerLinks = [
    { label: "Start Here", to: "/start-here" },
    { label: "About", to: "/about" },
    { label: "Work With Me", to: "/work-with-me" },
    { label: "Books", to: "/books" },
    { label: "Resources", to: "/resources" },
    { label: "Good Mornings With Kuku", to: "/writing" },
    { label: "Contact", to: "/contact" },
  ] as const;
  const socialLinks = [
    { label: "Instagram", href: "https://www.instagram.com/priscillakutiukaegbu?stkn=MWdhajVzenRjNjVtaw==", icon: Instagram },
    { label: "YouTube", href: "https://youtube.com/@priscillakutiukaegbu?si=F9vZOiUti_ewcyyw", icon: Youtube },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/priscillakuti?utm_source=share_via&utm_content=profile&utm_medium=member_android", icon: Linkedin },
    { label: "Substack", href: substackUrl, icon: Newspaper },
    { label: "TikTok", href: "https://vm.tiktok.com/ZSbJyYBHY/", icon: Music2 },
  ] as const;

  return (
    <footer className="bg-charcoal text-primary-foreground">
      <div className="container-page py-14">
        <div className="grid gap-12 lg:grid-cols-[1fr_0.7fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10">
                <img src={siteAssets.logo} alt="Priscilla Kuti-Ukaegbu logo" className="h-8 w-8 object-contain" />
              </span>
              <span className="font-display text-2xl uppercase">PRISCILLA KUTI-UKAEGBU</span>
            </div>
            <p className="mt-5 font-display text-2xl">Build your future. On purpose.</p>
            <p className="mt-4 max-w-md text-sm leading-7 text-primary-foreground/75">I write, teach, coach and build tools that help people take a more active hand in the life they end up living.</p>
            <div className="mt-6 flex flex-wrap gap-2" aria-label="Social media links">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label} title={label} className="grid h-11 w-11 place-items-center rounded-full border border-primary-foreground/20 text-primary-foreground transition hover:border-accent hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <nav aria-label="Footer navigation">
            <ul className="grid gap-3 text-sm text-primary-foreground/72">
              {footerLinks.map((link) => (
                <li key={link.to}><Link to={link.to} className="transition hover:text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">{link.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <h2 className="font-display text-2xl">Good Mornings With Kuku</h2>
            <p className="mt-3 text-sm leading-7 text-primary-foreground/75">Thoughtful letters about work, money, purpose, faith, people and building a future with intention.</p>
             <Button asChild variant="butter" className="mt-5 w-full sm:w-auto"><a href={substackUrl} target="_blank" rel="noreferrer">SEND ME THE LETTERS <Send aria-hidden="true" /></a></Button>
          </div>
        </div>
        <div className="mt-12 border-t border-primary-foreground/12 pt-6 text-xs text-primary-foreground/60">
          © 2026 {site.name}.
        </div>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
