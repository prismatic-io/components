import { createHmac } from "node:crypto";
import { describe, expect, test } from "vitest";
import { validateHmac } from "./webhooks";

const body = '{"employees":[]}';
const timestamp = "2026-05-21T14:00:00Z";
const secret = "test-signing-key";
const signatureFor = (key: string): string =>
  createHmac("sha256", key).update(`${body}${timestamp}`).digest("hex");

describe("validateHmac", () => {
  test("accepts a signature made with any of the known secrets", () => {
    expect(() =>
      validateHmac({ data: body }, timestamp, signatureFor(secret), [
        "other-key",
        secret,
      ]),
    ).not.toThrow();
  });

  test("rejects a signature made with an unknown secret", () => {
    expect(() =>
      validateHmac({ data: body }, timestamp, signatureFor("unknown"), [
        secret,
      ]),
    ).toThrow("does not match a known BambooHR signing key");
  });

  test("rejects a request with no signature header", () => {
    const missing = undefined as unknown as string;
    expect(() =>
      validateHmac({ data: body }, timestamp, missing, [secret]),
    ).toThrow("does not match a known BambooHR signing key");
  });

  test("rejects a malformed signature", () => {
    expect(() =>
      validateHmac({ data: body }, timestamp, "not-hex", [secret]),
    ).toThrow("does not match a known BambooHR signing key");
  });
});
