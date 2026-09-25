import crypto from "node:crypto";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { webhook } from "./webhook";
const { get } = vi.hoisted(() => ({ get: vi.fn() }));
vi.mock("../auth", () => ({ rawHttpClient: () => ({ get }) }));
const SECRET = "dGhpc19pc19hX3Rlc3Rfc2lnbmluZ19zZWNyZXQ";
const TIMESTAMP = "2026-09-18T12:00:00Z";
const BODY = '{"type":"zen:event-type:ticket.created"}';
const WEBHOOK_ID = "01GK8E6BKWMJZD2T8Y5AXJQMG5";
const validSignature = crypto
  .createHmac("sha256", SECRET)
  .update(TIMESTAMP + BODY)
  .digest("base64");
const buildPayload = (headers: Record<string, string>) =>
  ({
    headers,
    rawBody: { data: BODY },
  }) as unknown as Parameters<typeof webhook.perform>[1];
const signedHeaders = {
  "x-zendesk-webhook-signature": validSignature,
  "x-zendesk-webhook-signature-timestamp": TIMESTAMP,
  "x-zendesk-webhook-id": WEBHOOK_ID,
};
const context = (isSimulatedTestExecution = false) =>
  ({ isSimulatedTestExecution }) as unknown as Parameters<
    typeof webhook.perform
  >[0];
const params = { connection: {} } as unknown as Parameters<
  typeof webhook.perform
>[2];
const invoke = (headers: Record<string, string>, simulated = false) =>
  webhook.perform(context(simulated), buildPayload(headers), params);
beforeEach(() => {
  get.mockReset();
  get.mockResolvedValue({ data: { signing_secret: { secret: SECRET } } });
});
describe("webhook signature verification", () => {
  test("accepts a request whose signature matches the fetched signing secret", async () => {
    const result = await invoke(signedHeaders);
    expect(result.payload).toBeDefined();
    expect(get).toHaveBeenCalledWith(`/webhooks/${WEBHOOK_ID}/signing_secret`);
  });
  test("rejects a request whose signature does not match", async () => {
    await expect(
      invoke({
        ...signedHeaders,
        "x-zendesk-webhook-signature": "Zm9yZ2VkLXNpZ25hdHVyZQ==",
      }),
    ).rejects.toThrow(/does not match the configured Zendesk signing key/);
  });
  test("rejects a request signed over a different body", async () => {
    const signedOverOtherBody = crypto
      .createHmac("sha256", SECRET)
      .update(`${TIMESTAMP}{"type":"zen:event-type:ticket.soft_deleted"}`)
      .digest("base64");
    await expect(
      invoke({
        ...signedHeaders,
        "x-zendesk-webhook-signature": signedOverOtherBody,
      }),
    ).rejects.toThrow(/does not match the configured Zendesk signing key/);
  });
  test("reads the headers case-insensitively", async () => {
    const result = await invoke({
      "X-Zendesk-Webhook-Signature": validSignature,
      "X-Zendesk-Webhook-Signature-Timestamp": TIMESTAMP,
      "X-Zendesk-Webhook-Id": WEBHOOK_ID,
    });
    expect(result.payload).toBeDefined();
  });
});
describe("webhook missing headers", () => {
  test("rejects a request with no signature header", async () => {
    const { "x-zendesk-webhook-signature": _omitted, ...headers } =
      signedHeaders;
    await expect(invoke(headers)).rejects.toThrow(
      /HMAC signature was not included/,
    );
    expect(get).not.toHaveBeenCalled();
  });
  test("rejects a request with no timestamp header", async () => {
    const { "x-zendesk-webhook-signature-timestamp": _omitted, ...headers } =
      signedHeaders;
    await expect(invoke(headers)).rejects.toThrow(
      /timestamp header was not included/,
    );
    expect(get).not.toHaveBeenCalled();
  });
  test("rejects a request with no webhook ID header", async () => {
    const { "x-zendesk-webhook-id": _omitted, ...headers } = signedHeaders;
    await expect(invoke(headers)).rejects.toThrow(
      /webhook ID header was not included/,
    );
    expect(get).not.toHaveBeenCalled();
  });
});
describe("webhook signing secret retrieval", () => {
  test("rejects when the signing secret cannot be fetched", async () => {
    get.mockRejectedValue(new Error("404 Not Found"));
    await expect(invoke(signedHeaders)).rejects.toThrow(
      /error occurred fetching the source webhook's signing key/,
    );
  });
  test("does not leak the underlying fetch error to the caller", async () => {
    get.mockRejectedValue(new Error("Bearer abc123 rejected by Zendesk"));
    await expect(invoke(signedHeaders)).rejects.not.toThrow(/abc123/);
  });
});
describe("webhook simulated test execution", () => {
  test("returns the payload without verifying or fetching anything", async () => {
    const result = await invoke({}, true);
    expect(result.payload).toBeDefined();
    expect(get).not.toHaveBeenCalled();
  });
});
describe("webhook declaration", () => {
  test("opts out of scheduling and synchronous responses", () => {
    expect(webhook.scheduleSupport).toBe("invalid");
    expect(webhook.synchronousResponseSupport).toBe("invalid");
  });
  test("takes the connection as its only input", () => {
    expect(Object.keys(webhook.inputs ?? {})).toEqual(["connection"]);
  });
});
