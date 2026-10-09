import { createFileRoute } from "@tanstack/react-router";
import { CommerceShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/order-confirmation")({ head: () => routeHead("Order Confirmation — Priscilla Kuti-Ukaegbu", "Order confirmation and next steps for books and resources.", "/order-confirmation"), component: () => <CommerceShell kind="confirmation" /> });
