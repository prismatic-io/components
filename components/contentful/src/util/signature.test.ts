import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type { ContentfulCanonicalRequest } from "../types";
import {
  validateContentfulWebhookRequest,
  verifyContentfulRequest,
} from "./signature";
const SECRET = `${"a".repeat(32)}${"b".repeat(32)}`;
const SIGNED_AT = 1767225600000;
const BODY =
  '{"sys":{"id":"5KsDBWseXY6QegucYAoacS","type":"Entry"},"fields":{"title":{"en-US":"Hello, World!"}}}';
const toolkitSigned: ContentfulCanonicalRequest = {
  method: "POST",
  path: "/trigger/SW5zdGFuY2VGbG93Q29uZmlnOjE=",
  headers: {
    "Content-Type": "application/vnd.contentful.management.v1+json",
    "X-Contentful-Topic": "ContentManagement.Entry.publish",
    "x-contentful-signature":
      "8dec81505760a10b542fbc36d3aa0a772b11f759eca7b2351daaf5bba8c7c6f1",
    "x-contentful-signed-headers":
      "content-type,x-contentful-signed-headers,x-contentful-timestamp,x-contentful-topic",
    "x-contentful-timestamp": String(SIGNED_AT),
  },
  body: BODY,
};
const toolkitSignedWithQuery: ContentfulCanonicalRequest = {
  method: "POST",
  path: "/trigger/abc?foo=bar baz&x=1",
  headers: {
    "x-contentful-webhook-name": " My Hook ",
    "x-contentful-signature":
      "c8c83deb1a865012752f66594e6228056c826fd7227a70361b3a304e124555ec",
    "x-contentful-signed-headers":
      "x-contentful-signed-headers,x-contentful-timestamp,x-contentful-webhook-name",
    "x-contentful-timestamp": String(SIGNED_AT),
  },
  body: BODY,
};
test("accepts requests signed by the official toolkit", () => {
  expect(() => verifyContentfulRequest(SECRET, toolkitSigned, 0)).not.toThrow();
  expect(() =>
    verifyContentfulRequest(SECRET, toolkitSignedWithQuery, 0),
  ).not.toThrow();
});
test("rejects a tampered body", () => {
  expect(() =>
    verifyContentfulRequest(SECRET, { ...toolkitSigned, body: `${BODY} ` }, 0),
  ).toThrow(/signature verification failed/);
});
test("rejects a wrong secret", () => {
  expect(() =>
    verifyContentfulRequest("c".repeat(64), toolkitSigned, 0),
  ).toThrow(/signature verification failed/);
});
test("rejects an expired request under the default 30 second TTL", () => {
  expect(() => verifyContentfulRequest(SECRET, toolkitSigned)).toThrow(
    /expired/,
  );
});
test("rejects a request without signature headers", () => {
  expect(() =>
    verifyContentfulRequest(SECRET, { ...toolkitSigned, headers: {} }, 0),
  ).toThrow(/missing a valid Contentful signature/);
});
test("skips verification with no secret or in a simulated test execution", () => {
  const payload = defaultTriggerPayload();
  expect(() =>
    validateContentfulWebhookRequest(payload, {
      signingSecret: undefined,
      isSimulatedTestExecution: false,
      flowWebhookUrl: undefined,
    }),
  ).not.toThrow();
  expect(() =>
    validateContentfulWebhookRequest(payload, {
      signingSecret: SECRET,
      isSimulatedTestExecution: true,
      flowWebhookUrl: undefined,
    }),
  ).not.toThrow();
});
test("verifies a delivery from the trigger payload's invoked URL and raw body", () => {
  vi.useFakeTimers();
  vi.setSystemTime(SIGNED_AT + 1000);
  try {
    const payload = {
      ...defaultTriggerPayload(),
      invokeUrl: `https://hooks.example.com${toolkitSigned.path}`,
      headers: toolkitSigned.headers,
      queryParameters: {},
      rawBody: { data: Buffer.from(BODY, "utf8") },
    };
    expect(() =>
      validateContentfulWebhookRequest(payload, {
        signingSecret: SECRET,
        isSimulatedTestExecution: false,
        flowWebhookUrl: undefined,
      }),
    ).not.toThrow();
  } finally {
    vi.useRealTimers();
  }
});
