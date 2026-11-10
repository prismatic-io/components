import * as crypto from "node:crypto";
import type { TriggerPayload, TriggerResult } from "@prismatic-io/spectral";
import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/testing";
import { adminApiAccessToken } from "../connections";
import { eventTopicWebhookGqlExamplePayload } from "../examplePayloads";
import { eventTopicWebhookGql } from "./eventTopicWebhookGql";

const SECRET = "shpss_test_secret";
const params = {
  shopifyConnection: createConnection(adminApiAccessToken, {
    host: "test-store.myshopify.com",
    adminApiAccessToken: "shpat_test",
  }),
  secret_key: SECRET,
  webhookTopics: ["CUSTOMERS_CREATE"],
};
const RAW_BODY = JSON.stringify(eventTopicWebhookGqlExamplePayload.payload.body.data);

const responseOf = (result: unknown) => (result as TriggerResult<false, TriggerPayload>).response;

const sign = (body: string, secret: string) =>
  crypto.createHmac("sha256", secret).update(body, "utf8").digest("base64");

const delivery = (hmac: string): TriggerPayload => ({
  ...defaultTriggerPayload(),
  headers: {
    "X-Shopify-Hmac-SHA256": hmac,
    "X-Shopify-Topic": "customers/create",
  },
  rawBody: { data: Buffer.from(RAW_BODY, "utf8") },
  body: { data: eventTopicWebhookGqlExamplePayload.payload.body.data },
});

describe("eventTopicWebhookGql trigger perform (webhookPerformFn)", () => {
  test("a valid HMAC parses the raw body and echoes the signature header", async () => {
    const hmac = sign(RAW_BODY, SECRET);
    const payload = delivery(hmac);

    const { result } = await invokeTrigger(eventTopicWebhookGql, {}, payload, params);

    expect(result?.payload).toEqual(payload);
    expect(responseOf(result)?.statusCode).toBe(200);
    expect(responseOf(result)?.body).toEqual(eventTopicWebhookGqlExamplePayload.payload.body.data);
    expect(responseOf(result)?.headers).toEqual({
      "x-shopify-hmac-sha256": hmac,
      "x-shopify-topic": "customers/create",
      "X-Shopify-Hmac-SHA256": hmac,
    });
  });

  test("a tampered HMAC throws Signature verification failed", async () => {
    const payload = delivery(sign(`${RAW_BODY} `, SECRET));

    await expect(invokeTrigger(eventTopicWebhookGql, {}, payload, params)).rejects.toThrow(
      "Signature verification failed",
    );
  });

  test("a simulated test execution returns early without verifying the signature", async () => {
    const payload = delivery("not-a-valid-signature");

    const { result } = await invokeTrigger(
      eventTopicWebhookGql,
      { isSimulatedTestExecution: true },
      payload,
      params,
    );

    expect(responseOf(result)?.statusCode).toBe(200);
    expect(responseOf(result)?.body).toEqual(eventTopicWebhookGqlExamplePayload.payload.body.data);
  });
});
