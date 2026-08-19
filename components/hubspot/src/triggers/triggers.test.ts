import { resolvePollingRecordChanges } from "../util";
import { pollChangesCustomObjectsTrigger } from "./pollChangesCustomObjectsTrigger";
import { pollChangesTrigger } from "./pollChangesTrigger";
describe("polling trigger batching", () => {
  test.each([
    ["New and Updated Records", pollChangesTrigger],
    ["New and Updated Custom Records", pollChangesCustomObjectsTrigger],
  ])("%s is opt-in batchable with a default batch size, batch limit, and resolver", (_label, trigger) => {
    expect(trigger.triggerResolverSupport).toBe("valid");
    expect(trigger.batchConfig).toEqual({
      batchSize: 50,
      concurrentBatchLimit: 1,
    });
    expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
    expect(trigger.triggerResolver?.getNextPaginationState).toBeInstanceOf(
      Function,
    );
  });
  test("resolvePollingRecordChanges flattens created then updated into tagged items", () => {
    const created = {
      id: "1",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
    };
    const updated = {
      id: "2",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-02",
    };
    expect(
      resolvePollingRecordChanges({
        createdRecords: [created],
        updatedRecords: [updated],
      }),
    ).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
});
