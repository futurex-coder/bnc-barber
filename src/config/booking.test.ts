import { describe, it, expect } from "vitest";
import {
  freshaForLocation,
  freshaForBarber,
  DEFAULT_FRESHA,
  fresha,
} from "./booking";

describe("freshaForLocation", () => {
  it("returns the flagship URL for its slug", () => {
    expect(freshaForLocation("zdravets-iztok")).toBe(fresha["zdravets-iztok"]);
  });
  it("falls back to the flagship for an unknown slug", () => {
    expect(freshaForLocation("does-not-exist")).toBe(DEFAULT_FRESHA);
  });
});

describe("freshaForBarber", () => {
  it("falls back to the barber's location URL when no personal link", () => {
    expect(freshaForBarber("alex", "zdravets-iztok")).toBe(
      fresha["zdravets-iztok"],
    );
  });
  it("falls back to the flagship when nothing is provided", () => {
    expect(freshaForBarber("unknown")).toBe(DEFAULT_FRESHA);
  });
});
