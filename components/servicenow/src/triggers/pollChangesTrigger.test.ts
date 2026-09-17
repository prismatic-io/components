import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, describe, expect, test } from "vitest";
import { DEFAULT_BATCH_SIZE } from "../constants";
import type { ChangeRecord, PollingRecordChange, PollingState } from "../types";
import { resolvePollingRecordChanges } from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const BASE = "https://instance.service-now.com";
interface MockContext {
  logger: Record<string, () => void>;
  polling: {
    getState: () => unknown;
    setState: (s: PollingState) => void;
  };
  getCurrentState: () => PollingState;
}
const createPollingContext = (
  state: Partial<PollingState> = {},
): MockContext => {
  let currentState: PollingState = state as PollingState;
  return {
    logger: {
      debug: () => {},
      info: () => {},
      warn: () => {},
      error: () => {},
    },
    polling: {
      getState: () => currentState,
      setState: (s: PollingState) => {
        currentState = s;
      },
    },
    getCurrentState: () => currentState,
  };
};
describe("pollChangesTrigger batching", () => {
  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({
      batchSize: DEFAULT_BATCH_SIZE,
    });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });
  const created: ChangeRecord = {
    sys_created_on: "2026-01-01T00:00:00Z",
    sys_updated_on: "2026-01-01T00:00:00Z",
    sys_id: "abc123",
  };
  const updated: ChangeRecord = {
    sys_created_on: "2025-06-01T00:00:00Z",
    sys_updated_on: "2026-01-02T00:00:00Z",
    sys_id: "def456",
  };
  test("resolvePollingRecordChanges tags every record with how it changed", () => {
    const result: PollingRecordChange[] = resolvePollingRecordChanges({
      created: [created],
      updated: [updated],
    });
    expect(result).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolvePollingRecordChanges returns [] for empty or undefined changes", () => {
    expect(resolvePollingRecordChanges({})).toEqual([]);
    expect(resolvePollingRecordChanges(undefined)).toEqual([]);
  });
  test("resolvePollingRecordChanges tolerates an absent array", () => {
    expect(resolvePollingRecordChanges({ created: [created] })).toEqual([
      { changeType: "created", record: created },
    ]);
    expect(resolvePollingRecordChanges({ updated: [updated] })).toEqual([
      { changeType: "updated", record: updated },
    ]);
  });
  test("resolveItems flattens the payload shape perform actually returns", () => {
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { created: [created], updated: [updated] } },
    };
    const result = pollChangesTrigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload },
    );
    expect(result).toEqual([
      { changeType: "created", record: created },
      { changeType: "updated", record: updated },
    ]);
  });
});
describe("pollChangesTrigger perform", () => {
  afterEach(() => nock.cleanAll());
  const tableName = "incident";
  const apiVersion = "v2";
  const defaultParams = {
    connection: {
      key: "authorizationCode",
      token: { access_token: "test-token" },
      fields: {},
    },
    instanceUrlInput: BASE,
    apiVersionInput: apiVersion,
    tableNameInput: tableName,
    showNewRecords: true,
    showUpdatedRecords: true,
    lookBackDate: undefined as string | undefined,
  };
  const invoke = (ctx: MockContext, params = defaultParams) =>
    pollChangesTrigger.perform(
      ctx as unknown as Parameters<typeof pollChangesTrigger.perform>[0],
      { body: {} } as unknown as Parameters<
        typeof pollChangesTrigger.perform
      >[1],
      params as unknown as Parameters<typeof pollChangesTrigger.perform>[2],
    );
  test("cursor/state advance: setState called with new timestamp after poll", async () => {
    const lastPolledAt = "2025-05-01T00:00:00Z";
    const record: ChangeRecord = {
      sys_id: "rec_1",
      sys_created_on: "2025-05-15T10:00:00Z",
      sys_updated_on: "2025-05-15T10:00:00Z",
    };
    nock(BASE)
      .get(`/api/now/${apiVersion}/table/${tableName}`)
      .query(true)
      .reply(200, { result: [record] });
    const ctx = createPollingContext({ lastPolledAt });
    const before = new Date().toISOString();
    await invoke(ctx);
    const after = new Date().toISOString();
    const { lastPolledAt: savedAt } = ctx.getCurrentState();
    expect(savedAt).toBeDefined();
    const timestamp = savedAt ?? "";
    expect(timestamp).not.toBe("");
    expect(timestamp >= before).toBe(true);
    expect(timestamp <= after).toBe(true);
  });
  test("created-vs-updated classification: records with sys_created_on > lastPolledAt are created, others are updated", async () => {
    const lastPolledAt = "2025-05-01T00:00:00Z";
    const createdRecord: ChangeRecord = {
      sys_id: "new_1",
      sys_created_on: "2025-05-15T10:00:00Z",
      sys_updated_on: "2025-05-15T10:00:00Z",
    };
    const updatedRecord: ChangeRecord = {
      sys_id: "upd_1",
      sys_created_on: "2025-01-01T10:00:00Z",
      sys_updated_on: "2025-05-15T12:00:00Z",
    };
    nock(BASE)
      .get(`/api/now/${apiVersion}/table/${tableName}`)
      .query(true)
      .reply(200, { result: [createdRecord, updatedRecord] });
    const ctx = createPollingContext({ lastPolledAt });
    const result = await invoke(ctx);
    const data = result.payload.body.data as {
      created: ChangeRecord[];
      updated: ChangeRecord[];
    };
    expect(data.created).toHaveLength(1);
    expect(data.created[0].sys_id).toBe("new_1");
    expect(data.updated).toHaveLength(1);
    expect(data.updated[0].sys_id).toBe("upd_1");
    expect(
      (
        result as unknown as {
          polledNoChanges: boolean;
        }
      ).polledNoChanges,
    ).toBe(false);
  });
  test("polledNoChanges: true when no records returned", async () => {
    nock(BASE)
      .get(`/api/now/${apiVersion}/table/${tableName}`)
      .query(true)
      .reply(200, { result: [] });
    const ctx = createPollingContext({ lastPolledAt: "2025-05-01T00:00:00Z" });
    const result = await invoke(ctx);
    const data = result.payload.body.data as {
      created: ChangeRecord[];
      updated: ChangeRecord[];
    };
    expect(data.created).toHaveLength(0);
    expect(data.updated).toHaveLength(0);
    expect(
      (
        result as unknown as {
          polledNoChanges: boolean;
        }
      ).polledNoChanges,
    ).toBe(true);
  });
  const cleanedLookBackDate = "2024-01-01T00:00:00.000Z";
  test("the initial sync seeds from the Look-back Date on an inclusive boundary", async () => {
    const onBoundary: ChangeRecord = {
      sys_id: "rec_on_boundary",
      sys_created_on: cleanedLookBackDate,
      sys_updated_on: cleanedLookBackDate,
    };
    const scope = nock(BASE)
      .get(`/api/now/${apiVersion}/table/${tableName}`)
      .query((query) =>
        (query.sysparm_query as string).includes(
          `sys_updated_on>=${cleanedLookBackDate}`,
        ),
      )
      .reply(200, { result: [onBoundary] });
    const ctx = createPollingContext({});
    const result = await invoke(ctx, {
      ...defaultParams,
      lookBackDate: cleanedLookBackDate,
    });
    expect(scope.isDone()).toBe(true);
    const data = result.payload.body.data as {
      created: ChangeRecord[];
      updated: ChangeRecord[];
    };
    expect(data.created).toHaveLength(1);
    expect(data.created[0].sys_id).toBe("rec_on_boundary");
  });
  test("the initial sync ignores the record filters", async () => {
    const newRecord: ChangeRecord = {
      sys_id: "rec_new",
      sys_created_on: "2024-06-01T10:00:00Z",
      sys_updated_on: "2024-06-01T10:00:00Z",
    };
    const updatedRecord: ChangeRecord = {
      sys_id: "rec_updated",
      sys_created_on: "2023-06-01T10:00:00Z",
      sys_updated_on: "2024-06-01T10:00:00Z",
    };
    const scope = nock(BASE)
      .get(`/api/now/${apiVersion}/table/${tableName}`)
      .query(() => true)
      .reply(200, { result: [newRecord, updatedRecord] });
    const ctx = createPollingContext({});
    const result = await invoke(ctx, {
      ...defaultParams,
      lookBackDate: cleanedLookBackDate,
      showNewRecords: false,
      showUpdatedRecords: false,
    });
    expect(scope.isDone()).toBe(true);
    const data = result.payload.body.data as {
      created: ChangeRecord[];
      updated: ChangeRecord[];
    };
    expect(data.created.map((r) => r.sys_id)).toEqual(["rec_new"]);
    expect(data.updated.map((r) => r.sys_id)).toEqual(["rec_updated"]);
  });
  test("a later recurrence keeps its exclusive boundary and honors the filters", async () => {
    const lastPolledAt = "2024-06-01T00:00:00.000Z";
    const record: ChangeRecord = {
      sys_id: "rec_after",
      sys_created_on: "2024-06-02T10:00:00Z",
      sys_updated_on: "2024-06-02T10:00:00Z",
    };
    const scope = nock(BASE)
      .get(`/api/now/${apiVersion}/table/${tableName}`)
      .query((query) => {
        const q = query.sysparm_query as string;
        return (
          q.includes(`sys_updated_on>${lastPolledAt}`) &&
          !q.includes(`sys_updated_on>=`)
        );
      })
      .reply(200, { result: [record] });
    const ctx = createPollingContext({ lastPolledAt });
    const result = await invoke(ctx, {
      ...defaultParams,
      lookBackDate: cleanedLookBackDate,
      showNewRecords: false,
    });
    expect(scope.isDone()).toBe(true);
    const data = result.payload.body.data as {
      created: ChangeRecord[];
      updated: ChangeRecord[];
    };
    expect(data.created).toHaveLength(0);
  });
});
