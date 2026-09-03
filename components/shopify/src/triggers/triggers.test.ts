import { resolvePollingRecordChanges } from "../util";
import { customersPollingTrigger } from "./customersPollingTrigger";
import { ordersPollingTrigger } from "./ordersPollingTrigger";
import type { PollingChangesObject } from "./pollingTypes";
import { productsPollingTrigger } from "./productsPollingTrigger";
interface BatchableTrigger {
  triggerResolverSupport?: string;
  batchConfig?: {
    batchSize: number;
    concurrentBatchLimit?: number;
  };
  triggerResolver?: {
    resolveItems?: (
      context: never,
      result: never,
    ) => {
      changeType: string;
      record: unknown;
    }[];
    getNextPaginationState?: (context: never, result: never) => unknown;
  };
}
const pollingTriggers: [string, BatchableTrigger][] = [
  ["New and Updated Customers", customersPollingTrigger as BatchableTrigger],
  ["New and Updated Orders", ordersPollingTrigger as BatchableTrigger],
  ["New and Updated Products", productsPollingTrigger as BatchableTrigger],
];
const resolveThrough = (trigger: BatchableTrigger, data: unknown) =>
  trigger.triggerResolver?.resolveItems?.(
    {} as never,
    { payload: { body: { data } } } as never,
  );
const createdOrder = {
  id: "gid://shopify/Order/10079785100",
  name: "#1001",
  createdAt: "2024-11-10T10:30:00Z",
  updatedAt: "2024-11-10T10:30:00Z",
};
const updatedOrder = {
  id: "gid://shopify/Order/10079785101",
  name: "#1002",
  createdAt: "2024-11-08T09:00:00Z",
  updatedAt: "2024-11-10T14:22:00Z",
};
describe("polling trigger batching", () => {
  test.each(
    pollingTriggers,
  )("%s is opt-in batchable with a default batch size, batch limit, and resolver", (_label, trigger) => {
    expect(trigger.triggerResolverSupport).toBe("valid");
    expect(trigger.batchConfig).toEqual({
      batchSize: 50,
      concurrentBatchLimit: 1,
    });
    expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
  });
  test("resolvePollingRecordChanges flattens created then updated into tagged items", () => {
    expect(
      resolvePollingRecordChanges({
        created: [createdOrder],
        updated: [updatedOrder],
      }),
    ).toEqual([
      { changeType: "created", record: createdOrder },
      { changeType: "updated", record: updatedOrder },
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({ created: [], updated: [] })).toEqual(
      [],
    );
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("resolvePollingRecordChanges tolerates an individually absent array", () => {
    const createdOnly = {
      created: [createdOrder],
    } as unknown as PollingChangesObject<typeof createdOrder>;
    const updatedOnly = {
      updated: [updatedOrder],
    } as unknown as PollingChangesObject<typeof updatedOrder>;
    expect(resolvePollingRecordChanges(createdOnly)).toEqual([
      { changeType: "created", record: createdOrder },
    ]);
    expect(resolvePollingRecordChanges(updatedOnly)).toEqual([
      { changeType: "updated", record: updatedOrder },
    ]);
  });
  test.each(
    pollingTriggers,
  )("%s resolveItems tags the records it reads off payload.body.data", (_label, trigger) => {
    expect(
      resolveThrough(trigger, {
        created: [createdOrder],
        updated: [updatedOrder],
      }),
    ).toEqual([
      { changeType: "created", record: createdOrder },
      { changeType: "updated", record: updatedOrder },
    ]);
  });
  test.each(
    pollingTriggers,
  )("%s resolveItems returns [] when perform reported no changes", (_label, trigger) => {
    expect(resolveThrough(trigger, { created: [], updated: [] })).toEqual([]);
    expect(resolveThrough(trigger, undefined)).toEqual([]);
  });
  test.each(
    pollingTriggers,
  )("%s getNextPaginationState hands back the cursor perform stamped, and null once drained", (_label, trigger) => {
    const cursor = {
      windowStart: "2026-08-24T00:00:00.000Z",
      windowEnd: "2026-08-25T00:00:00.000Z",
      after: "CURSOR-1",
      isBackfill: false,
    };
    const next = (paginationState: unknown) =>
      trigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: { paginationState } } as never,
      );
    expect(next(cursor)).toEqual(cursor);
    expect(next(undefined)).toBeNull();
  });
});
