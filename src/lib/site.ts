export const SITE = {
  name: "Silver Circle Travel",
  tagline: "Travel Freely. We Take Care of the Rest.",
  phone: "+919999718183",
  phoneDisplay: "+91 99997 18183",
  whatsapp: "919999718183",
  email: "care@silvercircletravel.com",
  address:
    "Spaze I-Tech Park, Ninth Floor, Tower B-1, 958-960, Badshahpur Sohna Rd, Sector 49, Gurugram, Haryana 122018",
};

export function whatsappUrl(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_ENQUIRY =
  "Hello Silver Circle Travel, I would like to know more about your curated journeys for travellers 60+.";

export function openWhatsApp(message: string = DEFAULT_ENQUIRY) {
  if (typeof window !== "undefined") {
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }
}
