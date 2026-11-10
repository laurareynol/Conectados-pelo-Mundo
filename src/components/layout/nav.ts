import { Briefcase, Home, LayoutDashboard, ListChecks, MessagesSquare, ShieldCheck, Users, Bookmark, UserRound } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";

export const navItems = (t: Dictionary) => [
  { href: "/painel", label: t.nav.dashboard, icon: LayoutDashboard },
  { href: "/planejador", label: t.nav.planner, icon: ListChecks },
  { href: "/trabalho", label: t.nav.work, icon: Briefcase },
  { href: "/moradia", label: t.nav.housing, icon: Home },
  { href: "/comunidade", label: t.nav.community, icon: Users },
  { href: "/conversas", label: t.nav.messages, icon: MessagesSquare },
];

export const secondaryNav = (t: Dictionary) => [
  { href: "/perfil", label: t.nav.profile, icon: UserRound },
  { href: "/salvos", label: t.nav.saved, icon: Bookmark },
  { href: "/seguranca", label: t.nav.safety, icon: ShieldCheck },
];

export const isActive = (pathname: string, href: string) => pathname === href || pathname.startsWith(`${href}/`);
