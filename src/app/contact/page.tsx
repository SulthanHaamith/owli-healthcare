"use client";

import { useState, FormEvent } from "react";
import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CLINIC } from "@/lib/constants";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { t } = useI18n();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!name || !email || !message) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("common.error"));
      } else {
        setSuccess(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  }

  const whatsappUrl = `https://wa.me/${CLINIC.whatsappNumber}?text=${encodeURIComponent(
    "Hi! I'd like to enquire about your services."
  )}`;

  return (
    <>
      {/* Page Header */}
      <section className="bg-primary py-16 px-4">
        <div className="max-w-7xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t("contact.pageTitle")}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {t("contact.pageDescription")}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t("contact.formTitle")}
              </h2>

              {success ? (
                <div className="bg-success/10 text-success p-6 rounded-xl text-center">
                  <Send className="h-12 w-12 mx-auto mb-3 text-success" aria-hidden="true" />
                  <p className="font-medium text-lg">{t("contact.messageSent")}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {error && (
                    <div className="p-3 bg-error/10 text-error text-sm rounded-lg" role="alert">
                      {error}
                    </div>
                  )}

                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-dark-text mb-1">
                      {t("contact.yourName")} *
                    </label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-dark-text mb-1">
                      {t("contact.yourEmail")} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-dark-text mb-1">
                      {t("contact.yourPhone")}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-dark-text mb-1">
                      {t("contact.yourMessage")} *
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? t("common.loading") : t("contact.sendMessage")}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6">
                {t("contact.getInTouch")}
              </h2>

              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text mb-1">{t("common.address")}</h3>
                    <p className="text-light-text text-sm">{CLINIC.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text mb-1">{t("common.phone")}</h3>
                    <a href={`tel:${CLINIC.phone}`} className="text-secondary hover:underline text-sm">
                      {CLINIC.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text mb-1">{t("common.whatsapp")}</h3>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:underline text-sm"
                    >
                      {CLINIC.whatsapp}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text mb-1">{t("common.email")}</h3>
                    <a href={`mailto:${CLINIC.email}`} className="text-secondary hover:underline text-sm">
                      {CLINIC.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark-text mb-1">{t("common.workingHours")}</h3>
                    <p className="text-light-text text-sm">{CLINIC.hours}</p>
                    <p className="text-light-text text-sm">{CLINIC.sundayHours}</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <h2 className="text-2xl font-bold text-primary mb-4">
                {t("contact.findUs")}
              </h2>
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
        </div>
      </section>
    </>
  );
}
