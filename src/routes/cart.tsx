import { createFileRoute } from "@tanstack/react-router";
import { CommerceShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/cart")({ head: () => routeHead("Cart — Priscilla Kuti-Ukaegbu", "Review books and resources selected from Priscilla Kuti-Ukaegbu’s store.", "/cart"), component: () => <CommerceShell kind="cart" /> });
