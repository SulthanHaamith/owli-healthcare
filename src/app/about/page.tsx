"use client";

import {
  Leaf,
  Eye,
  Target,
  Heart,
  Award,
  BookOpen,
  Calendar,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

const values = [
  { icon: Leaf, titleKey: "about.values.holistic", descKey: "about.values.holisticDesc" },
  { icon: Heart, titleKey: "about.values.compassion", descKey: "about.values.compassionDesc" },
  { icon: Award, titleKey: "about.values.excellence", descKey: "about.values.excellenceDesc" },
  { icon: BookOpen, titleKey: "about.values.education", descKey: "about.values.educationDesc" },
];

const timeline = [
  { year: "2026", event: "Owl I Health and Wellness Center founded in Tirunelveli" },
  { year: "2026", event: "First batch of naturopathy treatments launched" },
  { year: "2026", event: "Expanded team with specialized BNYS doctors" },
  { year: "2026", event: "Launched online appointment booking and patient portal" },
];

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("about.pageTitle")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t("about.story.content").substring(0, 120)}...
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                {t("about.story.heading")}
              </h2>
              <p className="text-light-text leading-relaxed mb-4">
                {t("about.story.content")}
              </p>
              <p className="text-light-text leading-relaxed">
                Our team of qualified BNYS (Bachelor of Naturopathy and Yogic Sciences) doctors
                combines traditional naturopathy wisdom with evidence-based practices to deliver
                treatments that are safe, effective, and personalized for each patient. We offer
                a full spectrum of natural therapies including hydrotherapy, mud therapy, yoga therapy,
                diet counseling, massage therapy, acupuncture, and specialized wellness programs.
              </p>
            </div>
            <div className="space-y-4">
              {/* [PLACEHOLDER: Replace with clinic interior/exterior photos — a grid of 2x2 images] */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-light-green/30 rounded-xl h-48 flex items-center justify-center">
                  <span className="text-light-text text-sm">Clinic Exterior</span>
                </div>
                <div className="bg-light-green/20 rounded-xl h-48 flex items-center justify-center">
                  <span className="text-light-text text-sm">Reception Area</span>
                </div>
                <div className="bg-light-green/20 rounded-xl h-48 flex items-center justify-center">
                  <span className="text-light-text text-sm">Treatment Room</span>
                </div>
                <div className="bg-light-green/30 rounded-xl h-48 flex items-center justify-center">
                  <span className="text-light-text text-sm">Yoga Hall</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="section-padding bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                <Eye className="h-7 w-7 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("about.vision.heading")}
              </h2>
              <p className="text-light-text leading-relaxed">
                {t("about.vision.content")}
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4">
                <Target className="h-7 w-7 text-secondary" aria-hidden="true" />
              </div>
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("about.mission.heading")}
              </h2>
              <p className="text-light-text leading-relaxed">
                {t("about.mission.content")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            {t("about.values.heading")}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-light-green/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-7 w-7 text-primary" aria-hidden="true" />
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

      {/* Timeline */}
      <section className="section-padding bg-light-green/20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-primary text-center mb-12">
            Our Journey
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Calendar className="h-5 w-5 text-white" aria-hidden="true" />
                  </div>
                  {index < timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-primary/20 mt-2" />
                  )}
                </div>
                <div className="pb-8">
                  <span className="text-sm font-bold text-secondary">{item.year}</span>
                  <p className="text-dark-text mt-1">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl font-bold mb-2">15+</div>
              <div className="text-white/70">Treatments Offered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">3+</div>
              <div className="text-white/70">BNYS Doctors</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-white/70">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-white/70">Natural Healing</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
