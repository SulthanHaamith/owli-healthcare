"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Droplets,
  Leaf,
  UtensilsCrossed,
  Hand,
  Activity,
  Zap,
  Magnet,
  Palette,
  Sparkles,
  Scale,
  Brain,
  HeartPulse,
  Heart,
  Flower2,
  Clock,
  IndianRupee,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Service {
  id: string;
  name: string;
  nameTamil: string;
  slug: string;
  description: string;
  descriptionTamil: string;
  icon: string;
  category: string;
  duration: string;
  price: number | null;
}

const iconMap: Record<string, LucideIcon> = {
  Droplets,
  Leaf,
  UtensilsCrossed,
  Hand,
  Activity,
  Zap,
  Magnet,
  Palette,
  Sparkles,
  Scale,
  Brain,
  HeartPulse,
  Heart,
  Flower2,
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const { locale, t } = useI18n();

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setServices(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const coreServices = services.filter((s) => s.category === "core");
  const specializedServices = services.filter((s) => s.category === "specialized");

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("services.pageTitle")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t("services.pageDescription")}
          </p>
        </div>
      </section>

      {loading ? (
        <div className="section-padding text-center text-light-text">
          {t("common.loading")}
        </div>
      ) : (
        <>
          {/* Core Treatments */}
          <section className="section-padding bg-white">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-primary mb-8">
                Core Treatments
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {coreServices.map((service) => {
                  const Icon = iconMap[service.icon] || Activity;
                  return (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      Icon={Icon}
                      locale={locale}
                      t={t}
                    />
                  );
                })}
              </div>
            </div>
          </section>

          {/* Specialized Programs */}
          <section className="section-padding bg-cream">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-primary mb-8">
                Specialized Programs
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {specializedServices.map((service) => {
                  const Icon = iconMap[service.icon] || Activity;
                  return (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      Icon={Icon}
                      locale={locale}
                      t={t}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Not sure which treatment is right for you?
          </h2>
          <p className="text-white/80 mb-8">
            Book a consultation and our doctors will recommend the best treatment plan for your needs.
          </p>
          <Link href="/book" className="btn-primary !bg-secondary hover:!bg-secondary/90">
            {t("common.bookAppointment")}
          </Link>
        </div>
      </section>
    </>
  );
}

function ServiceCard({
  service,
  Icon,
  locale,
  t,
}: {
  service: Service;
  Icon: LucideIcon;
  locale: string;
  t: (key: string) => string;
}) {
  const name = locale === "ta" ? service.nameTamil : service.name;
  const description = locale === "ta" ? service.descriptionTamil : service.description;

  return (
    <div
      id={service.slug}
      className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-light-green/30 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-dark-text mb-2">{name}</h3>
          <p className="text-light-text text-sm leading-relaxed mb-4">
            {description}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
            <span className="flex items-center gap-1 text-light-text">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {t("services.duration")}: {service.duration}
            </span>
            {service.price && (
              <span className="flex items-center gap-1 text-secondary font-medium">
                <IndianRupee className="h-4 w-4" aria-hidden="true" />
                {t("services.from")} ₹{service.price}
              </span>
            )}
          </div>
          <Link
            href={`/book?service=${service.id}`}
            className="inline-block text-sm font-medium text-secondary hover:underline"
          >
            {t("services.bookThis")} →
          </Link>
        </div>
      </div>
    </div>
  );
}
