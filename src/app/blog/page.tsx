"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface BlogPost {
  id: string;
  title: string;
  titleTamil: string;
  slug: string;
  excerpt: string;
  excerptTamil: string;
  category: string;
  coverImage: string | null;
  publishedAt: string;
}

const categories = ["all", "treatments", "wellness", "nutrition", "yoga"];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const { locale, t } = useI18n();

  useEffect(() => {
    setLoading(true);
    fetch(`/api/blog?category=${activeCategory}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setPosts(data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [activeCategory]);

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("blog.pageTitle")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t("blog.pageDescription")}
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
                {t(`blog.categories.${cat}`)}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center text-light-text py-12">
              {t("common.loading")}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center text-light-text py-12">
              No blog posts found.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const title = locale === "ta" ? post.titleTamil : post.title;
                const excerpt = locale === "ta" ? post.excerptTamil : post.excerpt;
                const date = new Date(post.publishedAt).toLocaleDateString(
                  locale === "ta" ? "ta-IN" : "en-IN",
                  { year: "numeric", month: "long", day: "numeric" }
                );

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                  >
                    <div className="h-48 bg-light-green/20 flex items-center justify-center overflow-hidden">
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt={title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        /* [PLACEHOLDER: Replace with actual blog cover images] */
                        <span className="text-light-text">Blog Image</span>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-medium text-secondary uppercase">
                        {t(`blog.categories.${post.category}`)}
                      </span>
                      <h2 className="text-lg font-semibold text-dark-text mt-1 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {title}
                      </h2>
                      <p className="text-sm text-light-text line-clamp-3 mb-3">
                        {excerpt}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-light-text">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" aria-hidden="true" />
                          {date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" aria-hidden="true" />
                          5 {t("blog.readTime")}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
