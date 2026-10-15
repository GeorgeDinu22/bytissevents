import { Plus_Jakarta_Sans } from "next/font/google";
import WhatsAppButton from "./components/WhatsAppButton/WhatsAppButton";
import { companyInfo } from "./data/companyInfo";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
});

const title = `${companyInfo.name} — ${companyInfo.tagline}`;
const image = {
  url: companyInfo.ogImage,
  width: 1200,
  height: 630,
  alt: companyInfo.ogImageAlt,
};

export const metadata = {
  metadataBase: new URL(companyInfo.url),
  title: {
    default: title,
    template: `%s — ${companyInfo.name}`,
  },
  description: companyInfo.description,
  applicationName: companyInfo.name,
  keywords: companyInfo.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: companyInfo.name,
    locale: companyInfo.locale,
    url: "/",
    title,
    description: companyInfo.description,
    images: [image],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: companyInfo.description,
    images: [image],
  },
};

export default function RootLayout({ children }) {
  return (
    // `data-scroll-behavior` face ca Next să sară instant sus la schimbarea paginii,
    // chiar dacă pagina principală are scroll lin.
    <html
      lang="ro"
      className={jakarta.variable}
      data-scroll-behavior="smooth"
    >
      <body>
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
