import { createHmac } from "node:crypto";
import { invokeTrigger } from "@prismatic-io/spectral/dist/testing";
import { webhook } from "./webhook";

const PRIMARY_KEY = "primary-signature-key";
const SECONDARY_KEY = "secondary-signature-key";
const REJECTION = "The request has failed Box signature validation. Rejecting.";

const body = JSON.stringify({
  type: "webhook_event",
  id: "0f46a6ca-86bf-44ab-8cf5-f08e1e02876b",
  trigger: "FILE.UPLOADED",
});

const sign = (key: string, timestamp: string): string =>
  createHmac("sha256", key).update(body).update(timestamp).digest("base64");

type TriggerPayload = Parameters<typeof invokeTrigger>[2];
type TriggerContext = Parameters<typeof invokeTrigger>[1];
type TriggerParams = Parameters<typeof invokeTrigger>[3];

const deliveryHeaders = {
  "box-delivery-id": "f96bb54b-ee16-4fc5-aa65-8c2d9e5b546f",
  "box-signature-algorithm": "HmacSHA256",
  "box-signature-version": "1",
};

const signedPayload = (key: string): TriggerPayload => {
  const timestamp = new Date().toISOString();
  return {
    rawBody: { data: body },
    body: { data: JSON.parse(body) },
    headers: {
      ...deliveryHeaders,
      "box-delivery-timestamp": timestamp,
      "box-signature-primary": sign(key, timestamp),
    },
  } as unknown as TriggerPayload;
};

const unsignedPayload = (): TriggerPayload =>
  ({
    rawBody: { data: body },
    body: { data: JSON.parse(body) },
    headers: { "content-type": "application/json" },
  }) as unknown as TriggerPayload;

const triggerUnderTest = webhook as unknown as Parameters<
  typeof invokeTrigger
>[0];

const deliver = (
  payload: TriggerPayload,
  inputs: { primarySignatureKey: string; secondarySignatureKey: string },
  context: Record<string, unknown> = {},
) =>
  invokeTrigger(
    triggerUnderTest,
    context as unknown as TriggerContext,
    payload,
    inputs as unknown as TriggerParams,
  );

const configuredKeys = {
  primarySignatureKey: PRIMARY_KEY,
  secondarySignatureKey: SECONDARY_KEY,
};

const deliveredRawBody = (result: unknown) =>
  (result as { payload: { rawBody: unknown } }).payload.rawBody;

describe("webhook (Manual Webhook)", () => {
  test("passes a validly signed delivery through as the trigger payload", async () => {
    const { result } = await deliver(
      signedPayload(PRIMARY_KEY),
      configuredKeys,
    );

    expect(deliveredRawBody(result)).toEqual({ data: body });
  });

  test("rejects a delivery whose signature matches no configured key", async () => {
    await expect(
      deliver(signedPayload("not-a-configured-key"), configuredKeys),
    ).rejects.toThrow(REJECTION);
  });

  test("falls back to the cross-flow state keys when the inputs are blank", async () => {
    const { result } = await deliver(
      signedPayload(PRIMARY_KEY),
      { primarySignatureKey: "", secondarySignatureKey: "" },
      {
        crossFlowState: {
          primarySignatureKey: PRIMARY_KEY,
          secondarySignatureKey: SECONDARY_KEY,
        },
      },
    );

    expect(deliveredRawBody(result)).toEqual({ data: body });
  });

  test("returns the payload without validating during a simulated test execution", async () => {
    const { result } = await deliver(
      signedPayload("not-a-configured-key"),
      configuredKeys,
      { isSimulatedTestExecution: true },
    );

    expect(deliveredRawBody(result)).toEqual({ data: body });
  });

  test("rejects an unsigned delivery when signature keys are configured", async () => {
    await expect(deliver(unsignedPayload(), configuredKeys)).rejects.toThrow(
      REJECTION,
    );
  });

  test("rejects an unsigned delivery when only the cross-flow state holds a key", async () => {
    await expect(
      deliver(
        unsignedPayload(),
        { primarySignatureKey: "", secondarySignatureKey: "" },
        { crossFlowState: { primarySignatureKey: PRIMARY_KEY } },
      ),
    ).rejects.toThrow(REJECTION);
  });

  test("passes an unsigned delivery through when no signature key is configured", async () => {
    const { result } = await deliver(
      unsignedPayload(),
      { primarySignatureKey: "", secondarySignatureKey: "" },
      { crossFlowState: {} },
    );

    expect(deliveredRawBody(result)).toEqual({ data: body });
  });
});
