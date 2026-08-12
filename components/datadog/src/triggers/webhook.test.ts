import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { webhookTriggerPayloadExample } from "../examplePayloads";
import { webhook } from "./webhook";
describe("webhook trigger", () => {
  test("returns the received payload unmodified", async () => {
    const alert = webhookTriggerPayloadExample.payload.body.data;
    const payload = {
      ...defaultTriggerPayload(),
      rawBody: {
        data: Buffer.from(JSON.stringify(alert)),
        contentType: "application/json",
      },
      body: { data: alert, contentType: "application/json" },
    };
    const { result } = await invokeTrigger(webhook, undefined, payload);
    expect(result.payload).toStrictEqual(payload);
    expect(result.payload.body.data).toEqual(alert);
  });
});
