import { describe, expect, test } from "vitest";

// Minimal smoke test to confirm Vitest is wired up and can run tests.
describe("vitest configuration", () => {
  test("the test runner is active", () => {
    expect(true).toBe(true);
  });
});
