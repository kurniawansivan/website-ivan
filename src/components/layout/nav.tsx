"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import type { Dictionary } from "@/content/dictionary";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button-link";
import { ArrowUpRight, BlockMark, CloseIcon, MenuIcon } from "@/components/ui/icons";
import { containerClass } from "@/components/ui/section";
import { LangSwitch, ThemeToggle } from "./nav-controls";

const SECTIONS = ["work", "services", "about", "experience"] as const;

interface NavProps {
  locale: Locale;
  /** Locale-agnostic path of the current page, used by the language switch. */
  path: string;
  isHome: boolean;
  dict: Dictionary["nav"];
}

export function Nav({ locale, path, isHome, dict }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const { scrollYProgress } = useScroll();
  const home = localePath(locale, "/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const id of ["top", ...SECTIONS, "contact"]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  /** On the home page the logo scrolls to the top and clears any #hash; elsewhere it is a normal link home. */
  function goHome(event: MouseEvent<HTMLAnchorElement>) {
    setOpen(false);
    if (!isHome) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    window.history.replaceState(null, "", home);
  }

  const links = SECTIONS.map((id) => ({ id, label: dict[id], href: `${home}#${id}` }));
  const contactHref = `${home}#contact`;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        scrolled || open ? "glass border-line" : "border-transparent",
      )}
    >
      <div className={cn(containerClass, "flex h-16 items-center justify-between gap-4")}>
        <Link href={home} onClick={goHome} aria-label={dict.home} className="group flex items-center gap-2.5">
          <BlockMark className="h-7 w-7 text-accent-text transition-transform duration-500 group-hover:rotate-60" />
          <span className="hidden font-display text-base font-semibold sm:block">Ivan Kurniawan</span>
        </Link>

        <nav aria-label={dict.primary} className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm text-muted transition-colors hover:text-ink",
                active === link.id && "text-ink",
              )}
            >
              {link.label}
              {active === link.id ? (
                <motion.span layoutId="nav-underline" className="absolute inset-x-3.5 -bottom-px h-px bg-accent" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LangSwitch locale={locale} path={path} label={dict.switchLanguage} />
          <ThemeToggle label={dict.toggleTheme} />
          <ButtonLink href={contactHref} className="hidden min-h-10 md:inline-flex">
            {dict.connect}
          </ButtonLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.closeMenu : dict.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line-strong text-ink md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="h-px origin-left bg-linear-to-r from-accent to-sky"
      />

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label={dict.primary}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-line md:hidden"
          >
            <ul className={cn(containerClass, "flex flex-col py-3")}>
              {links.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center justify-between border-b border-line font-display text-xl font-medium"
                  >
                    {link.label}
                    <ArrowUpRight className="h-5 w-5 text-muted" />
                  </Link>
                </li>
              ))}
              <li className="pb-2 pt-4">
                <ButtonLink href={contactHref} onClick={() => setOpen(false)} className="w-full">
                  {dict.connect}
                </ButtonLink>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
