import * as crypto from "node:crypto";
import type { TriggerPayload, TriggerResult } from "@prismatic-io/spectral";
import { defaultTriggerPayload, invokeTrigger } from "@prismatic-io/spectral/testing";
import { webhookExamplePayload } from "../examplePayloads";
import { webhook } from "./webhook";

const SECRET = "shpss_test_secret";
const RAW_BODY = JSON.stringify(webhookExamplePayload.payload.body.data);

const responseOf = (result: unknown) => (result as TriggerResult<false, TriggerPayload>).response;

const sign = (body: string, secret: string) =>
  crypto.createHmac("sha256", secret).update(body, "utf8").digest("base64");

const delivery = (hmac: string): TriggerPayload => ({
  ...defaultTriggerPayload(),
  headers: {
    "X-Shopify-Hmac-SHA256": hmac,
    "X-Shopify-Topic": "orders/create",
  },
  rawBody: { data: Buffer.from(RAW_BODY, "utf8") },
  body: { data: webhookExamplePayload.payload.body.data },
});

describe("webhook trigger", () => {
  test("a valid HMAC parses the raw body and echoes the signature header", async () => {
    const hmac = sign(RAW_BODY, SECRET);
    const payload = delivery(hmac);

    const { result } = await invokeTrigger(webhook, {}, payload, { secret_key: SECRET });

    expect(result?.payload).toEqual(payload);
    expect(responseOf(result)?.statusCode).toBe(200);
    expect(responseOf(result)?.body).toEqual(webhookExamplePayload.payload.body.data);
    expect(responseOf(result)?.headers).toEqual({
      "x-shopify-hmac-sha256": hmac,
      "x-shopify-topic": "orders/create",
      "X-Shopify-Hmac-SHA256": hmac,
    });
  });

  test("a tampered HMAC throws Signature verification failed", async () => {
    const payload = delivery(sign(`${RAW_BODY} `, SECRET));

    await expect(invokeTrigger(webhook, {}, payload, { secret_key: SECRET })).rejects.toThrow(
      "Signature verification failed",
    );
  });

  test("a simulated test execution returns early without verifying the signature", async () => {
    const payload = delivery("not-a-valid-signature");

    const { result } = await invokeTrigger(webhook, { isSimulatedTestExecution: true }, payload, {
      secret_key: SECRET,
    });

    expect(responseOf(result)?.statusCode).toBe(200);
    expect(responseOf(result)?.body).toEqual(webhookExamplePayload.payload.body.data);
  });
});
