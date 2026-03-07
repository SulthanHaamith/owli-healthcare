"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Leaf } from "lucide-react";
import { useI18n } from "@/lib/i18n";

const navLinks = [
  { href: "/", key: "common.home" },
  { href: "/about", key: "common.about" },
  { href: "/services", key: "common.services" },
  { href: "/doctors", key: "common.doctors" },
  { href: "/resources", key: "common.resources" },
  { href: "/blog", key: "common.blog" },
  { href: "/gallery", key: "common.gallery" },
  { href: "/contact", key: "common.contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { locale, setLocale, t } = useI18n();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const portalLink =
    session?.user?.role === "ADMIN"
      ? "/admin"
      : session?.user?.role === "DOCTOR"
      ? "/doctor"
      : "/portal";

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      } bg-white`}
    >
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded"
      >
        {t("common.skipToMain")}
      </a>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label={t("common.siteName")}
          >
            <Leaf className="h-8 w-8 text-primary" aria-hidden="true" />
            <div>
              <span className="text-xl font-bold text-primary">Owl I</span>
              <span className="hidden sm:block text-xs text-light-text leading-tight">
                Health & Wellness
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  pathname === link.href
                    ? "text-primary bg-light-green/30"
                    : "text-dark-text hover:text-primary hover:bg-gray-50"
                }`}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLocale(locale === "en" ? "ta" : "en")}
              className="px-2 py-1 text-sm font-medium border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              aria-label={`Switch to ${locale === "en" ? "Tamil" : "English"}`}
            >
              {locale === "en" ? "தமிழ்" : "EN"}
            </button>

            {/* Book Now button - desktop */}
            <Link
              href="/book"
              className="hidden lg:inline-flex btn-primary text-sm !px-4 !py-2"
            >
              {t("common.bookNow")}
            </Link>

            {/* Auth buttons - desktop */}
            <div className="hidden lg:flex items-center gap-2">
              {session ? (
                <div className="flex items-center gap-2">
                  <Link
                    href={portalLink}
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    {t("common.portal")}
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-sm font-medium text-light-text hover:text-dark-text"
                  >
                    {t("common.logout")}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-dark-text hover:text-primary"
                  >
                    {t("common.login")}
                  </Link>
                  <Link
                    href="/register"
                    className="text-sm font-medium text-secondary hover:underline"
                  >
                    {t("common.register")}
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-md text-dark-text hover:bg-gray-100"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile slide-in drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />
          <nav
            className="fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl lg:hidden overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold text-primary">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-md hover:bg-gray-100"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block px-6 py-3 text-base font-medium transition-colors ${
                    pathname === link.href
                      ? "text-primary bg-light-green/20"
                      : "text-dark-text hover:text-primary hover:bg-gray-50"
                  }`}
                >
                  {t(link.key)}
                </Link>
              ))}

              <div className="border-t my-4" />

              <Link
                href="/book"
                className="block mx-6 text-center btn-primary text-sm"
              >
                {t("common.bookNow")}
              </Link>

              <div className="mt-4 px-6 space-y-2">
                {session ? (
                  <>
                    <Link
                      href={portalLink}
                      className="block py-2 text-sm font-medium text-primary"
                    >
                      {t("common.portal")}
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="block py-2 text-sm font-medium text-light-text"
                    >
                      {t("common.logout")}
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block py-2 text-sm font-medium text-dark-text"
                    >
                      {t("common.login")}
                    </Link>
                    <Link
                      href="/register"
                      className="block py-2 text-sm font-medium text-secondary"
                    >
                      {t("common.register")}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </nav>
        </>
      )}
    </header>
  );
}
