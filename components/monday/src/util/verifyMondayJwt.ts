import { createHmac, timingSafeEqual } from "node:crypto";
import {
  WEBHOOK_JWT_ALGORITHMS,
  WEBHOOK_JWT_CLOCK_SKEW_SECONDS,
} from "../constants";

const decodeSegment = (segment: string): Record<string, unknown> => {
  const value: unknown = JSON.parse(
    Buffer.from(segment, "base64url").toString("utf8"),
  );
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new Error("segment is not a JSON object");
  }
  return value as Record<string, unknown>;
};

export const verifyMondayJwt = (
  authorization: string | undefined,
  signingSecret: string,
  nowSeconds: number = Math.floor(Date.now() / 1000),
): Record<string, unknown> => {
  if (!authorization) {
    throw new Error(
      "the request has no Authorization header. Monday.com signs board webhooks only when they are created with an integration app's OAuth token",
    );
  }

  const token = authorization.replace(/^Bearer\s+/i, "").trim();
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("the Authorization header is not a JWT");
  }
  const [headerSegment, payloadSegment, signatureSegment] = parts;

  let header: Record<string, unknown>;
  let claims: Record<string, unknown>;
  try {
    header = decodeSegment(headerSegment);
    claims = decodeSegment(payloadSegment);
  } catch {
    throw new Error("the JWT header and payload must be JSON objects");
  }

  if (
    typeof header.alg !== "string" ||
    !Object.hasOwn(WEBHOOK_JWT_ALGORITHMS, header.alg)
  ) {
    throw new Error("the JWT algorithm is not allowed");
  }

  const expected = Buffer.from(
    createHmac(WEBHOOK_JWT_ALGORITHMS[header.alg], signingSecret)
      .update(`${headerSegment}.${payloadSegment}`)
      .digest("base64url"),
  );
  const actual = Buffer.from(signatureSegment);
  if (actual.length !== expected.length || !timingSafeEqual(actual, expected)) {
    throw new Error("the JWT signature does not match the Signing Secret");
  }

  if (claims.exp !== undefined) {
    if (typeof claims.exp !== "number") {
      throw new Error("the JWT exp claim is not a number");
    }
    if (claims.exp + WEBHOOK_JWT_CLOCK_SKEW_SECONDS < nowSeconds) {
      throw new Error("the JWT has expired");
    }
  }

  return claims;
};
