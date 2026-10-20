import type { BatchInfo } from "@prismatic-io/spectral";
import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import { createGitlabClient } from "../client";
import { MAX_BATCHED_PAYLOAD_BYTES, MAX_UNBATCHED_RECORDS } from "../constants";
import type {
  GitlabRecord,
  PollingChangesObject,
  PollingState,
} from "../types";
import { pollChangesTrigger } from "./pollChangesTrigger";
vi.mock("../client", () => ({ createGitlabClient: vi.fn() }));
let serverRecords: GitlabRecord[] = [];
const fakeClient = {
  get: vi.fn(
    async (
      _url: string,
      {
        params,
      }: {
        params: Record<string, unknown>;
      },
    ) => {
      const since = new Date(String(params.updated_after)).getTime();
      const data = serverRecords
        .filter((r) => new Date(r.updated_at as string).getTime() >= since)
        .reverse();
      return { data, headers: {} };
    },
  ),
};
const contextWith = (initial: PollingState | undefined, batch?: BatchInfo) => {
  let state = initial;
  return {
    context: {
      debug: { enabled: false },
      logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
      polling: {
        getState: () => state,
        setState: (next: PollingState) => {
          state = next;
        },
      },
      ...(batch ? { batch } : {}),
    },
    getState: () => state,
  };
};
const poll = async (context: unknown, lookBackDate = "") => {
  const result = await pollChangesTrigger.perform(
    context as never,
    defaultTriggerPayload(),
    {
      connection: {} as never,
      project: "278964",
      pollResourceType: "issues",
      lookBackDate,
      showNewRecords: true,
      showUpdatedRecords: true,
    } as never,
  );
  return result.payload.body.data as Required<PollingChangesObject>;
};
beforeEach(() => {
  vi.mocked(createGitlabClient).mockReturnValue(fakeClient as never);
  serverRecords = [];
});
afterEach(() => vi.useRealTimers());
const ids = (data: Required<PollingChangesObject>) =>
  [...data.created, ...data.updated].map((r) => r.id);
test("cursor comes from GitLab's updated_at, not Prismatic's clock, so a lagging GitLab clock loses nothing", async () => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date("2026-09-28T12:10:00.000Z"));
  const { context, getState } = contextWith({
    lastPolledAt: "2026-09-28T12:00:00.000Z",
  });
  serverRecords = [
    {
      id: 2,
      created_at: "2026-09-28T11:00:00.000Z",
      updated_at: "2026-09-28T12:01:00.000Z",
    },
  ];
  expect(ids(await poll(context))).toEqual([2]);
  expect(getState()?.lastPolledAt).toBe("2026-09-28T12:01:00.000Z");
  serverRecords.push({
    id: 3,
    created_at: "2026-09-28T11:00:00.000Z",
    updated_at: "2026-09-28T12:05:00.000Z",
  });
  expect(ids(await poll(contextWith(getState()).context))).toEqual([3]);
});
test("initial sync includes a record updated exactly at the Look-back Date instant", async () => {
  const { context } = contextWith(undefined);
  serverRecords = [
    {
      id: 7,
      created_at: "2025-12-01T00:00:00.000Z",
      updated_at: "2026-01-01T00:00:00.000Z",
    },
  ];
  expect(ids(await poll(context, "2026-01-01"))).toEqual([7]);
});
test("batched poll clamps to 500 and resumes on the next recurrence", async () => {
  serverRecords = Array.from({ length: 600 }, (_, i) => ({
    id: i + 1,
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: new Date(Date.UTC(2026, 8, 1, 0, 0, i)).toISOString(),
  }));
  const { context, getState } = contextWith(
    { lastPolledAt: "2026-08-31T00:00:00.000Z" },
    { enabled: true, batchSize: 50 },
  );
  const first = await poll(context);
  expect(first.updated).toHaveLength(500);
  const second = await poll(
    contextWith(getState(), { enabled: true, batchSize: 50 }).context,
  );
  expect(second.updated.map((r) => r.id)).toEqual(
    Array.from({ length: 100 }, (_, i) => i + 501),
  );
});
test("batched poll keeps the serialized payload under the byte cap and resumes without loss", async () => {
  serverRecords = Array.from({ length: 600 }, (_, i) => ({
    id: i + 1,
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: new Date(Date.UTC(2026, 8, 1, 0, 0, i)).toISOString(),
    description: "x".repeat(10000),
  }));
  const batch = { enabled: true, batchSize: 50 };
  const { context, getState } = contextWith(
    { lastPolledAt: "2026-08-31T00:00:00.000Z" },
    batch,
  );
  const first = await poll(context);
  expect(Buffer.byteLength(JSON.stringify(first))).toBeLessThanOrEqual(
    MAX_BATCHED_PAYLOAD_BYTES,
  );
  expect(first.updated.length).toBeLessThan(500);
  const firstIds = ids(first);
  expect(getState()?.lastPolledAt).toBe(
    first.updated[first.updated.length - 1].updated_at,
  );
  const second = await poll(contextWith(getState(), batch).context);
  expect(ids(second)[0]).toBe(firstIds[firstIds.length - 1] + 1);
});
test("unbatched poll caps a Look-back Date backfill and drains the rest on later recurrences", async () => {
  serverRecords = Array.from({ length: 1500 }, (_, i) => ({
    id: i + 1,
    created_at: "2025-01-01T00:00:00.000Z",
    updated_at: new Date(Date.UTC(2026, 0, 2, 0, 0, i)).toISOString(),
  }));
  const { context, getState } = contextWith(undefined);
  const first = await poll(context, "2026-01-01");
  expect(ids(first)).toHaveLength(MAX_UNBATCHED_RECORDS);
  expect(getState()?.isBackfill).toBe(true);
  const next = contextWith(getState());
  const second = await poll(next.context, "2026-01-01");
  expect(ids(second)).toEqual(
    Array.from({ length: 500 }, (_, i) => i + MAX_UNBATCHED_RECORDS + 1),
  );
  expect(next.getState()?.isBackfill).toBeUndefined();
});
test("New and Updated Records is opt-in batchable with a default batch size", () => {
  expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
  expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
  expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
    Function,
  );
});
test("resolveItems flattens the payload shape perform actually returns", () => {
  const created: GitlabRecord = {
    id: 11,
    created_at: "2026-09-28T12:00:00.000Z",
    updated_at: "2026-09-28T12:00:00.000Z",
  };
  const payload = {
    ...defaultTriggerPayload(),
    body: { data: { created: [created] } },
  };
  expect(
    pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
      payload,
    }),
  ).toEqual([{ changeType: "created", record: created }]);
});
const pollWith = (
  context: unknown,
  inputs: {
    showNewRecords: boolean;
    showUpdatedRecords: boolean;
  },
  lookBackDate = "",
) =>
  pollChangesTrigger.perform(context as never, defaultTriggerPayload(), {
    connection: {} as never,
    project: "278964",
    pollResourceType: "issues",
    lookBackDate,
    ...inputs,
  } as never);
