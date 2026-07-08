import { describe, it, expect } from "vitest";
import {
  locations,
  barbers,
  services,
  getLocation,
  barbersForLocation,
} from "./site";

describe("locations", () => {
  it("have unique slugs", () => {
    const slugs = locations.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("has exactly one open flagship", () => {
    expect(locations.filter((l) => l.status === "open").length).toBe(1);
  });
  it("resolves by slug", () => {
    expect(getLocation("zdravets-iztok")?.name).toBe("Здравец Изток");
  });
});

describe("barbers", () => {
  it("reference an existing location", () => {
    for (const b of barbers) {
      expect(getLocation(b.locationSlug)).toBeDefined();
    }
  });
  it("all belong to the flagship in this dataset", () => {
    expect(barbersForLocation("zdravets-iztok").length).toBe(barbers.length);
  });
});

describe("services", () => {
  it("have positive price and duration", () => {
    for (const s of services) {
      expect(s.price).toBeGreaterThan(0);
      expect(s.durationMin).toBeGreaterThan(0);
    }
  });
});
