import type { TriggerPayload } from "@prismatic-io/spectral";
import { describe, expect, it } from "vitest";
import { POLL_BATCH_SIZE } from "../constants";
import {
  pollCampaignChangesTriggerExamplePayload,
  pollProfileAndListChangesTriggerExamplePayload,
} from "../examplePayloads";
import type { PollingChangesObject, PollingRecordChange } from "../types";
import { pollCampaignChangesTrigger } from "./pollCampaignChangesTrigger";
import { pollProfileAndListChangesTrigger } from "./pollProfileAndListChangesTrigger";
const changesOf = (example: {
  payload: TriggerPayload;
}): PollingChangesObject => example.payload.body.data as PollingChangesObject;
const withData = (
  example: {
    payload: TriggerPayload;
  },
  data: unknown,
): {
  payload: TriggerPayload;
} => ({
  payload: {
    ...example.payload,
    body: { ...example.payload.body, data },
  },
});
describe.each([
  ["pollCampaignChangesTrigger", pollCampaignChangesTrigger],
  ["pollProfileAndListChangesTrigger", pollProfileAndListChangesTrigger],
] as const)("%s Tier 1 batching declaration", (_name, trigger) => {
  it("declares triggerResolverSupport as valid", () => {
    expect(trigger.triggerResolverSupport).toBe("valid");
  });
  it("declares batchConfig with the canonical batch size", () => {
    expect(trigger.batchConfig).toEqual({ batchSize: POLL_BATCH_SIZE });
    expect(POLL_BATCH_SIZE).toBe(50);
  });
  it("declares a triggerResolver with a resolveItems function", () => {
    expect(typeof trigger.triggerResolver?.resolveItems).toBe("function");
  });
});
const describeResolver = (
  name: string,
  resolve: (result: { payload: TriggerPayload }) => PollingRecordChange[],
  example: {
    payload: TriggerPayload;
  },
) => {
  describe(`${name} triggerResolver.resolveItems`, () => {
    const changes = changesOf(example);
    const createdIds = (changes.created ?? []).map((record) => record.id);
    const updatedIds = (changes.updated ?? []).map((record) => record.id);
    it("flattens the example payload into created-then-updated items", () => {
      expect(createdIds.length).toBeGreaterThan(0);
      expect(updatedIds.length).toBeGreaterThan(0);
      const items = resolve(example);
      expect(items).toHaveLength(createdIds.length + updatedIds.length);
      expect(items.map((item) => item.changeType)).toEqual([
        ...createdIds.map(() => "created"),
        ...updatedIds.map(() => "updated"),
      ]);
      expect(items.map((item) => item.record.id)).toEqual([
        ...createdIds,
        ...updatedIds,
      ]);
    });
    it("returns an empty array when the data envelope is absent", () => {
      expect(resolve(withData(example, undefined))).toEqual([]);
    });
    it("tolerates one array being present and the other absent", () => {
      const createdOnly = resolve(
        withData(example, { created: changes.created }),
      );
      expect(createdOnly.map((item) => item.record.id)).toEqual(createdIds);
      expect(createdOnly.every((item) => item.changeType === "created")).toBe(
        true,
      );
      const updatedOnly = resolve(
        withData(example, { updated: changes.updated }),
      );
      expect(updatedOnly.map((item) => item.record.id)).toEqual(updatedIds);
      expect(updatedOnly.every((item) => item.changeType === "updated")).toBe(
        true,
      );
    });
  });
};
describeResolver(
  "pollCampaignChangesTrigger",
  (result) =>
    pollCampaignChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      result,
    ) as PollingRecordChange[],
  pollCampaignChangesTriggerExamplePayload,
);
describeResolver(
  "pollProfileAndListChangesTrigger",
  (result) =>
    pollProfileAndListChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      result,
    ) as PollingRecordChange[],
  pollProfileAndListChangesTriggerExamplePayload,
);
