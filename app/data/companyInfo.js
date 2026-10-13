// Datele firmei folosite în metadata (titlu, descriere, link preview).
// TODO: `url` e adresa temporară de pe Vercel — schimb-o când site-ul se mută
// pe domeniul final, altfel linkurile din previzualizări (og:url, og:image)
// vor trimite la adresa veche.
export const companyInfo = {
  name: "bytissevents",
  tagline: "Oameni potriviți pentru campanii memorabile",
  description:
    "Agenție de outsourcing pentru evenimente și campanii: hostess, promoteri, sampling, brand ambassadors. Aplică pentru un job de câteva zile sau cere-ne echipa pentru proiectul tău.",
  url: "https://bytissevents.vercel.app",
  locale: "ro_RO",
  keywords: [
    "hostess",
    "promoteri",
    "brand ambassadors",
    "sampling",
    "personal pentru evenimente",
    "agenție de promovare",
    "outsourcing evenimente",
  ],
  // Imaginea pentru link preview: fișierul app/opengraph-image.png.
  ogImage: "/opengraph-image.png",
  ogImageAlt: "bytissevents — Oameni potriviți pentru campanii memorabile",
};
