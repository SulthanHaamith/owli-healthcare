import type { Metadata } from "next";
import { Poppins, Noto_Sans_Tamil } from "next/font/google";
import "./globals.css";
import SessionProvider from "@/components/providers/SessionProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import ClientProviders from "@/components/providers/ClientProviders";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const notoSansTamil = Noto_Sans_Tamil({
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-tamil",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Owl I Health and Wellness Center | Naturopathy Clinic Tirunelveli",
    template: "%s | Owl I Health and Wellness Center",
  },
  description:
    "Owl I Health and Wellness Center is a naturopathy clinic in Tirunelveli, Tamil Nadu offering drug-free holistic treatments including hydrotherapy, yoga therapy, mud therapy, diet therapy, and more.",
  keywords: [
    "naturopathy",
    "naturopathy clinic tirunelveli",
    "wellness center",
    "holistic healing",
    "natural treatment",
    "yoga therapy",
    "hydrotherapy",
    "mud therapy",
    "diet therapy",
    "BNYS doctor",
    "tirunelveli healthcare",
  ],
  authors: [{ name: "Owl I Health and Wellness Center" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://owlihealthcare.com",
    siteName: "Owl I Health and Wellness Center",
    title: "Owl I Health and Wellness Center | Naturopathy Clinic Tirunelveli",
    description:
      "Experience the power of naturopathy at Tirunelveli's trusted health and wellness center. Drug-free, holistic healing for your body, mind, and soul.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Owl I Health and Wellness Center",
    description:
      "Naturopathy clinic in Tirunelveli offering holistic, drug-free treatments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} ${notoSansTamil.variable}`}>
      <body className="font-poppins antialiased">
        <SessionProvider>
          <ClientProviders>
            <Header />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
            <WhatsAppButton />
          </ClientProviders>
        </SessionProvider>
      </body>
    </html>
  );
}
