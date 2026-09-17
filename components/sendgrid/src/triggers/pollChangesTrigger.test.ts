import { describe, expect, it } from "vitest";
import { POLLING_BATCH_SIZE } from "../constants";
import { pollChangesTriggerExamplePayload } from "../examplePayloads";
import { pollChangesTrigger } from "./pollChangesTrigger";
describe("pollChangesTrigger batching declaration", () => {
  it("declares Tier 1 batching support", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  });
  it("declares a batchConfig of the polling batch size", () => {
    expect(pollChangesTrigger.batchConfig).toEqual({
      batchSize: POLLING_BATCH_SIZE,
    });
    expect(POLLING_BATCH_SIZE).toBe(50);
  });
  it("exposes a resolveItems function", () => {
    expect(typeof pollChangesTrigger.triggerResolver?.resolveItems).toBe(
      "function",
    );
  });
});
describe("pollChangesTrigger.triggerResolver.resolveItems", () => {
  const resolveItems = pollChangesTrigger.triggerResolver?.resolveItems;
  const mockContext = {} as Parameters<NonNullable<typeof resolveItems>>[0];
  it("resolves the documented payload shape into tagged record changes", () => {
    if (!resolveItems) {
      throw new Error(
        "pollChangesTrigger.triggerResolver.resolveItems missing",
      );
    }
    const { payload } = pollChangesTriggerExamplePayload;
    const items = resolveItems(mockContext, { payload });
    expect(items).toEqual([
      {
        changeType: "updated",
        record: {
          msg_id: "abc12345.recvd-67890-XYZ-1-1234567-1.0",
          from_email: "sender@example.com",
          subject: "Hello from Acme!",
          to_email: "user@example.com",
          status: "delivered",
          opens_count: 0,
          clicks_count: 0,
          last_event_time: "2026-05-27T14:30:00Z",
          api_key_id: "abc12345defg67890hijkXYZ",
          template_id: "d-exampletemplateid1234567890abcdef",
        },
      },
    ]);
  });
});
