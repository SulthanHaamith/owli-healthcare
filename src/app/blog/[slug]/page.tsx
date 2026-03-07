"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface BlogPost {
  id: string;
  title: string;
  titleTamil: string;
  slug: string;
  excerpt: string;
  excerptTamil: string;
  content: string;
  contentTamil: string;
  category: string;
  coverImage: string | null;
  publishedAt: string;
}

export default function BlogPostPage() {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const params = useParams();
  const { locale, t } = useI18n();

  useEffect(() => {
    if (!params.slug) return;
    fetch(`/api/blog?slug=${params.slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Not found");
        return res.json();
      })
      .then((data) => setPost(data))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [params.slug]);

  if (loading) {
    return (
      <div className="section-padding text-center text-light-text">
        {t("common.loading")}
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="section-padding text-center">
        <h1 className="text-2xl font-bold text-dark-text mb-4">
          Post not found
        </h1>
        <Link
          href="/blog"
          className="text-secondary hover:underline inline-flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>
    );
  }

  const title = locale === "ta" ? post.titleTamil : post.title;
  const content = locale === "ta" ? post.contentTamil : post.content;
  const date = new Date(post.publishedAt).toLocaleDateString(
    locale === "ta" ? "ta-IN" : "en-IN",
    { year: "numeric", month: "long", day: "numeric" }
  );

  // Simple markdown-like rendering for ## headings and paragraphs
  const renderContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      const trimmed = line.trim();
      if (!trimmed) return <br key={i} />;
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={i} className="text-xl font-semibold text-dark-text mt-6 mb-3">
            {trimmed.replace("### ", "")}
          </h3>
        );
      }
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={i} className="text-2xl font-bold text-primary mt-8 mb-4">
            {trimmed.replace("## ", "")}
          </h2>
        );
      }
      if (trimmed.startsWith("- ")) {
        return (
          <li key={i} className="text-light-text ml-4 list-disc">
            {trimmed.replace("- ", "")}
          </li>
        );
      }
      return (
        <p key={i} className="text-light-text leading-relaxed mb-3">
          {trimmed}
        </p>
      );
    });
  };

  return (
    <>
      {/* Header */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-4xl mx-auto text-white">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium mb-4">
            {t(`blog.categories.${post.category}`)}
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" aria-hidden="true" />
              5 {t("blog.readTime")}
            </span>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto -mt-8 px-4">
          <img
            src={post.coverImage}
            alt={title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
          />
        </div>
      )}

      {/* Content */}
      <article className="section-padding">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-6 md:p-10 shadow-sm">
          {renderContent(content)}
        </div>
      </article>

      {/* CTA */}
      <section className="bg-light-green/20 py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Interested in this treatment?
          </h2>
          <p className="text-light-text mb-6">
            Book a consultation with our naturopathy experts to learn more.
          </p>
          <Link href="/book" className="btn-primary">
            {t("common.bookAppointment")}
          </Link>
        </div>
      </section>
    </>
  );
}
