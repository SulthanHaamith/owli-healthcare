"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  User,
  Stethoscope,
  MessageCircle,
} from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface Service {
  id: string;
  name: string;
  nameTamil: string;
  duration: string;
  price: number | null;
  category: string;
}

const steps = ["step1", "step2", "step3", "step4"] as const;

const timeSlots = [
  { value: "9AM-12PM", labelKey: "booking.morning" },
  { value: "12PM-3PM", labelKey: "booking.afternoon" },
  { value: "3PM-6PM", labelKey: "booking.evening1" },
  { value: "6PM-9PM", labelKey: "booking.evening2" },
];

export default function BookingForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");
  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const { locale, t } = useI18n();

  useEffect(() => {
    fetch("/api/services")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setServices(data);
          const preselected = searchParams.get("service");
          if (preselected) setSelectedService(preselected);
        }
      })
      .catch(console.error);
  }, [searchParams]);

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setEmail(session.user.email || "");
      setPhone((session.user as { phone?: string }).phone || "");
    }
  }, [session]);

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return !!selectedService;
      case 1:
        return !!selectedDate && !!selectedTime;
      case 2:
        return !!name && !!phone;
      default:
        return true;
    }
  };

  async function handleSubmit() {
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: selectedService,
          date: selectedDate,
          timeSlot: selectedTime,
          name,
          email,
          phone,
          notes,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("common.error"));
      } else {
        setSubmitted(true);
        if (data.whatsappUrl) {
          setWhatsappUrl(data.whatsappUrl);
        }
      }
    } catch {
      setError(t("common.error"));
    } finally {
      setLoading(false);
    }
  }

  const selectedServiceObj = services.find((s) => s.id === selectedService);
  const serviceName = selectedServiceObj
    ? locale === "ta"
      ? selectedServiceObj.nameTamil
      : selectedServiceObj.name
    : "";

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
        <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="h-8 w-8 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-dark-text mb-2">
          {t("common.success")}!
        </h2>
        <p className="text-light-text mb-6">{t("booking.bookingSuccess")}</p>
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 btn-primary !bg-[#25D366]"
          >
            <MessageCircle className="h-5 w-5" />
            Confirm via WhatsApp
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Step indicator */}
      <div className="flex border-b">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${
              index === currentStep
                ? "bg-primary text-white"
                : index < currentStep
                ? "bg-light-green/30 text-primary"
                : "text-light-text"
            }`}
          >
            <span className="hidden sm:inline">{t(`booking.${step}`)}</span>
            <span className="sm:hidden">{index + 1}</span>
          </div>
        ))}
      </div>

      <div className="p-6 md:p-8">
        {error && (
          <div className="mb-4 p-3 bg-error/10 text-error text-sm rounded-lg" role="alert">
            {error}
          </div>
        )}

        {/* Step 1: Select Service */}
        {currentStep === 0 && (
          <div>
            <h2 className="text-xl font-bold text-dark-text mb-4">
              {t("booking.selectService")}
            </h2>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {services.map((service) => {
                const sName = locale === "ta" ? service.nameTamil : service.name;
                return (
                  <label
                    key={service.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                      selectedService === service.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-100 hover:border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="service"
                      value={service.id}
                      checked={selectedService === service.id}
                      onChange={(e) => setSelectedService(e.target.value)}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                        selectedService === service.id
                          ? "border-primary"
                          : "border-gray-300"
                      }`}
                    >
                      {selectedService === service.id && (
                        <div className="w-3 h-3 rounded-full bg-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-dark-text">{sName}</div>
                      <div className="text-xs text-light-text">
                        {service.duration}
                        {service.price ? ` · ₹${service.price}` : ""}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Date & Time */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold text-dark-text mb-4">
              {t("booking.selectDate")}
            </h2>
            <div className="mb-6">
              <label
                htmlFor="date"
                className="block text-sm font-medium text-dark-text mb-1"
              >
                <Calendar className="h-4 w-4 inline mr-1" aria-hidden="true" />
                {t("booking.selectDate")}
              </label>
              <input
                id="date"
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={getMinDate()}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-dark-text mb-3">
                <Clock className="h-4 w-4 inline mr-1" aria-hidden="true" />
                {t("booking.selectTime")}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <label
                    key={slot.value}
                    className={`flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer text-sm font-medium transition-colors ${
                      selectedTime === slot.value
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-gray-100 hover:border-gray-200 text-dark-text"
                    }`}
                  >
                    <input
                      type="radio"
                      name="timeSlot"
                      value={slot.value}
                      checked={selectedTime === slot.value}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="sr-only"
                    />
                    {t(slot.labelKey)}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Patient Details */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-bold text-dark-text mb-4">
              {t("booking.step3")}
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="b-name" className="block text-sm font-medium text-dark-text mb-1">
                  {t("booking.yourName")} *
                </label>
                <input
                  id="b-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="b-phone" className="block text-sm font-medium text-dark-text mb-1">
                  {t("booking.yourPhone")} *
                </label>
                <input
                  id="b-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                  required
                />
              </div>
              <div>
                <label htmlFor="b-email" className="block text-sm font-medium text-dark-text mb-1">
                  {t("booking.yourEmail")}
                </label>
                <input
                  id="b-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
              </div>
              <div>
                <label htmlFor="b-notes" className="block text-sm font-medium text-dark-text mb-1">
                  {t("booking.message")}
                </label>
                <textarea
                  id="b-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-bold text-dark-text mb-4">
              {t("booking.step4")}
            </h2>
            <div className="bg-cream rounded-xl p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Stethoscope className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs text-light-text uppercase">Service</span>
                  <p className="font-medium text-dark-text">{serviceName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs text-light-text uppercase">Date</span>
                  <p className="font-medium text-dark-text">
                    {selectedDate &&
                      new Date(selectedDate).toLocaleDateString(
                        locale === "ta" ? "ta-IN" : "en-IN",
                        { weekday: "long", year: "numeric", month: "long", day: "numeric" }
                      )}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs text-light-text uppercase">Time Slot</span>
                  <p className="font-medium text-dark-text">{selectedTime}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-primary flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="text-xs text-light-text uppercase">Patient</span>
                  <p className="font-medium text-dark-text">{name}</p>
                  <p className="text-sm text-light-text">{phone} {email && `· ${email}`}</p>
                </div>
              </div>
              {notes && (
                <div className="pt-2 border-t border-gray-200">
                  <span className="text-xs text-light-text uppercase">Notes</span>
                  <p className="text-sm text-dark-text">{notes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          {currentStep > 0 ? (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="flex items-center gap-1 text-sm font-medium text-light-text hover:text-dark-text"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </button>
          ) : (
            <div />
          )}

          {currentStep < 3 ? (
            <button
              onClick={() => setCurrentStep(currentStep + 1)}
              disabled={!canProceed()}
              className="btn-primary text-sm !px-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
            >
              Next
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="btn-primary text-sm !px-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? t("common.loading") : t("booking.confirmBooking")}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
