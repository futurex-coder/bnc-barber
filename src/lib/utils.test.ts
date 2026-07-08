import { describe, it, expect } from "vitest";
import { cn, formatPrice, formatDuration, formatEventDate } from "./utils";

describe("cn", () => {
  it("joins truthy classes and drops falsy ones", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });
});

describe("formatPrice", () => {
  it("appends лв.", () => {
    expect(formatPrice(35)).toBe("35 лв.");
  });
});

describe("formatDuration", () => {
  it("appends мин", () => {
    expect(formatDuration(45)).toBe("45 мин");
  });
});

describe("formatEventDate", () => {
  it("formats an ISO date to Bulgarian day/month", () => {
    expect(formatEventDate("2026-07-19")).toEqual({ day: "19", month: "юли" });
  });
  it("handles January", () => {
    expect(formatEventDate("2026-01-05")).toEqual({ day: "5", month: "яну" });
  });
});
