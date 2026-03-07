"use client";

import { useState, useEffect } from "react";
import {
  FileText,
  Download,
  UtensilsCrossed,
  Activity,
  Dumbbell,
  Heart,
  type LucideIcon,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface PublicPdf {
  id: string;
  title: string;
  titleTamil: string;
  category: string;
  description: string | null;
  fileName: string;
  fileSize: number;
  downloads: number;
}

const categoryIcons: Record<string, LucideIcon> = {
  diet: UtensilsCrossed,
  yoga: Activity,
  exercise: Dumbbell,
  lifestyle: Heart,
};

const filterCategories = ["all", "diet", "yoga", "exercise", "lifestyle"];

export default function ResourcesPage() {
  const [pdfs, setPdfs] = useState<PublicPdf[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const { locale, t } = useI18n();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/resources?category=${activeFilter}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPdfs(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeFilter]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "PDF";
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("resources.pageTitle")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t("resources.pageDescription")}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {filterCategories.map((cat) => {
              const labelKey =
                cat === "all"
                  ? "resources.filterAll"
                  : `resources.filter${cat.charAt(0).toUpperCase() + cat.slice(1)}`;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === cat
                      ? "bg-primary text-white"
                      : "bg-white text-dark-text hover:bg-gray-100"
                  }`}
                >
                  {t(labelKey)}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="text-center text-light-text py-12">
              {t("common.loading")}
            </div>
          ) : pdfs.length === 0 ? (
            <div className="text-center text-light-text py-12">
              No resources available yet. Check back soon!
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {pdfs.map((pdf) => {
                const Icon = categoryIcons[pdf.category] || FileText;
                const title = locale === "ta" ? pdf.titleTamil : pdf.title;

                return (
                  <div
                    key={pdf.id}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-light-green/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-dark-text mb-1 truncate">
                          {title}
                        </h3>
                        <span className="inline-block px-2 py-0.5 bg-light-green/20 text-primary text-xs font-medium rounded-full capitalize mb-2">
                          {pdf.category}
                        </span>
                      </div>
                    </div>

                    {pdf.description && (
                      <p className="text-sm text-light-text mt-3 line-clamp-2">
                        {pdf.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3 text-xs text-light-text">
                        <span>{formatFileSize(pdf.fileSize)}</span>
                        <span>
                          {pdf.downloads} {t("resources.downloads")}
                        </span>
                      </div>
                      <button
                        className="flex items-center gap-1 text-sm font-medium text-secondary hover:underline"
                        onClick={() => {
                          // Download will be handled by the PDF download API route
                          window.open(`/api/pdfs/public/${pdf.id}/download`, "_blank");
                        }}
                      >
                        <Download className="h-4 w-4" aria-hidden="true" />
                        {t("common.download")}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
