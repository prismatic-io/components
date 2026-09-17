import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { pushNotificationWebhook } from "./pushNotificationWebhook";
describe("pushNotificationWebhook", () => {
  test("echoes the received payload back untouched", async () => {
    const payload = {
      ...defaultTriggerPayload(),
      headers: {
        "X-Goog-Channel-ID": "7f0419cf-5477-4bd5-bc86-2aa36af12345",
        "X-Goog-Resource-State": "change",
        "X-Goog-Message-Number": "96035",
      },
    };
    const { result } = await invokeTrigger(
      pushNotificationWebhook,
      undefined,
      payload,
      {},
    );
    expect(result.payload).toEqual(payload);
    expect(result.payload.headers["X-Goog-Resource-State"]).toBe("change");
  });
  test("returns no response envelope, as its synchronousResponseSupport declares", async () => {
    const { result } = await invokeTrigger(
      pushNotificationWebhook,
      undefined,
      defaultTriggerPayload(),
      {},
    );
    expect(result).not.toHaveProperty("response");
    expect(pushNotificationWebhook.synchronousResponseSupport).toBe("invalid");
  });
  test("accepts a request carrying no Google channel headers at all", async () => {
    const payload = { ...defaultTriggerPayload(), headers: {} };
    const { result } = await invokeTrigger(
      pushNotificationWebhook,
      undefined,
      payload,
      {},
    );
    expect(result.payload.headers).toEqual({});
  });
  test("makes no API calls", async () => {
    const { result } = await invokeTrigger(
      pushNotificationWebhook,
      undefined,
      defaultTriggerPayload(),
      {},
    );
    expect(result.payload).toBeDefined();
  });
});
