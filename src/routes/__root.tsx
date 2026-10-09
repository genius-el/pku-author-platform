import type { ErrorComponentProps } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { SiteLayout } from "@/components/layout";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

function NotFoundComponent() {
  return (
    <SiteLayout>
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-md text-center">
          <p className="text-sm font-bold text-primary">404</p>
           <h1 className="mt-3 font-display text-5xl text-foreground">You have wandered somewhere that does not exist.</h1>
          <div className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground"><p>Either the page moved or the internet has decided to humble us.</p><p>Let me take you somewhere useful.</p></div>
          <div className="mt-6">
            <Button asChild variant="charcoal">
              <Link to="/start-here">START HERE</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <SiteLayout>
      <div className="container-page flex min-h-[70vh] items-center justify-center py-16">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl text-foreground">Something went wrong on this side.</h1>
          <p className="mt-4 text-sm leading-7 text-muted-foreground">Please try again. If it keeps happening, send me a message and tell me what you were trying to do.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Button
              onClick={() => {
                router.invalidate();
                reset();
              }}
            >
              TRY AGAIN
            </Button>
             <Button asChild variant="outline">
               <Link to="/contact">CONTACT ME</Link>
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "author", content: "Priscilla Kuti-Ukaegbu" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Priscilla Kuti-Ukaegbu" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;500;600;700&family=Libre+Caslon+Text:wght@400;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Priscilla Kuti-Ukaegbu",
          description:
            "Author platform for Priscilla Kuti-Ukaegbu, beginning with Dear Bank Alert.",
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const isAdmin = useRouterState({ select: (s) => s.location.pathname.startsWith("/admin") });

  return (
    <QueryClientProvider client={queryClient}>
      {isAdmin ? (
        <Outlet />
      ) : (
        <SiteLayout>
          <Outlet />
        </SiteLayout>
      )}
    </QueryClientProvider>
  );
}
