import crypto from "node:crypto";
import type { TriggerPayload } from "@prismatic-io/spectral";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { ensWebhookExamplePayload } from "../examplePayloads";
import { ensWebhook } from "./ensWebhook";
const fixturePayload = ensWebhookExamplePayload.payload;
const SIGNATURE_KEY = "V27FXfqI3DnhfQW1bhFDeJixpt8eDAY5R24UJI3cK6M=";
const signRawBody = (rawBody: string, key: string): string =>
  crypto
    .createHmac("sha256", Buffer.from(key, "base64"))
    .update(rawBody, "utf8")
    .digest("base64");
const rawBodyString = String(fixturePayload.rawBody.data);
const payloadWithHeaders = (headers: Record<string, string>): TriggerPayload =>
  ({ ...fixturePayload, headers }) as TriggerPayload;
describe("ensWebhook", () => {
  test("verification request returns the callback id and verification key, and logs it", async () => {
    const verificationPayload = {
      ...fixturePayload,
      headers: { "Content-Type": "application/json" },
      body: {
        data: {
          callbackId: "14e2ee5b-8c01-4f9d-916d-29e329945619",
          verificationKey: "abc123def456",
          someOtherField: "dropped",
        },
        contentType: "application/json",
      },
    } as unknown as TriggerPayload;
    const { result, loggerMock } = await invokeTrigger(
      ensWebhook,
      undefined,
      verificationPayload,
      { signatureKey: SIGNATURE_KEY },
    );
    expect(result.payload.body.data).toEqual({
      callbackId: "14e2ee5b-8c01-4f9d-916d-29e329945619",
      verificationKey: "abc123def456",
    });
    expect(loggerMock.info).toHaveBeenCalledWith(
      "Verification request received from ENS for callback 14e2ee5b-8c01-4f9d-916d-29e329945619",
    );
    expect(result.payload.rawBody).toEqual(fixturePayload.rawBody);
  });
  test("a simulated test execution skips signature validation entirely", async () => {
    const { result } = await invokeTrigger(
      ensWebhook,
      { isSimulatedTestExecution: true },
      payloadWithHeaders({ "Content-Type": "application/json" }),
      { signatureKey: SIGNATURE_KEY },
    );
    expect(result.payload.body.data).toEqual(fixturePayload.body.data);
  });
  test("throws when no signature header is present", async () => {
    await expect(
      invokeTrigger(
        ensWebhook,
        undefined,
        payloadWithHeaders({ "Content-Type": "application/json" }),
        { signatureKey: SIGNATURE_KEY },
      ),
    ).rejects.toThrow(
      "Missing signature header. This request may not be from Salesforce Marketing Cloud ENS.",
    );
  });
  test("returns the payload and logs a debug line when the signature matches", async () => {
    const signature = signRawBody(rawBodyString, SIGNATURE_KEY);
    const { result, loggerMock } = await invokeTrigger(
      ensWebhook,
      undefined,
      payloadWithHeaders({
        "Content-Type": "application/json",
        "X-SFMC-ENS-Signature": signature,
      }),
      { signatureKey: SIGNATURE_KEY },
    );
    expect(result.payload.body.data).toEqual(fixturePayload.body.data);
    expect(loggerMock.debug).toHaveBeenCalledWith(
      "ENS webhook signature verified successfully.",
    );
  });
  test("accepts the x-sfmc-hmac-sha256 header as an alternate signature header", async () => {
    const signature = signRawBody(rawBodyString, SIGNATURE_KEY);
    const { result } = await invokeTrigger(
      ensWebhook,
      undefined,
      payloadWithHeaders({
        "Content-Type": "application/json",
        "X-SFMC-HMAC-SHA256": signature,
      }),
      { signatureKey: SIGNATURE_KEY },
    );
    expect(result.payload.body.data).toEqual(fixturePayload.body.data);
  });
  test("throws when the signature does not match the raw body", async () => {
    await expect(
      invokeTrigger(
        ensWebhook,
        undefined,
        payloadWithHeaders({
          "Content-Type": "application/json",
          "X-SFMC-ENS-Signature":
            "sGYYE0kMz1sJl0mNXQqIcYqRuYRRPuVGdI5FtF0hDxg=",
        }),
        { signatureKey: SIGNATURE_KEY },
      ),
    ).rejects.toThrow(
      "Webhook signature verification failed. The request may have been tampered with.",
    );
  });
  test("passes the payload through UNVALIDATED when a signature is present but no signature key is configured", async () => {
    const { result, loggerMock } = await invokeTrigger(
      ensWebhook,
      undefined,
      payloadWithHeaders({
        "Content-Type": "application/json",
        "X-SFMC-ENS-Signature": "not-a-valid-signature",
      }),
      { signatureKey: undefined },
    );
    expect(result.payload.body.data).toEqual(fixturePayload.body.data);
    expect(loggerMock.warn).toHaveBeenCalledWith(
      "No signature key provided. Webhook signatures cannot be verified. Consider providing the signature key from ENS callback creation for enhanced security.",
    );
  });
});
