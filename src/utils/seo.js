// Centralized SEO utilities: JSON-LD builders for Restaurant and Menu
import menuData from "src/assets/menu.js";
import { businessHoursByDay } from "src/components/businessHours.js";

export function absoluteUrl(path, originFallback = "https://harlows.bar") {
  const origin =
    typeof window !== "undefined" && window.location?.origin
      ? window.location.origin
      : originFallback;
  return `${origin}${path}`;
}

export function buildRestaurantJsonLd({ locale = "es", origin } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: "Harlow's Bar",
    url: absoluteUrl(`/${locale}`, origin),
    image: absoluteUrl("/icons/favicon-128x128.png", origin),
    priceRange: "€€",
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.4739458,
      longitude: -0.3842719,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Carrer de Lepant 4",
      addressLocality: "Valencia",
      addressRegion: "Valencia",
      postalCode: "46008",
      addressCountry: "ES",
    },
    telephone: "+34 692 940 844",
    servesCuisine: ["Cocktails", "Liquor", "Wine", "Beer", "Tapas"],
    openingHoursSpecification: Object.entries(businessHoursByDay)
      .filter(([_, hours]) => hours && hours.trim() !== "")
      .map(([day, hours]) => {
        const match = hours.match(/(\d{2}):(\d{2})\s*–\s*(\d{2}):(\d{2})/);
        const dayMap = {
          mon: "Monday",
          tue: "Tuesday",
          wed: "Wednesday",
          thu: "Thursday",
          fri: "Friday",
          sat: "Saturday",
          sun: "Sunday",
        };
        if (match) {
          const [, oh, om, ch, cm] = match;
          return {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: dayMap[day] || day,
            opens: `${oh}:${om}`,
            closes: `${ch}:${cm}`,
          };
        }
        return null;
      })
      .filter(Boolean),
    sameAs: [
      "https://www.instagram.com/harlows.bar",
      "https://maps.app.goo.gl/y8zXASHuxx2pLbyf9",
    ],
  };
}

export function buildMenuJsonLd({ locale = "es", currency = "EUR" } = {}) {
  const tr = (v) =>
    v && typeof v === "object"
      ? v[locale] ?? v.en ?? Object.values(v)[0] ?? ""
      : v ?? "";
  const sections = Object.entries(menuData).map(([key, section]) => {
    const items = section.items || [];
    const subsections = Object.entries(section)
      .filter(
        ([k, v]) =>
          v &&
          typeof v === "object" &&
          k !== "items" &&
          k !== "subtitle" &&
          k !== "label"
      )
      .map(([subKey, sub]) => ({ key: subKey, data: sub }));

    const hasMenuItem = items.map((it) => ({
      "@type": "MenuItem",
      name: tr(it.name),
      description: tr(it.description),
      offers: it.sizes
        ? Object.entries(it.sizes).map(([size, price]) => ({
            "@type": "Offer",
            price: price,
            priceCurrency: currency,
            description: size,
          }))
        : it.price
        ? { "@type": "Offer", price: it.price, priceCurrency: currency }
        : undefined,
    }));

    const subSections = subsections.map(({ key: subKey, data: sub }) => ({
      "@type": "MenuSection",
      name: tr(sub.label ?? sub.title ?? subKey),
      hasMenuItem: (sub.items || []).map((it) => ({
        "@type": "MenuItem",
        name: tr(it.name),
        description: tr(it.description),
        offers: it.sizes
          ? Object.entries(it.sizes).map(([size, price]) => ({
              "@type": "Offer",
              price: price,
              priceCurrency: currency,
              description: size,
            }))
          : it.price
          ? { "@type": "Offer", price: it.price, priceCurrency: currency }
          : undefined,
      })),
    }));

    return {
      "@type": "MenuSection",
      name: tr(section.label ?? key),
      hasMenuItem: hasMenuItem.length ? hasMenuItem : undefined,
      hasMenuSection: subSections.length ? subSections : undefined,
    };
  });

  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: tr({ en: "Harlow's Menu", es: "Carta de Harlow's" }),
    hasMenuSection: sections,
  };
}
