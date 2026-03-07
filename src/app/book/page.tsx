"use client";

import { Suspense } from "react";
import BookingForm from "@/components/booking/BookingForm";
import { useI18n } from "@/lib/i18n";

export default function BookPage() {
  const { t } = useI18n();

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("booking.pageTitle")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            Choose a service, pick a time, and we&apos;ll take care of the rest.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-3xl mx-auto">
          <Suspense
            fallback={
              <div className="text-center text-light-text py-12">
                {t("common.loading")}
              </div>
            }
          >
            <BookingForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}
