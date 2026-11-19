import { API_VERSION } from "./constants";

describe("API_VERSION", () => {
  it("sends the current stable Gusto API version", () => {
    expect(API_VERSION).toBe("2026-06-15");
  });
});
