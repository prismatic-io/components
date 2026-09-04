import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import type { SlackMessage } from "../types";
import { resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
test("New and Updated Messages is opt-in batchable with a default batch size", () => {
  expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
  expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
    Function,
  );
});
test("resolvePollingRecordChanges tags every record with how it changed", () => {
  const created: SlackMessage = {
    ts: "1716397800.000200",
    type: "message",
    user: "U012AB3CDE",
    text: "hello",
  };
  const updated: SlackMessage = {
    ts: "1716397900.000100",
    type: "message",
    user: "U987XY6Z5",
    text: "edited",
  };
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
  const created: SlackMessage = {
    ts: "1716397800.000200",
    type: "message",
    user: "U012AB3CDE",
    text: "hello",
  };
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
