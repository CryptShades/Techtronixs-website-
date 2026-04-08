import { describe, it, expect } from "vitest";
import products from "@/data/products.json";
import services from "@/data/services.json";
import testimonials from "@/data/testimonials.json";
import caseStudies from "@/data/case-studies.json";
import insights from "@/data/insights.json";
import faqs from "@/data/faqs.json";
import partners from "@/data/partners.json";
import features from "@/data/features.json";
import siteConfig from "@/data/site.config.json";

/* ── products.json ────────────────────────────────────── */
describe("products.json", () => {
  it("has at least one product", () => {
    expect(products.length).toBeGreaterThan(0);
  });

  it("every product has required fields", () => {
    for (const p of products) {
      expect(p).toHaveProperty("id");
      expect(p).toHaveProperty("title");
      expect(p).toHaveProperty("brand");
      expect(p).toHaveProperty("description");
      expect(p).toHaveProperty("image");
      expect(p).toHaveProperty("tags");
      expect(p).toHaveProperty("category");
      expect(Array.isArray(p.tags)).toBe(true);
    }
  });

  it("product ids are unique", () => {
    const ids = products.map(p => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

/* ── services.json ────────────────────────────────────── */
describe("services.json", () => {
  it("has at least one service", () => {
    expect(services.length).toBeGreaterThan(0);
  });

  it("every service has required fields", () => {
    for (const s of services) {
      expect(s).toHaveProperty("id");
      expect(s).toHaveProperty("title");
      expect(s).toHaveProperty("description");
      expect(s).toHaveProperty("icon");
      expect(s).toHaveProperty("features");
      expect(s).toHaveProperty("process");
      expect(Array.isArray(s.features)).toBe(true);
      expect(Array.isArray(s.process)).toBe(true);
      expect(s.features.length).toBeGreaterThan(0);
      expect(s.process.length).toBeGreaterThan(0);
    }
  });
});

/* ── testimonials.json ────────────────────────────────── */
describe("testimonials.json", () => {
  it("has exactly 3 testimonials", () => {
    expect(testimonials.length).toBe(3);
  });

  it("every testimonial has required fields", () => {
    for (const t of testimonials) {
      expect(t).toHaveProperty("name");
      expect(t).toHaveProperty("role");
      expect(t).toHaveProperty("company");
      expect(t).toHaveProperty("quote");
      expect(t).toHaveProperty("metric");
      expect(t.stars).toBeGreaterThanOrEqual(1);
      expect(t.stars).toBeLessThanOrEqual(5);
    }
  });
});

/* ── case-studies.json ────────────────────────────────── */
describe("case-studies.json", () => {
  it("has at least one case study", () => {
    expect(caseStudies.length).toBeGreaterThan(0);
  });

  it("every case study has required fields", () => {
    for (const c of caseStudies) {
      expect(c).toHaveProperty("client");
      expect(c).toHaveProperty("industry");
      expect(c).toHaveProperty("result");
      expect(c).toHaveProperty("detail");
      expect(c).toHaveProperty("color");
    }
  });
});

/* ── insights.json ────────────────────────────────────── */
describe("insights.json", () => {
  it("every insight has a unique slug", () => {
    const slugs = insights.map(i => i.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every insight has required fields", () => {
    for (const i of insights) {
      expect(i).toHaveProperty("slug");
      expect(i).toHaveProperty("tag");
      expect(i).toHaveProperty("title");
      expect(i).toHaveProperty("read");
      expect(i).toHaveProperty("excerpt");
      expect(i).toHaveProperty("publishedAt");
    }
  });
});

/* ── faqs.json ────────────────────────────────────────── */
describe("faqs.json", () => {
  const pages = ["home", "services", "about", "contact"] as const;

  it("has FAQ entries for all required pages", () => {
    for (const page of pages) {
      expect(faqs[page]).toBeDefined();
      expect(Array.isArray(faqs[page])).toBe(true);
      expect(faqs[page].length).toBeGreaterThan(0);
    }
  });

  it("every FAQ entry has q and a fields", () => {
    for (const page of pages) {
      for (const faq of faqs[page]) {
        expect(faq).toHaveProperty("q");
        expect(faq).toHaveProperty("a");
        expect(faq.q.length).toBeGreaterThan(0);
        expect(faq.a.length).toBeGreaterThan(0);
      }
    }
  });
});

/* ── partners.json ────────────────────────────────────── */
describe("partners.json", () => {
  it("has at least one partner", () => {
    expect(partners.length).toBeGreaterThan(0);
  });

  it("every partner has name and style", () => {
    for (const p of partners) {
      expect(p).toHaveProperty("name");
      expect(p).toHaveProperty("style");
    }
  });
});

/* ── features.json ────────────────────────────────────── */
describe("features.json", () => {
  it("has 5 features", () => {
    expect(features.length).toBe(5);
  });

  it("every feature has icon, title, desc", () => {
    for (const f of features) {
      expect(f).toHaveProperty("icon");
      expect(f).toHaveProperty("title");
      expect(f).toHaveProperty("desc");
    }
  });
});

/* ── site.config.json ─────────────────────────────────── */
describe("site.config.json", () => {
  it("has required top-level fields", () => {
    expect(siteConfig).toHaveProperty("brand");
    expect(siteConfig).toHaveProperty("baseUrl");
    expect(siteConfig).toHaveProperty("twitter");
    expect(siteConfig).toHaveProperty("email");
    expect(siteConfig).toHaveProperty("phones");
    expect(siteConfig).toHaveProperty("address");
  });

  it("baseUrl is a valid HTTPS URL", () => {
    expect(siteConfig.baseUrl).toMatch(/^https:\/\//);
  });

  it("has at least one phone number", () => {
    expect(siteConfig.phones.length).toBeGreaterThan(0);
  });

  it("address has required fields", () => {
    expect(siteConfig.address).toHaveProperty("city");
    expect(siteConfig.address).toHaveProperty("country");
    expect(siteConfig.address).toHaveProperty("postalCode");
  });
});
