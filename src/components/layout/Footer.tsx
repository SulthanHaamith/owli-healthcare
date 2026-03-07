"use client";

import Link from "next/link";
import { Leaf, Phone, Mail, MapPin, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CLINIC } from "@/lib/constants";

const serviceLinks = [
  { href: "/services#hydrotherapy", label: "Hydrotherapy" },
  { href: "/services#mud-therapy", label: "Mud Therapy" },
  { href: "/services#diet-therapy", label: "Diet Therapy" },
  { href: "/services#massage-therapy", label: "Massage Therapy" },
  { href: "/services#yoga-therapy", label: "Yoga Therapy" },
  { href: "/services#acupuncture", label: "Acupuncture" },
];

const quickLinks = [
  { href: "/", key: "common.home" },
  { href: "/about", key: "common.about" },
  { href: "/services", key: "common.services" },
  { href: "/doctors", key: "common.doctors" },
  { href: "/book", key: "common.bookAppointment" },
  { href: "/resources", key: "common.resources" },
  { href: "/blog", key: "common.blog" },
  { href: "/contact", key: "common.contact" },
];

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-primary text-white" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="h-6 w-6" aria-hidden="true" />
              <span className="text-lg font-bold">Owl I</span>
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              {t("footer.aboutText")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("common.quickLinks")}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.servicesTitle")}
            </h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">
              {t("footer.contactTitle")}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin
                  className="h-4 w-4 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <span className="text-sm text-white/80">{CLINIC.address}</span>
              </li>
              <li>
                <a
                  href={`tel:${CLINIC.phone}`}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  {CLINIC.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CLINIC.email}`}
                  className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                  {CLINIC.email}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Clock
                  className="h-4 w-4 mt-1 flex-shrink-0"
                  aria-hidden="true"
                />
                <div className="text-sm text-white/80">
                  <p>{CLINIC.hours}</p>
                  <p>{CLINIC.sundayHours}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p className="text-sm text-white/60">
            &copy; {t("common.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
