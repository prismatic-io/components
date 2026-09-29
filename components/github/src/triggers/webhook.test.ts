import crypto from "node:crypto";
import type { TriggerPayload } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { webhook } from "./webhook";
const signatureFor = (secret: string, body: string) =>
  `sha256=${crypto.createHmac("sha256", secret).update(body).digest("hex")}`;
const buildPayload = (
  body: string,
  headers: Record<string, string> = {},
): TriggerPayload =>
  ({
    headers,
    queryParameters: {},
    rawBody: { data: body },
    body: { data: JSON.parse(body || "{}") },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "exec",
    customer: { id: "c", name: "c", externalId: "e" },
    instance: { id: "i", name: "i" },
    user: { id: "u", email: "u@e.com", name: "u" },
    integration: { id: "int", versionSequenceId: "v" },
    flow: { id: "f", name: "f" },
    startedAt: new Date().toISOString(),
  }) as unknown as TriggerPayload;
describe("webhook trigger", () => {
  test("returns the payload unchanged on a simulated test execution", async () => {
    const payload = buildPayload('{"action":"opened"}');
    const { result } = await invokeTrigger(
      webhook,
      { isSimulatedTestExecution: true },
      payload,
      { webhookSecret: undefined },
    );
    expect(result?.payload.body).toEqual(payload.body);
    expect(result?.payload.executionId).toBe(payload.executionId);
  });
  test("returns the payload when no webhook secret is configured", async () => {
    const payload = buildPayload("{}");
    const { result } = await invokeTrigger(webhook, {}, payload, {
      webhookSecret: undefined,
    });
    expect(result?.payload).toBeDefined();
  });
  test("accepts a request whose x-hub-signature-256 matches the secret", async () => {
    const secret = "s3cr3t";
    const body = JSON.stringify({ action: "opened" });
    const payload = buildPayload(body, {
      "x-hub-signature-256": signatureFor(secret, body),
    });
    const { result } = await invokeTrigger(webhook, {}, payload, {
      webhookSecret: secret,
    });
    expect(result?.payload).toBeDefined();
  });
  test("throws when the signature does not match the secret", async () => {
    const secret = "s3cr3t";
    const body = JSON.stringify({ action: "opened" });
    const payload = buildPayload(body, {
      "x-hub-signature-256": "sha256=deadbeef",
    });
    await expect(
      invokeTrigger(webhook, {}, payload, { webhookSecret: secret }),
    ).rejects.toThrow(/does not match the configured GitHub signing key/);
  });
});
