import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type { EntryProps, KeyValueMap } from "contentful-management";
import { resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const created = {
  sys: {
    id: "5KsDBWseXY6QegucYAoacS",
    createdAt: "2026-01-02T00:00:00.000Z",
    updatedAt: "2026-01-02T00:00:00.000Z",
  },
  fields: {},
} as unknown as EntryProps<KeyValueMap>;
const updated = {
  sys: {
    id: "2cOd0Aho4dInhwh5cgY9rj",
    createdAt: "2025-12-01T00:00:00.000Z",
    updatedAt: "2026-01-03T00:00:00.000Z",
  },
  fields: {},
} as unknown as EntryProps<KeyValueMap>;
test("New and Updated Entries is opt-in batchable with a default batch size", () => {
  expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
  expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
    Function,
  );
});
test("resolvePollingRecordChanges tags every record with how it changed", () => {
  expect(
    resolvePollingRecordChanges({ created: [created], updated: [updated] }),
  ).toEqual([
    { changeType: "created", record: created },
    { changeType: "updated", record: updated },
  ]);
});
test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
  expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual([]);
  expect(resolvePollingRecordChanges(undefined)).toEqual([]);
});
test("resolveItems flattens the payload shape perform actually returns", () => {
  const payload = {
    ...defaultTriggerPayload(),
    body: { data: { created: [created], updated: [] } },
  };
  expect(
    pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }),
  ).toEqual([{ changeType: "created", record: created }]);
});
