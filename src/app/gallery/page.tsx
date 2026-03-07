"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useI18n } from "@/lib/i18n";

// [PLACEHOLDER: Replace all placeholder gallery items with actual photos]
const galleryItems = [
  { id: 1, category: "clinic", title: "Clinic Exterior", alt: "Front view of Owl I Health and Wellness Center" },
  { id: 2, category: "clinic", title: "Reception Area", alt: "Welcoming reception area of the clinic" },
  { id: 3, category: "clinic", title: "Waiting Lounge", alt: "Comfortable waiting area for patients" },
  { id: 4, category: "therapy", title: "Hydrotherapy Room", alt: "Hydrotherapy treatment room with equipment" },
  { id: 5, category: "therapy", title: "Yoga Hall", alt: "Spacious yoga therapy hall" },
  { id: 6, category: "therapy", title: "Massage Room", alt: "Massage therapy room with essential oils" },
  { id: 7, category: "treatments", title: "Mud Therapy Session", alt: "Patient receiving mud therapy treatment" },
  { id: 8, category: "treatments", title: "Yoga Therapy Class", alt: "Group yoga therapy session in progress" },
  { id: 9, category: "treatments", title: "Diet Consultation", alt: "Doctor conducting diet therapy consultation" },
  { id: 10, category: "treatments", title: "Acupuncture Session", alt: "Acupuncture treatment being administered" },
  { id: 11, category: "events", title: "Wellness Workshop", alt: "Community wellness workshop event" },
  { id: 12, category: "events", title: "Health Camp", alt: "Free health screening camp organized by the clinic" },
];

const categories = ["all", "clinic", "therapy", "treatments", "events"];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxItem, setLightboxItem] = useState<typeof galleryItems[0] | null>(null);
  const { t } = useI18n();

  const filtered =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("gallery.pageTitle")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t("gallery.pageDescription")}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-primary text-white"
                    : "bg-white text-dark-text hover:bg-gray-100"
                }`}
              >
                {t(`gallery.categories.${cat}`)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((item) => (
              <button
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="relative group aspect-square bg-light-green/20 rounded-xl overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-primary"
                aria-label={`View ${item.title}`}
              >
                {/* [PLACEHOLDER: Replace with <img> or next/image when real photos are added] */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-light-green/30 to-light-green/10">
                  <span className="text-sm text-light-text text-center px-2">
                    {item.title}
                  </span>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors flex items-center justify-center">
                  <span className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxItem && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setLightboxItem(null)}
          role="dialog"
          aria-label={lightboxItem.title}
        >
          <button
            onClick={() => setLightboxItem(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close lightbox"
          >
            <X className="h-8 w-8" />
          </button>
          <div
            className="max-w-4xl w-full bg-white rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* [PLACEHOLDER: Replace with actual image] */}
            <div className="aspect-video bg-light-green/20 flex items-center justify-center">
              <span className="text-light-text text-lg">{lightboxItem.title}</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-dark-text">
                {lightboxItem.title}
              </h3>
              <p className="text-sm text-light-text">{lightboxItem.alt}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
