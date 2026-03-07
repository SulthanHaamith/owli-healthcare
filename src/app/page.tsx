"use client";

import Link from "next/link";
import {
  Droplets,
  Leaf,
  UtensilsCrossed,
  Hand,
  Activity,
  Zap,
  Star,
  ArrowRight,
  Phone,
  Stethoscope,
  Heart,
  IndianRupee,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CLINIC } from "@/lib/constants";

const serviceIcons = [
  { icon: Droplets, nameKey: "Hydrotherapy", descKey: "Hip bath, Spinal bath, Steam bath, Enema therapy" },
  { icon: Leaf, nameKey: "Mud Therapy", descKey: "Mud pack, Mud bath, Clay applications" },
  { icon: UtensilsCrossed, nameKey: "Diet Therapy", descKey: "Therapeutic fasting, Detox diets, Meal plans" },
  { icon: Hand, nameKey: "Massage Therapy", descKey: "Full body oil massage, Reflexology" },
  { icon: Activity, nameKey: "Yoga Therapy", descKey: "Asanas, Pranayama, Meditation" },
  { icon: Zap, nameKey: "Acupuncture", descKey: "Pain management, Meridian therapy" },
];

const whyChooseItems = [
  { icon: Stethoscope, titleKey: "whyChooseUs.items.experienced.title", descKey: "whyChooseUs.items.experienced.description" },
  { icon: Leaf, titleKey: "whyChooseUs.items.natural.title", descKey: "whyChooseUs.items.natural.description" },
  { icon: Heart, titleKey: "whyChooseUs.items.personalized.title", descKey: "whyChooseUs.items.personalized.description" },
  { icon: IndianRupee, titleKey: "whyChooseUs.items.affordable.title", descKey: "whyChooseUs.items.affordable.description" },
];

export default function HomePage() {
  const { t } = useI18n();

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-primary min-h-[600px] flex items-center">
        {/* [PLACEHOLDER: Replace with full-width hero image of nature/wellness scene — 1920x800] */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t("hero.heading")}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 leading-relaxed">
            {t("hero.subheading")}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/book" className="btn-primary !bg-secondary hover:!bg-secondary/90">
              {t("common.bookAppointment")}
            </Link>
            <Link href="/services" className="btn-outline !border-white !text-white hover:!bg-white/10">
              {t("common.exploreServices")}
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-4">
                {t("aboutPreview.heading")}
              </h2>
              <p className="text-light-text leading-relaxed mb-6">
                {t("aboutPreview.description")}
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-secondary font-medium hover:underline"
              >
                {t("aboutPreview.link")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="bg-light-green/30 rounded-2xl h-72 md:h-96 flex items-center justify-center">
              {/* [PLACEHOLDER: Replace with clinic interior photo] */}
              <span className="text-light-text">Clinic Photo</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">
              {t("servicesOverview.heading")}
            </h2>
            <p className="text-light-text max-w-2xl mx-auto">
              {t("servicesOverview.subheading")}
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceIcons.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="w-12 h-12 bg-light-green/30 rounded-lg flex items-center justify-center mb-4 group-hover:bg-secondary/10 transition-colors">
                    <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-text mb-2">
                    {service.nameKey}
                  </h3>
                  <p className="text-sm text-light-text">{service.descKey}</p>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-secondary font-medium hover:underline"
            >
              {t("servicesOverview.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-light-green/20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t("whyChooseUs.heading")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {whyChooseItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <Icon className="h-7 w-7 text-secondary" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-dark-text mb-2">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-light-text">{t(item.descKey)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Placeholder */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">
              {t("testimonials.heading")}
            </h2>
            <p className="text-light-text max-w-2xl mx-auto">
              {t("testimonials.subheading")}
            </p>
          </div>
          {/* Testimonials carousel will be populated from database in Phase 2 */}
          <div className="bg-cream rounded-2xl p-8 text-center">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 text-warning fill-warning"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="text-lg text-dark-text italic mb-4 max-w-2xl mx-auto">
              &ldquo;The naturopathy treatments at Owl I have transformed my health. After years of chronic back pain, I finally found lasting relief through their holistic approach.&rdquo;
            </blockquote>
            {/* [PLACEHOLDER: Replace with real patient testimonial data from database] */}
            <p className="font-semibold text-primary">Patient Name</p>
            <p className="text-sm text-light-text">Back Pain Treatment</p>
          </div>
        </div>
      </section>

      {/* Blog Preview Placeholder */}
      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-3">
              {t("blogPreview.heading")}
            </h2>
            <p className="text-light-text max-w-2xl mx-auto">
              {t("blogPreview.subheading")}
            </p>
          </div>
          {/* Blog posts will be populated from database in Phase 2 */}
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <div className="h-48 bg-light-green/20 flex items-center justify-center">
                  {/* [PLACEHOLDER: Replace with blog post cover image] */}
                  <span className="text-light-text">Blog Image {i}</span>
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-secondary uppercase">
                    Wellness
                  </span>
                  <h3 className="text-lg font-semibold text-dark-text mt-1 mb-2">
                    Blog Post Title {i}
                  </h3>
                  <p className="text-sm text-light-text">
                    Brief excerpt of the blog post content goes here...
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-secondary font-medium hover:underline"
            >
              {t("blogPreview.viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("cta.heading")}
          </h2>
          <p className="text-white/80 mb-8 text-lg">
            {t("cta.subheading")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book" className="btn-primary !bg-secondary hover:!bg-secondary/90">
              {t("cta.bookButton")}
            </Link>
            <a
              href={`tel:${CLINIC.phone}`}
              className="btn-outline !border-white !text-white hover:!bg-white/10"
            >
              <Phone className="h-4 w-4 inline mr-2" aria-hidden="true" />
              {t("cta.callButton")}
            </a>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("contact.findUs")}
              </h2>
              <div className="space-y-3">
                <p className="text-light-text">{CLINIC.address}</p>
                <p>
                  <a
                    href={`tel:${CLINIC.phone}`}
                    className="text-secondary hover:underline"
                  >
                    {CLINIC.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`mailto:${CLINIC.email}`}
                    className="text-secondary hover:underline"
                  >
                    {CLINIC.email}
                  </a>
                </p>
                <p className="text-light-text">{CLINIC.hours}</p>
              </div>
            </div>
            <div className="h-72 bg-gray-100 rounded-xl overflow-hidden">
              {/* [PLACEHOLDER: Update with exact Google Maps embed URL for the clinic location] */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3944.0!2d77.7!3d8.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwNDInMDAuMCJOIDc3wrA0MicwMC4wIkU!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Owl I Health and Wellness Center location"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
