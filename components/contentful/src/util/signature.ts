import { createHmac, timingSafeEqual } from "node:crypto";
import { escape as escapeQueryString } from "node:querystring";
import { type TriggerPayload, util } from "@prismatic-io/spectral";
import type { ContentfulCanonicalRequest } from "../types";
const SIGNATURE_HEADER = "x-contentful-signature";
const SIGNED_HEADERS_HEADER = "x-contentful-signed-headers";
const TIMESTAMP_HEADER = "x-contentful-timestamp";
export const SIGNATURE_TTL_SECONDS = 30;
const SECRET_LENGTH = 64;
const sortHeaderKeys = (keyA: string, keyB: string): number =>
  keyA > keyB ? 1 : -1;
const normalizeHeaders = (
  headers: Record<string, string>,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(headers).map(([key, value]) => [
      key.toLowerCase().trim(),
      String(value).trim(),
    ]),
  );
const getNormalizedEncodedURI = (uri: string): string => {
  const [pathname, search] = uri.split("?");
  const escapedSearch = search ? escapeQueryString(search) : "";
  return encodeURI(escapedSearch ? `${pathname}?${escapedSearch}` : pathname);
};
const timingSafeUtf8StringEqual = (a: string, b: string): boolean => {
  const aBuf = Buffer.from(a, "utf8");
  const bBuf = Buffer.from(b, "utf8");
  if (aBuf.length !== bBuf.length) {
    return false;
  }
  return timingSafeEqual(aBuf, bBuf);
};
export const computeContentfulSignature = (
  secret: string,
  request: ContentfulCanonicalRequest,
  timestamp: number,
): string => {
  const headers = normalizeHeaders(request.headers);
  const signedHeaderNames = Object.keys(headers);
  if (!(SIGNED_HEADERS_HEADER in headers)) {
    signedHeaderNames.push(SIGNED_HEADERS_HEADER);
  }
  if (!(TIMESTAMP_HEADER in headers)) {
    signedHeaderNames.push(TIMESTAMP_HEADER);
  }
  headers[TIMESTAMP_HEADER] = timestamp.toString();
  headers[SIGNED_HEADERS_HEADER] = signedHeaderNames
    .sort(sortHeaderKeys)
    .join(",");
  const stringifiedHeaders = Object.entries(headers)
    .sort(([keyA], [keyB]) => sortHeaderKeys(keyA, keyB))
    .map(([key, value]) => `${key}:${value}`)
    .join(";");
  const stringifiedRequest = [
    request.method,
    getNormalizedEncodedURI(request.path),
    stringifiedHeaders,
    request.body,
  ].join("\n");
  return createHmac("sha256", secret).update(stringifiedRequest).digest("hex");
};
export const verifyContentfulRequest = (
  secret: string,
  request: ContentfulCanonicalRequest,
  ttlSeconds: number = SIGNATURE_TTL_SECONDS,
): void => {
  if (secret.length !== SECRET_LENGTH) {
    throw new Error(
      `The Webhook Signing Secret must be ${SECRET_LENGTH} characters long. Copy it from the space's webhook settings in Contentful.`,
    );
  }
  if (!request.path.startsWith("/")) {
    throw new Error(
      "Unable to verify the Contentful webhook signature: the request path could not be determined.",
    );
  }
  const headers = normalizeHeaders(request.headers);
  const signature = headers[SIGNATURE_HEADER];
  const signedHeaders = (headers[SIGNED_HEADERS_HEADER] ?? "").split(",");
  const timestamp = Number.parseInt(headers[TIMESTAMP_HEADER] ?? "", 10);
  if (
    signature?.length !== 64 ||
    signedHeaders.length < 2 ||
    !Number.isFinite(timestamp)
  ) {
    throw new Error(
      `The request is missing a valid Contentful signature. Confirm request verification is enabled for the space, or clear the Webhook Signing Secret input. Expected headers: ${SIGNATURE_HEADER}, ${SIGNED_HEADERS_HEADER}, ${TIMESTAMP_HEADER}.`,
    );
  }
  if (ttlSeconds !== 0 && Date.now() - timestamp >= ttlSeconds * 1000) {
    throw new Error(
      `The Contentful webhook request expired: requests must be verified within ${ttlSeconds}s of their signature timestamp.`,
    );
  }
  const signedOnly = Object.fromEntries(
    Object.entries(headers).filter(([key]) => signedHeaders.includes(key)),
  );
  const computed = computeContentfulSignature(
    secret,
    { ...request, headers: signedOnly },
    timestamp,
  );
  if (!timingSafeUtf8StringEqual(signature, computed)) {
    throw new Error(
      "Contentful webhook signature verification failed. Confirm the Webhook Signing Secret matches the space's signing secret.",
    );
  }
};
export const buildContentfulCanonicalRequest = (
  payload: TriggerPayload,
  flowWebhookUrl: string | undefined,
): ContentfulCanonicalRequest => {
  const rawBody = payload.rawBody.data;
  const body = Buffer.isBuffer(rawBody)
    ? rawBody.toString("utf8")
    : typeof rawBody === "string"
      ? rawBody
      : util.types.toString(rawBody);
  const queryString = new URLSearchParams(
    payload.queryParameters ?? {},
  ).toString();
  let path = "";
  const sourceUrl = payload.invokeUrl || flowWebhookUrl;
  if (sourceUrl) {
    try {
      const url = new URL(sourceUrl);
      const pathname = payload.invokeUrl
        ? url.pathname
        : `${url.pathname.replace(/\/$/, "")}${payload.pathFragment ?? ""}`;
      path = queryString ? `${pathname}?${queryString}` : pathname;
    } catch {
      path = "";
    }
  }
  return {
    method: "POST",
    path,
    headers: util.types.lowerCaseHeaders(payload.headers ?? {}),
    body,
  };
};
export const validateContentfulWebhookRequest = (
  payload: TriggerPayload,
  {
    signingSecret,
    isSimulatedTestExecution,
    flowWebhookUrl,
  }: {
    signingSecret: string | undefined;
    isSimulatedTestExecution: boolean | undefined;
    flowWebhookUrl: string | undefined;
  },
): void => {
  if (!signingSecret || isSimulatedTestExecution) {
    return;
  }
  verifyContentfulRequest(
    signingSecret,
    buildContentfulCanonicalRequest(payload, flowWebhookUrl),
  );
};
