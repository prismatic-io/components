import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { webhook } from "./webhook";
describe("webhook (Deprecated)", () => {
  it("returns the incoming payload unchanged", async () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { id: "evt_1", type: "charge.succeeded" } },
    };
    const { result } = await invokeTrigger(webhook, undefined, payload);
    expect(result.payload).toEqual(payload);
    expect(result.payload.body.data).toEqual({
      id: "evt_1",
      type: "charge.succeeded",
    });
  });
});
