"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import Link from "next/link";

const links = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];
const sectionIds = ["home", ...links.map((link) => link.id)];
const emptySubscribe = () => () => {};
function subscribeToScroll(notify: () => void) {
  let frame = 0;
  const update = () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(notify);
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  return () => {
    cancelAnimationFrame(frame);
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
  };
}
function readActiveSection() {
  if (typeof window === "undefined") return "home";
  const threshold =
    (document.querySelector("header")?.getBoundingClientRect().bottom ?? 80) +
    48;
  let current = "home";
  for (const id of sectionIds) {
    const element = document.getElementById(id);
    if (element && element.getBoundingClientRect().top <= threshold)
      current = id;
  }
  if (
    document.getElementById("contact") &&
    innerHeight + scrollY >= document.documentElement.scrollHeight - 4
  )
    current = "contact";
  return current;
}

export function Header() {
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
  const active = useSyncExternalStore(
    subscribeToScroll,
    readActiveSection,
    () => "home",
  );
  const { resolvedTheme, setTheme } = useTheme();
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const onPointer = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 900) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);
  const isDark = mounted && resolvedTheme === "dark";
  return (
    <header
      ref={header}
      className="masthead"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node))
          setOpen(false);
      }}
    >
      <div className="masthead-inner wrap">
        <Link
          className="identity"
          href="/#home"
          aria-label="Akhilesh Mourya, home"
          onClick={() => setOpen(false)}
        >
          <span className="identity-mark" aria-hidden="true">
            am.
          </span>
          <span>Akhilesh Mourya</span>
        </Link>
        <nav
          id="primary-navigation"
          className={`main-navigation ${open ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map(({ id, label }) => (
            <Link
              key={id}
              href={`/#${id}`}
              aria-current={active === id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <a href={profile.resume} className="mobile-resume" download>
            Download resume <ArrowUpRight size={16} aria-hidden="true" />
          </a>
          <a
            href={profile.upwork}
            className="mobile-upwork"
            target="_blank"
            rel="noreferrer"
          >
            Upwork profile <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </nav>
        <div className="header-actions">
          <a className="resume-nav" href={profile.resume} download>
            Resume <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            className="icon-button"
            type="button"
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            onClick={() => setTheme(isDark ? "light" : "dark")}
          >
            {isDark ? (
              <Sun size={19} aria-hidden="true" />
            ) : (
              <Moon size={19} aria-hidden="true" />
            )}
          </button>
          <button
            ref={toggle}
            className="icon-button menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label={open ? "Close navigation" : "Open navigation"}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <X size={22} aria-hidden="true" />
            ) : (
              <Menu size={22} aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
