import {
  createConnection,
  defaultTriggerPayload,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { jsmBasic } from "../connections/jsmBasic";
import {
  listRequestsExamplePayload,
  onNewRequestExamplePayload,
} from "../examplePayloads";
import { onNewRequestInputs } from "../inputs/triggers";
import type { ServiceRequest } from "../types";
import { onNewRequest } from "./onNewRequest";
const HOST = "jsm.example.com";
const BASE = `https://${HOST}`;
const REQUEST_PATH = "/rest/servicedeskapi/request";
const connection = createConnection(jsmBasic, {
  username: "user@example.com",
  password: "test-token",
  host: HOST,
});
type Context = Parameters<typeof onNewRequest.perform>[0];
type Payload = Parameters<typeof onNewRequest.perform>[1];
const exampleRecord = listRequestsExamplePayload.data
  .values[0] as unknown as ServiceRequest;
const recordAt = (issueId: string, iso: string): ServiceRequest => ({
  ...exampleRecord,
  issueId,
  issueKey: `HELPDESK-${issueId}`,
  createdDate: { epochMillis: new Date(iso).getTime() },
});
const oldRecord = exampleRecord;
const lateRecord = recordAt("200", "2026-07-02T00:00:00.000Z");
const createStore = (initial: Record<string, unknown> = {}) => {
  let state = initial;
  return {
    getState: () => state,
    setState: (next: Record<string, unknown>) => {
      state = next;
    },
  };
};
const run = (
  store: ReturnType<typeof createStore>,
  inputs: {
    lookBackDate?: string;
    serviceDeskId?: string;
  } = {},
) =>
  onNewRequest.perform(
    { debug: { enabled: false }, polling: store } as unknown as Context,
    defaultTriggerPayload() as Payload,
    {
      connection,
      lookBackDate: inputs.lookBackDate ?? "",
      serviceDeskId: inputs.serviceDeskId,
    },
  );
const mockRequests = (values: ServiceRequest[], times = 1) =>
  nock(BASE)
    .get(REQUEST_PATH)
    .query(true)
    .times(times)
    .reply(200, { values, isLastPage: true });
const chunk = <T>(items: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size)
    out.push(items.slice(i, i + size));
  return out;
};
describe("onNewRequest batching", () => {
  test("declares opt-in batching with a default batch size", () => {
    expect(onNewRequest.triggerResolverSupport).toBe("valid");
    expect(onNewRequest.batchConfig).toEqual({ batchSize: 50 });
    expect(onNewRequest.triggerResolver?.resolveItems).toBeInstanceOf(Function);
  });
  test("lists lookBackDate directly below the required connection input", () => {
    expect(Object.keys(onNewRequestInputs).slice(0, 2)).toEqual([
      "connection",
      "lookBackDate",
    ]);
  });
  test("resolveItems flattens the example payload into tagged items", () => {
    const { payload } = onNewRequestExamplePayload;
    const items = onNewRequest.triggerResolver?.resolveItems?.({} as never, {
      payload,
    });
    const records = payload.body.data as ServiceRequest[];
    expect(items).toEqual(
      records.map((record) => ({ changeType: "created", record })),
    );
  });
  test("resolveItems output chunks by batchSize (stand-in for the platform)", () => {
    const records = Array.from({ length: 120 }, (_, i) =>
      recordAt(String(i), "2026-07-02T00:00:00.000Z"),
    );
    const items =
      onNewRequest.triggerResolver?.resolveItems?.({} as never, {
        payload: {
          ...defaultTriggerPayload(),
          body: { data: records },
        },
      }) ?? [];
    const size = onNewRequest.batchConfig?.batchSize as number;
    expect(chunk(items, size).map((batch) => batch.length)).toEqual([
      50, 50, 20,
    ]);
  });
  test("resolveItems returns [] when body.data is absent", () => {
    expect(
      onNewRequest.triggerResolver?.resolveItems?.({} as never, {
        payload: { ...defaultTriggerPayload(), body: { data: undefined } },
      }),
    ).toEqual([]);
  });
});
describe("onNewRequest polling", () => {
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-07-01T00:00:00.000Z"));
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });
  test("seeds from the Look-back Date on the first recurrence and stores the cursor", async () => {
    mockRequests([oldRecord]);
    const store = createStore();
    const result = await run(store, {
      lookBackDate: "2015-01-01T00:00:00.000Z",
    });
    expect(result?.payload.body.data).toEqual([oldRecord]);
    expect(result?.polledNoChanges).toBe(false);
    expect(store.getState()).toEqual({
      lastPolledAt: "2026-07-01T00:00:00.000Z",
    });
  });
  test("starts from now with no backfill when the Look-back Date is empty", async () => {
    mockRequests([oldRecord]);
    const store = createStore();
    const result = await run(store);
    expect(result?.payload.body.data).toEqual([]);
    expect(result?.polledNoChanges).toBe(true);
    expect(store.getState()).toEqual({
      lastPolledAt: "2026-07-01T00:00:00.000Z",
    });
  });
  test("a persisted cursor wins over the Look-back Date", async () => {
    mockRequests([oldRecord, lateRecord]);
    const store = createStore({ lastPolledAt: "2026-06-01T00:00:00.000Z" });
    const result = await run(store, {
      lookBackDate: "2015-01-01T00:00:00.000Z",
    });
    expect(result?.payload.body.data).toEqual([lateRecord]);
  });
  test("the second recurrence does not re-emit records the first returned", async () => {
    const store = createStore();
    mockRequests([oldRecord]);
    const first = await run(store, {
      lookBackDate: "2015-01-01T00:00:00.000Z",
    });
    expect(first?.payload.body.data).toEqual([oldRecord]);
    nock.cleanAll();
    vi.setSystemTime(new Date("2026-07-03T00:00:00.000Z"));
    mockRequests([oldRecord, lateRecord]);
    const second = await run(store, {
      lookBackDate: "2015-01-01T00:00:00.000Z",
    });
    expect(second?.payload.body.data).toEqual([lateRecord]);
    expect(store.getState()).toEqual({
      lastPolledAt: "2026-07-03T00:00:00.000Z",
    });
    nock.cleanAll();
    mockRequests([oldRecord, lateRecord]);
    const third = await run(store);
    expect(third?.payload.body.data).toEqual([]);
    expect(third?.polledNoChanges).toBe(true);
  });
});
