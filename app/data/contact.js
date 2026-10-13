// TODO: date provizorii — înlocuiește cu datele reale ale firmei.
export const contact = {
  email: "contact@bytissevents.ro",
  phone: "+40 700 000 000",
  city: "București, România",
};

export const mailto = (subject) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(subject)}`;

export const tel = `tel:${contact.phone.replace(/\s/g, "")}`;

export const whatsapp = `https://wa.me/${contact.phone.replace(/\D/g, "")}`;
