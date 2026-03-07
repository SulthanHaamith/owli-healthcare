export const CLINIC = {
  name: "Owl I Health and Wellness Center",
  address:
    "1/120G1, Vishalachi Nagar, Kondanagaram, Suthamalli, Tirunelveli - 627604",
  phone: "+91 6379610554",
  whatsapp: "+91 6379610554",
  whatsappNumber: "916379610554",
  email: "owli2026@gmail.com",
  hours: "Monday - Saturday, 9:00 AM - 9:00 PM",
  sundayHours: "Sunday: Closed (or by appointment)",
  domain: "owlihealthcare.com",
  upiId: process.env.UPI_ID || "owlihealth@ybl",
  upiMerchantName: process.env.UPI_MERCHANT_NAME || "Owl I Healthcare",
} as const;

export const TIME_SLOTS = [
  "9AM-12PM",
  "12PM-3PM",
  "3PM-6PM",
  "6PM-9PM",
] as const;

export const SERVICE_CATEGORIES = {
  core: "Core Treatments",
  specialized: "Specialized Programs",
} as const;

export const PDF_CATEGORIES = {
  public: ["diet", "yoga", "exercise", "lifestyle"] as const,
  patient: ["diet-chart", "yoga-chart", "prescription", "report"] as const,
};

export const BLOG_CATEGORIES = [
  "treatments",
  "wellness",
  "nutrition",
  "yoga",
] as const;

export const MAX_FILE_SIZE = parseInt(
  process.env.MAX_FILE_SIZE || "10485760",
  10
);

export const UPLOAD_DIR = process.env.UPLOAD_DIR || "./uploads";
