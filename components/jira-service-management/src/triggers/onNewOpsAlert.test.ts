import {
  createConnection,
  defaultTriggerPayload,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { jsmBasic } from "../connections/jsmBasic";
import { onNewOpsAlertExamplePayload } from "../examplePayloads";
import { onNewOpsAlertInputs } from "../inputs/triggers";
import type { OpsAlertSummary } from "../types";
import { onNewOpsAlert } from "./onNewOpsAlert";
const HOST = "jsm.example.com";
const CLOUD_ID = "cloud-123";
const OPS_BASE = "https://api.atlassian.com";
const ALERTS_PATH = `/jsm/ops/api/${CLOUD_ID}/v1/alerts`;
const connection = createConnection(jsmBasic, {
  username: "user@example.com",
  password: "test-token",
  host: HOST,
});
type Context = Parameters<typeof onNewOpsAlert.perform>[0];
type Payload = Parameters<typeof onNewOpsAlert.perform>[1];
const exampleAlert = (
  onNewOpsAlertExamplePayload.payload.body.data as OpsAlertSummary[]
)[0];
const alertAt = (id: string, iso: string): OpsAlertSummary => ({
  ...exampleAlert,
  id,
  createdAt: new Date(iso).getTime(),
});
const oldAlert = alertAt("old", "2026-06-01T00:00:00.000Z");
const lateAlert = alertAt("late", "2026-07-02T00:00:00.000Z");
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
    opsAlertAdditionalQuery?: string;
  } = {},
) =>
  onNewOpsAlert.perform(
    { debug: { enabled: false }, polling: store } as unknown as Context,
    defaultTriggerPayload() as Payload,
    {
      connection,
      lookBackDate: inputs.lookBackDate ?? "",
      opsAlertAdditionalQuery: inputs.opsAlertAdditionalQuery,
    },
  );
const lowerBound = (query: string): number =>
  Number(query.replace("createdAt > ", "").split(" AND ")[0]);
const mockAlerts = (stored: OpsAlertSummary[]) => {
  const queries: string[] = [];
  nock(`https://${HOST}`)
    .get("/_edge/tenant_info")
    .reply(200, { cloudId: CLOUD_ID });
  nock(OPS_BASE)
    .get(ALERTS_PATH)
    .query(true)
    .reply((uri) => {
      const query = new URL(uri, OPS_BASE).searchParams.get("query") ?? "";
      queries.push(query);
      const bound = lowerBound(query);
      return [
        200,
        { values: stored.filter((a) => (a.createdAt as number) > bound) },
      ];
    });
  return queries;
};
const chunk = <T>(items: T[], size: number): T[][] => {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    out.push(items.slice(i, i + size));
  }
  return out;
};
describe("onNewOpsAlert batching", () => {
  test("declares opt-in batching with a default batch size", () => {
    expect(onNewOpsAlert.triggerResolverSupport).toBe("valid");
    expect(onNewOpsAlert.batchConfig).toEqual({ batchSize: 50 });
    expect(onNewOpsAlert.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  test("lists lookBackDate directly below the required connection input", () => {
    expect(Object.keys(onNewOpsAlertInputs).slice(0, 2)).toEqual([
      "connection",
      "lookBackDate",
    ]);
  });
  test("resolveItems flattens the example payload into tagged items", () => {
    const { payload } = onNewOpsAlertExamplePayload;
    const items = onNewOpsAlert.triggerResolver?.resolveItems?.({} as never, {
      payload,
    });
    const records = payload.body.data as OpsAlertSummary[];
    expect(items).toEqual(
      records.map((record) => ({ changeType: "created", record })),
    );
  });
  test("resolveItems output chunks by batchSize (stand-in for the platform)", () => {
    const records = Array.from({ length: 120 }, (_, i) =>
      alertAt(String(i), "2026-07-02T00:00:00.000Z"),
    );
    const items =
      onNewOpsAlert.triggerResolver?.resolveItems?.({} as never, {
        payload: { ...defaultTriggerPayload(), body: { data: records } },
      }) ?? [];
    const size = onNewOpsAlert.batchConfig?.batchSize as number;
    expect(chunk(items, size).map((batch) => batch.length)).toEqual([
      50, 50, 20,
    ]);
  });
  test("resolveItems returns [] when body.data is absent", () => {
    expect(
      onNewOpsAlert.triggerResolver?.resolveItems?.({} as never, {
        payload: { ...defaultTriggerPayload(), body: { data: undefined } },
      }),
    ).toEqual([]);
  });
});
describe("onNewOpsAlert polling", () => {
  const NOW1 = "2026-07-01T00:00:00.000Z";
  const NOW2 = "2026-07-03T00:00:00.000Z";
  beforeEach(() => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW1));
  });
  afterEach(() => {
    vi.useRealTimers();
    nock.cleanAll();
  });
  test("sends the Look-back Date as the createdAt lower bound on the first recurrence and stores the cursor", async () => {
    const lookBack = "2026-02-01T00:00:00.000Z";
    const queries = mockAlerts([oldAlert]);
    const store = createStore();
    const result = await run(store, { lookBackDate: lookBack });
    expect(queries).toEqual([`createdAt > ${new Date(lookBack).getTime()}`]);
    expect(result?.payload.body.data).toEqual([oldAlert]);
    expect(store.getState()).toEqual({ lastPolledAt: NOW1 });
  });
  test("starts from now when the Look-back Date is empty", async () => {
    const queries = mockAlerts([oldAlert]);
    const result = await run(createStore());
    expect(queries).toEqual([`createdAt > ${new Date(NOW1).getTime()}`]);
    expect(result?.payload.body.data).toEqual([]);
    expect(result?.polledNoChanges).toBe(true);
  });
  test("a persisted cursor wins over the Look-back Date", async () => {
    const cursor = "2026-05-01T00:00:00.000Z";
    const queries = mockAlerts([oldAlert]);
    await run(createStore({ lastPolledAt: cursor }), {
      lookBackDate: "2026-02-01T00:00:00.000Z",
    });
    expect(queries).toEqual([`createdAt > ${new Date(cursor).getTime()}`]);
  });
  test("the second recurrence queries from the first poll's now and does not re-emit", async () => {
    const store = createStore();
    const firstQueries = mockAlerts([oldAlert]);
    const first = await run(store, {
      lookBackDate: "2026-02-01T00:00:00.000Z",
    });
    expect(first?.payload.body.data).toEqual([oldAlert]);
    expect(firstQueries).toHaveLength(1);
    nock.cleanAll();
    vi.setSystemTime(new Date(NOW2));
    const secondQueries = mockAlerts([oldAlert, lateAlert]);
    const second = await run(store, {
      lookBackDate: "2026-02-01T00:00:00.000Z",
    });
    expect(secondQueries).toEqual([`createdAt > ${new Date(NOW1).getTime()}`]);
    expect(second?.payload.body.data).toEqual([lateAlert]);
    expect(store.getState()).toEqual({ lastPolledAt: NOW2 });
  });
});
