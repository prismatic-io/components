import { createHmac } from "node:crypto";
import { describe, expect, it } from "vitest";
import { verifyMondayJwt } from "./verifyMondayJwt";

const SECRET = "test-signing-secret";
const NOW = 1_800_000_000;

const encode = (value: object) =>
  Buffer.from(JSON.stringify(value)).toString("base64url");

const sign = (
  claims: object,
  { secret = SECRET, alg = "HS256" }: { secret?: string; alg?: string } = {},
) => {
  const header = encode({ alg, typ: "JWT" });
  const payload = encode(claims);
  const signature = createHmac("sha256", secret)
    .update(`${header}.${payload}`)
    .digest("base64url");
  return `${header}.${payload}.${signature}`;
};

describe("verifyMondayJwt", () => {
  it("returns the claims of a JWT signed with the Signing Secret", () => {
    const claims = { accountId: 1, userId: 2, exp: NOW + 300 };
    expect(verifyMondayJwt(sign(claims), SECRET, NOW)).toEqual(claims);
  });

  it("accepts a Bearer-prefixed JWT", () => {
    const token = `Bearer ${sign({ exp: NOW + 300 })}`;
    expect(() => verifyMondayJwt(token, SECRET, NOW)).not.toThrow();
  });

  it("accepts a JWT with no exp claim", () => {
    expect(() =>
      verifyMondayJwt(sign({ userId: 2 }), SECRET, NOW),
    ).not.toThrow();
  });

  it("accepts a JWT that expired within the clock skew allowance", () => {
    const token = sign({ exp: NOW - 30 });
    expect(() => verifyMondayJwt(token, SECRET, NOW)).not.toThrow();
  });

  it("rejects a missing Authorization header", () => {
    expect(() => verifyMondayJwt(undefined, SECRET, NOW)).toThrow(
      "no Authorization header",
    );
  });

  it("rejects the raw secret sent as the header", () => {
    expect(() => verifyMondayJwt(SECRET, SECRET, NOW)).toThrow("not a JWT");
  });

  it("rejects a JWT whose header is not valid JSON", () => {
    const [, payload, signature] = sign({ exp: NOW + 300 }).split(".");
    expect(() =>
      verifyMondayJwt(`not-json.${payload}.${signature}`, SECRET, NOW),
    ).toThrow("must be JSON objects");
  });

  it.each([
    ["header", "null"],
    ["header", "[]"],
    ["payload", "null"],
  ])("rejects a JWT whose %s decodes to %s", (segment, json) => {
    const [header, payload, signature] = sign({ exp: NOW + 300 }).split(".");
    const literal = Buffer.from(json).toString("base64url");
    const token =
      segment === "header"
        ? `${literal}.${payload}.${signature}`
        : `${header}.${literal}.${signature}`;
    expect(() => verifyMondayJwt(token, SECRET, NOW)).toThrow(
      "must be JSON objects",
    );
  });

  it("rejects a JWT signed with a different secret", () => {
    const token = sign({ exp: NOW + 300 }, { secret: "another-secret" });
    expect(() => verifyMondayJwt(token, SECRET, NOW)).toThrow(
      "signature does not match",
    );
  });

  it("rejects a JWT whose payload was altered after signing", () => {
    const [header, , signature] = sign({ userId: 2, exp: NOW + 300 }).split(
      ".",
    );
    const tampered = encode({ userId: 999, exp: NOW + 300 });
    expect(() =>
      verifyMondayJwt(`${header}.${tampered}.${signature}`, SECRET, NOW),
    ).toThrow("signature does not match");
  });

  it.each([
    "none",
    "HS512",
    "RS256",
    "constructor",
  ])("rejects the %s algorithm", (alg) => {
    const token = sign({ exp: NOW + 300 }, { alg });
    expect(() => verifyMondayJwt(token, SECRET, NOW)).toThrow(
      "the JWT algorithm is not allowed",
    );
  });

  it("never echoes the token's algorithm in its error", () => {
    const alg = `HS256\nINFO forged log line ${"x".repeat(1000)}`;
    const token = sign({ exp: NOW + 300 }, { alg });
    expect(() => verifyMondayJwt(token, SECRET, NOW)).toThrow(
      /^the JWT algorithm is not allowed$/,
    );
  });

  it.each([
    ["padding", "="],
    ["a character outside the alphabet", "!"],
  ])("rejects a valid signature with %s appended", (_, suffix) => {
    const token = `${sign({ exp: NOW + 300 })}${suffix}`;
    expect(() => verifyMondayJwt(token, SECRET, NOW)).toThrow(
      "signature does not match",
    );
  });

  it("rejects an expired JWT", () => {
    const token = sign({ exp: NOW - 120 });
    expect(() => verifyMondayJwt(token, SECRET, NOW)).toThrow("has expired");
  });

  it("rejects a non-numeric exp claim", () => {
    const token = sign({ exp: "tomorrow" });
    expect(() => verifyMondayJwt(token, SECRET, NOW)).toThrow(
      "exp claim is not a number",
    );
  });

  it("never includes the token or the secret in its error", () => {
    const token = sign({ exp: NOW + 300 }, { secret: "another-secret" });
    try {
      verifyMondayJwt(token, SECRET, NOW);
      expect.unreachable();
    } catch (error) {
      const message = (error as Error).message;
      expect(message).not.toContain(SECRET);
      expect(message).not.toContain(token.split(".")[2]);
    }
  });
});
