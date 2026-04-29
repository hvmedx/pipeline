import { describe, test, expect, beforeEach, afterEach } from "vitest";
import { getApiBase, buildIncidentsUrl } from "./api";

describe("getApiBase", () => {
  const original = process.env.NEXT_PUBLIC_API_BASE_URL;

  beforeEach(() => {
    delete process.env.NEXT_PUBLIC_API_BASE_URL;
  });

  afterEach(() => {
    if (original === undefined) delete process.env.NEXT_PUBLIC_API_BASE_URL;
    else process.env.NEXT_PUBLIC_API_BASE_URL = original;
  });

  test("falls back to localhost:3001 when env unset", () => {
    expect(getApiBase()).toBe("http://localhost:3001");
  });

  test("uses env override when provided", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com";
    expect(getApiBase()).toBe("https://api.example.com");
  });

  test("strips trailing slashes from env override", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "https://api.example.com//";
    expect(getApiBase()).toBe("https://api.example.com");
  });

  test("ignores empty/whitespace env value", () => {
    process.env.NEXT_PUBLIC_API_BASE_URL = "   ";
    expect(getApiBase()).toBe("http://localhost:3001");
  });
});

describe("buildIncidentsUrl", () => {
  test("appends /incidents to base", () => {
    expect(buildIncidentsUrl("http://localhost:3001")).toBe(
      "http://localhost:3001/incidents",
    );
  });

  test("normalizes trailing slash", () => {
    expect(buildIncidentsUrl("http://localhost:3001/")).toBe(
      "http://localhost:3001/incidents",
    );
  });

  test("uses getApiBase when no arg", () => {
    expect(buildIncidentsUrl()).toMatch(/\/incidents$/);
  });
});
