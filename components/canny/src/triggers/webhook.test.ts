import crypto from "node:crypto";
import type { ActionContext } from "@prismatic-io/spectral";
import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { TEST_API_KEY, testConnection } from "../testHelpers";
import { webhook } from "./webhook";
const sign = (nonce: string) =>
  crypto.createHmac("sha256", TEST_API_KEY).update(nonce).digest("base64");
const NONCE = "e4f1c0a8b7d24f3e9a5c6b8d0e2f4a19";
const invokeWebhook = (
  headers: Record<string, string>,
  context: Partial<ActionContext> = {},
) =>
  invokeTrigger(
    webhook,
    context,
    { ...defaultTriggerPayload(), headers },
    { connection: testConnection },
  );
describe("webhook", () => {
  test("returns the payload unchanged when the signature is valid", async () => {
    const { result } = await invokeWebhook({
      "canny-nonce": NONCE,
      "canny-signature": sign(NONCE),
    });
    const defaults = defaultTriggerPayload();
    expect(result?.payload.body).toStrictEqual(defaults.body);
    expect(result?.payload.rawBody).toStrictEqual(defaults.rawBody);
    expect(result?.payload.headers).toStrictEqual({
      "canny-nonce": NONCE,
      "canny-signature": sign(NONCE),
    });
  });
  test("verifies a signature sent under mixed-case header names", async () => {
    const { result } = await invokeWebhook({
      "Canny-Nonce": NONCE,
      "CANNY-SIGNATURE": sign(NONCE),
    });
    expect(result?.payload).toBeDefined();
    expect(result?.payload.headers).toStrictEqual({
      "Canny-Nonce": NONCE,
      "CANNY-SIGNATURE": sign(NONCE),
    });
  });
  test("throws when the signature does not match the nonce", async () => {
    await expect(
      invokeWebhook({
        "canny-nonce": NONCE,
        "canny-signature": sign("a-different-nonce"),
      }),
    ).rejects.toThrow("Invalid Canny webhook signature");
  });
  test("throws when the signature headers are absent", async () => {
    await expect(invokeWebhook({})).rejects.toThrow(
      "Invalid Canny webhook signature",
    );
  });
  test("skips verification for a simulated test execution", async () => {
    const { result } = await invokeWebhook(
      {},
      { isSimulatedTestExecution: true },
    );
    expect(result?.payload).toBeDefined();
    expect(result?.payload.headers).toStrictEqual({});
  });
});
