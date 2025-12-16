import { describe, it, expect } from "vitest";

describe("Example test suite", () => {
  it("should pass a basic test", () => {
    expect(1 + 1).toBe(2);
  });

  it("should work with strings", () => {
    expect("hello").toContain("ell");
  });

  it("should work with arrays", () => {
    const items = [1, 2, 3];
    expect(items).toHaveLength(3);
    expect(items).toContain(2);
  });
});