describe("Show New Records and Show Updated Records", () => {
  const records: GitlabRecord[] = [
    {
      id: 1,
      created_at: "2026-09-28T12:01:00.000Z",
      updated_at: "2026-09-28T12:01:00.000Z",
    },
    {
      id: 2,
      created_at: "2026-01-01T00:00:00.000Z",
      updated_at: "2026-09-28T12:02:00.000Z",
    },
  ];
  test("leaves out updated records when Show Updated Records is off and still advances the cursor", async () => {
    serverRecords = records;
    const { context, getState } = contextWith({
      lastPolledAt: "2026-09-28T12:00:00.000Z",
    });
    const result = await pollWith(context, {
      showNewRecords: true,
      showUpdatedRecords: false,
    });
    const data = result.payload.body.data as Required<PollingChangesObject>;
    expect(data.created.map((r) => r.id)).toEqual([1]);
    expect(data.updated).toEqual([]);
    expect(getState()?.lastPolledAt).toBe("2026-09-28T12:02:00.000Z");
  });
  test("a Look-back Date backfill delivers both kinds whatever the toggles say", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date("2026-09-29T00:00:00.000Z"));
    serverRecords = records;
    const { context } = contextWith(undefined);
    const result = await pollWith(
      context,
      { showNewRecords: false, showUpdatedRecords: false },
      "2026-09-28",
    );
    const data = result.payload.body.data as Required<PollingChangesObject>;
    expect(data.created.map((r) => r.id)).toEqual([1]);
    expect(data.updated.map((r) => r.id)).toEqual([2]);
    expect(result.polledNoChanges).toBe(false);
  });
  test("an empty poll reports polledNoChanges and keeps the stored cursor", async () => {
    const { context, getState } = contextWith({
      lastPolledAt: "2026-09-28T12:00:00.000Z",
    });
    const result = await pollWith(context, {
      showNewRecords: true,
      showUpdatedRecords: true,
    });
    expect(result.polledNoChanges).toBe(true);
    expect(getState()?.lastPolledAt).toBe("2026-09-28T12:00:00.000Z");
  });
});
