import { describe, expect, it } from "vitest";
import { bufferToDataUri } from "./images";

describe("bufferToDataUri", () => {
  it("converts a buffer to a data URI", () => {
    const buf = Buffer.from("hello");
    const result = bufferToDataUri(buf, "text/plain");
    expect(result).toBe("data:text/plain;base64,aGVsbG8=");
  });

  it("handles image/png mime type", () => {
    const buf = Buffer.from([0x89, 0x50, 0x4e, 0x47]);
    const result = bufferToDataUri(buf, "image/png");
    expect(result).toMatch(/^data:image\/png;base64,/);
  });
});
