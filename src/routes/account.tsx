import { createFileRoute } from "@tanstack/react-router";
import { CommerceShell } from "@/components/shell-pages";
import { routeHead } from "@/lib/page-meta";
export const Route = createFileRoute("/account")({ head: () => routeHead("Account — Priscilla Kuti-Ukaegbu", "Access purchases and resources from Priscilla Kuti-Ukaegbu.", "/account"), component: () => <CommerceShell kind="account" /> });
