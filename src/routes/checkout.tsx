import { createFileRoute } from "@tanstack/react-router";
import { CommerceShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/checkout")({ head: () => routeHead("Checkout — Priscilla Kuti-Ukaegbu", "Review order, delivery and payment details for books and resources.", "/checkout"), component: () => <CommerceShell kind="checkout" /> });
