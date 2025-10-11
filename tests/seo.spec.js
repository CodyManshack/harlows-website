import { describe, it, expect } from "vitest";
import { buildRestaurantJsonLd, buildMenuJsonLd } from "src/utils/seo.js";

describe("SEO JSON-LD builders", () => {
  it("buildRestaurantJsonLd returns basic structure", () => {
    const json = buildRestaurantJsonLd({
      locale: "es",
      origin: "https://example.com",
    });
    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("Restaurant");
    expect(json.name).toBe("Harlow's Bar");
    expect(json.url).toBe("https://example.com/es");
    expect(Array.isArray(json.openingHoursSpecification)).toBe(true);
  });

  it("buildMenuJsonLd includes sections and menu items", () => {
    const json = buildMenuJsonLd({ locale: "en", currency: "EUR" });
    expect(json["@context"]).toBe("https://schema.org");
    expect(json["@type"]).toBe("Menu");
    expect(Array.isArray(json.hasMenuSection)).toBe(true);
    // find a section with items or subsections
    const hasAnyContent = json.hasMenuSection.some(
      (sec) =>
        (Array.isArray(sec.hasMenuItem) && sec.hasMenuItem.length > 0) ||
        (Array.isArray(sec.hasMenuSection) && sec.hasMenuSection.length > 0)
    );
    expect(hasAnyContent).toBe(true);
  });

  it("buildMenuJsonLd localizes names when objects are provided", () => {
    const jsonEs = buildMenuJsonLd({ locale: "es" });
    // find an item known to have {en, es}
    const allItems = [];
    for (const sec of jsonEs.hasMenuSection) {
      if (sec.hasMenuItem) allItems.push(...sec.hasMenuItem);
      if (sec.hasMenuSection) {
        for (const sub of sec.hasMenuSection) {
          if (sub.hasMenuItem) allItems.push(...sub.hasMenuItem);
        }
      }
    }
    const hasSpanish = allItems.some(
      (it) =>
        typeof it.name === "string" &&
        /á|é|í|ó|ú|ñ|cócteles|Carta|Harlow/.test(it.name)
    );
    expect(hasSpanish).toBe(true);
  });
});
