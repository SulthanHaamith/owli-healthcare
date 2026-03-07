"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User, GraduationCap, Briefcase } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Doctor {
  id: string;
  qualification: string;
  specialization: string;
  experience: string;
  bio: string | null;
  photoUrl: string | null;
  user: {
    name: string;
    email: string;
  };
}

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const { t } = useI18n();

  useEffect(() => {
    fetch("/api/doctors")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setDoctors(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("doctors.pageTitle")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t("doctors.pageDescription")}
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center text-light-text py-12">
              {t("common.loading")}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  className="bg-cream rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* [PLACEHOLDER: Replace with actual doctor photo] */}
                  <div className="h-64 bg-light-green/30 flex items-center justify-center">
                    {doctor.photoUrl ? (
                      <img
                        src={doctor.photoUrl}
                        alt={doctor.user.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-20 w-20 text-light-text/50" aria-hidden="true" />
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-dark-text mb-1">
                      {/* [PLACEHOLDER: Replace with real doctor name] */}
                      {doctor.user.name}
                    </h2>
                    <p className="text-secondary font-medium text-sm mb-4">
                      {doctor.specialization}
                    </p>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <GraduationCap
                          className="h-4 w-4 text-primary mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="text-xs text-light-text uppercase">
                            {t("doctors.qualification")}
                          </span>
                          <p className="text-sm text-dark-text">
                            {doctor.qualification}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Briefcase
                          className="h-4 w-4 text-primary mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <div>
                          <span className="text-xs text-light-text uppercase">
                            {t("doctors.experience")}
                          </span>
                          <p className="text-sm text-dark-text">
                            {doctor.experience}
                          </p>
                        </div>
                      </div>
                    </div>

                    {doctor.bio && (
                      <p className="text-sm text-light-text leading-relaxed">
                        {doctor.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to consult with our experts?
          </h2>
          <p className="text-white/80 mb-8">
            Book an appointment and let our experienced naturopathy doctors guide you on your wellness journey.
          </p>
          <Link href="/book" className="btn-primary !bg-secondary hover:!bg-secondary/90">
            {t("common.bookAppointment")}
          </Link>
        </div>
      </section>
    </>
  );
}
