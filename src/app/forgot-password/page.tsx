"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { Leaf, ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { t } = useI18n();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email) {
      setError(t("auth.emailRequired"));
      return;
    }

    setLoading(true);
    try {
      // Password reset endpoint will be implemented in a later phase
      // For now, show success message regardless (security best practice)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSent(true);
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="h-8 w-8 text-primary" aria-hidden="true" />
            <span className="text-2xl font-bold text-primary">Owl I</span>
          </div>

          <h1 className="text-2xl font-bold text-center text-dark-text mb-2">
            {t("auth.forgotTitle")}
          </h1>
          <p className="text-center text-light-text mb-6">
            {t("auth.forgotSubtitle")}
          </p>

          {sent ? (
            <div className="text-center">
              <div className="mb-4 p-4 bg-success/10 text-success text-sm rounded-lg">
                {t("auth.resetSent")}
              </div>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-secondary font-medium hover:underline"
              >
                <ArrowLeft className="h-4 w-4" />
                {t("common.loginHere")}
              </Link>
            </div>
          ) : (
            <>
              {error && (
                <div
                  className="mb-4 p-3 bg-error/10 text-error text-sm rounded-lg"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-dark-text mb-1"
                  >
                    {t("auth.emailLabel")}
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? t("common.loading") : t("auth.resetButton")}
                </button>
              </form>

              <p className="text-center text-sm text-light-text mt-6">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1 text-secondary font-medium hover:underline"
                >
                  <ArrowLeft className="h-4 w-4" />
                  {t("common.loginHere")}
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
