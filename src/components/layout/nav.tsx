"use client";

import Link from "next/link";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useEffect, useState, type MouseEvent } from "react";
import type { Dictionary } from "@/content/dictionary";
import { localePath, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button-link";
import { CloseIcon, MenuIcon, PixelArrow } from "@/components/ui/icons";
import { Monogram } from "@/components/ui/monogram";
import { containerClass } from "@/components/ui/section";
import { LangSwitch, ThemeToggle } from "./nav-controls";

/** Stage numbers match the section headers: 01 is the opening, 06 is contact. */
const SECTIONS = [
  { id: "work", stage: "02" },
  { id: "services", stage: "03" },
  { id: "about", stage: "04" },
  { id: "experience", stage: "05" },
] as const;

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
    for (const id of ["top", ...SECTIONS.map((section) => section.id), "contact"]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [isHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
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

  const links = SECTIONS.map(({ id, stage }) => ({ id, stage, label: dict[id], href: `${home}#${id}` }));
  const contactHref = `${home}#contact`;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-150",
        scrolled || open ? "border-b-4 border-ink bg-canvas" : "border-b-4 border-transparent",
      )}
    >
      <div className={cn(containerClass, "flex h-16 items-center justify-between gap-4")}>
        <Link href={home} onClick={goHome} aria-label={dict.home} className="group flex items-center gap-4">
          <Monogram className="transition-transform duration-100 group-hover:-translate-y-0.5" />
          <span className="hidden font-heading text-lg font-bold leading-none sm:block">Ivan Kurniawan</span>
        </Link>

        <nav aria-label={dict.primary} className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className={cn(
                "relative flex min-h-11 items-center gap-2 text-sm font-semibold uppercase tracking-wide transition-colors hover:text-ink",
                active === link.id ? "text-ink" : "text-muted",
              )}
            >
              {active === link.id ? <PixelArrow className="h-3 w-3 animate-blink text-accent-text" /> : null}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitch locale={locale} path={path} label={dict.switchLanguage} />
          <ThemeToggle label={dict.toggleTheme} />
          <ButtonLink href={contactHref} className="hidden md:inline-flex">
            {dict.connect}
          </ButtonLink>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? dict.closeMenu : dict.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="pixel grid h-11 w-11 place-items-center text-ink md:hidden"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="h-[6px] origin-left bg-accent [mask-image:repeating-linear-gradient(90deg,#000_0_6px,transparent_6px_8px)]"
      />

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-menu"
            aria-label={dict.primary}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto border-t-4 border-ink bg-canvas md:hidden"
          >
            <ul className={cn(containerClass, "flex min-h-full flex-col py-4")}>
              {links.map((link, index) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.18 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-20 items-center gap-4 border-b-4 border-dashed border-line py-4"
                  >
                    <PixelArrow className="h-4 w-4 shrink-0 text-accent-text" />
                    <span className="font-heading text-4xl font-bold leading-none">{link.label}</span>
                    <span className="hud ml-auto">{link.stage}</span>
                  </Link>
                </motion.li>
              ))}
              <li className="mt-auto pb-8 pt-8">
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
