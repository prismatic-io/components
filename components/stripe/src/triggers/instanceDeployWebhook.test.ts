import {
  createConnection,
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import Stripe from "stripe";
import { stripeConnection } from "../connections/apiKey";
import { instanceDeployWebhook } from "./instanceDeployWebhook";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const SIGNING_SECRET = "whsec_test_secret";
const context = (values: Record<string, unknown>) => values as never;
const params = (values: Record<string, unknown>) => values as never;
const eventBody = JSON.stringify({
  id: "evt_1Ozr8j2eZvKYlo2C9X1zHnGw",
  object: "event",
  type: "charge.succeeded",
  data: { object: { id: "ch_1", object: "charge" } },
});
const signatureFor = (body: string, secret = SIGNING_SECRET) =>
  new Stripe("sk_test_123", {
    apiVersion: "2025-04-30.basil",
  }).webhooks.generateTestHeaderString({
    payload: body,
    secret,
  });
const signedPayload = (body: string, signature: string) => ({
  ...defaultTriggerPayload(),
  headers: {
    "content-type": "application/json",
    "Stripe-Signature": signature,
  },
  rawBody: { data: body, contentType: "application/json" },
  body: { data: JSON.parse(body), contentType: "application/json" },
});
describe("instanceDeployWebhook perform", () => {
  it("returns the event payload once the signature verifies", async () => {
    const payload = signedPayload(eventBody, signatureFor(eventBody));
    const { result } = await invokeTrigger(
      instanceDeployWebhook,
      undefined,
      payload,
      params({ connection: conn, webhookSecret: SIGNING_SECRET }),
    );
    expect(result.payload).toEqual(payload);
    expect(result.payload.body.data).toEqual(JSON.parse(eventBody));
  });
  it("throws when the signature was produced with a different secret", async () => {
    const payload = signedPayload(
      eventBody,
      signatureFor(eventBody, "whsec_someone_elses"),
    );
    await expect(
      invokeTrigger(
        instanceDeployWebhook,
        undefined,
        payload,
        params({ connection: conn, webhookSecret: SIGNING_SECRET }),
      ),
    ).rejects.toThrow("Webhook Error");
  });
  it("skips validation when Disable Webhook Validation is set", async () => {
    const payload = {
      ...defaultTriggerPayload(),
      headers: { "content-type": "application/json" },
      rawBody: { data: eventBody, contentType: "application/json" },
    };
    const { result } = await invokeTrigger(
      instanceDeployWebhook,
      undefined,
      payload,
      params({ connection: conn, disableWebhookValidation: true }),
    );
    expect(result.payload).toEqual(payload);
  });
  it("skips validation for a simulated test execution", async () => {
    const payload = {
      ...defaultTriggerPayload(),
      headers: { "content-type": "application/json" },
      rawBody: { data: eventBody, contentType: "application/json" },
    };
    const { result } = await invokeTrigger(
      instanceDeployWebhook,
      context({ isSimulatedTestExecution: true }),
      payload,
      params({ connection: conn }),
    );
    expect(result.payload).toEqual(payload);
  });
  it("throws a directed error when no signing secret is available", async () => {
    const payload = signedPayload(eventBody, signatureFor(eventBody));
    await expect(
      invokeTrigger(
        instanceDeployWebhook,
        context({ crossFlowState: { "Flow 1": { webhook: {} } } }),
        payload,
        params({ connection: conn }),
      ),
    ).rejects.toThrow("No webhook signing secret is available for this flow.");
  });
});
