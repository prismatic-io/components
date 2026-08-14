import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { pdqConnection } from "../connections";
import { listDevicesExamplePayload } from "../examplePayloads/devices";
import type { PollableRecord, PollingState } from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
const BASE = "https://app.pdq.com";
const conn = createConnection(pdqConnection, { apiKey: "test-key" });
const deviceRecord = listDevicesExamplePayload.data.data[0];
const makePollingContext = (seed: PollingState = {}) => {
  const store: PollingState = { ...seed };
  const cursors: string[] = [];
  const context = {
    polling: {
      getState: () => store,
      setState: (state: PollingState) => {
        if (typeof state.lastPolledAt === "string") {
          cursors.push(state.lastPolledAt);
        }
        Object.assign(store, state);
      },
    },
  } as any;
  return { context, store, cursors };
};
const created = (result: unknown): PollableRecord[] =>
  ((
    result as {
      payload: {
        body: {
          data: {
            created: PollableRecord[];
          };
        };
      };
    }
  ).payload.body.data.created ?? []) as PollableRecord[];
const polledNoChanges = (result: unknown): boolean | undefined =>
  (
    result as {
      polledNoChanges?: boolean;
    }
  ).polledNoChanges;
const params = { connection: conn, pollResourceType: "Devices" };
type PollingTestContext = ReturnType<typeof makePollingContext>["context"];
const invokePollingTrigger = (context: PollingTestContext) =>
  invokeTrigger(
    pollChangesTrigger as unknown as Parameters<typeof invokeTrigger>[0],
    context,
    undefined, // biome-ignore lint/suspicious/noExplicitAny: params are supplied post-clean
    params as any,
  );
describe("pollChangesTrigger", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());
  describe("cursor advance and dedup across sequential polls", () => {
    const { context, store, cursors } = makePollingContext();
    test("first poll bootstraps the cursor, emits nothing and calls no API", async () => {
      const { result } = await invokePollingTrigger(context);
      expect(created(result)).toEqual([]);
      expect(polledNoChanges(result)).toBe(true);
      expect(cursors).toHaveLength(1);
      expect(Number.isNaN(Date.parse(cursors[0]))).toBe(false);
      expect(store.lastPolledAt).toBe(cursors[0]);
      expect(nock.pendingMocks()).toHaveLength(0);
    });
    test("second poll over the same store fetches and emits records newer than the cursor", async () => {
      const newRecord = {
        ...deviceRecord,
        insertedAt: "2099-01-01T00:00:00.000000Z",
      };
      nock(BASE)
        .get("/v1/api/devices")
        .query({ sort: "insertedAtDesc", pageSize: "100", page: "1" })
        .matchHeader("authorization", "Bearer test-key")
        .reply(200, { data: [newRecord] });
      nock(BASE)
        .get("/v1/api/devices")
        .query({ sort: "insertedAtDesc", pageSize: "100", page: "2" })
        .reply(200, { data: [] });
      const { result } = await invokePollingTrigger(context);
      expect(created(result)).toEqual([newRecord]);
      expect(polledNoChanges(result)).toBe(false);
      expect(cursors).toHaveLength(2);
      expect(Date.parse(cursors[1])).toBeGreaterThanOrEqual(
        Date.parse(cursors[0]),
      );
      expect(store.lastPolledAt).toBe(cursors[1]);
      expect(nock.pendingMocks()).toHaveLength(0);
    });
    test("third poll emits nothing for a record at or before the stored cursor", async () => {
      nock(BASE)
        .get("/v1/api/devices")
        .query({ sort: "insertedAtDesc", pageSize: "100", page: "1" })
        .reply(200, { data: [deviceRecord] });
      const { result } = await invokePollingTrigger(context);
      expect(created(result)).toEqual([]);
      expect(polledNoChanges(result)).toBe(true);
      expect(nock.pendingMocks()).toHaveLength(0);
    });
  });
  describe("multi-page early break", () => {
    test("stops paging once a page ends at or before the cursor", async () => {
      const cursor = "2026-01-01T00:00:00.000Z";
      const at = (id: string, insertedAt: string) => ({
        ...deviceRecord,
        id,
        insertedAt,
      });
      const pageOne = [
        at("dvc_p1a", "2026-06-02T00:00:00.000000Z"),
        at("dvc_p1b", "2026-06-01T00:00:00.000000Z"),
      ];
      const pageTwo = [
        at("dvc_p2a", "2026-02-01T00:00:00.000000Z"),
        at("dvc_p2b", "2025-12-01T00:00:00.000000Z"),
      ];
      nock(BASE)
        .get("/v1/api/devices")
        .query({ sort: "insertedAtDesc", pageSize: "100", page: "1" })
        .reply(200, { data: pageOne });
      nock(BASE)
        .get("/v1/api/devices")
        .query({ sort: "insertedAtDesc", pageSize: "100", page: "2" })
        .reply(200, { data: pageTwo });
      const { context } = makePollingContext({ lastPolledAt: cursor });
      const { result } = await invokePollingTrigger(context);
      expect(nock.pendingMocks()).toHaveLength(0);
      expect(created(result).map((record) => record.id)).toEqual([
        "dvc_p1a",
        "dvc_p1b",
        "dvc_p2a",
      ]);
      expect(polledNoChanges(result)).toBe(false);
    });
  });
});
