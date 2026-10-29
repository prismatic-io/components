const { fetchRecordsMock } = vi.hoisted(() => ({ fetchRecordsMock: vi.fn() }));

vi.mock("../util", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../util")>()),
  fetchRecordsForResource: fetchRecordsMock,
}));

import type { ActionContext } from "@prismatic-io/spectral";
import {
  defaultTriggerPayload,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import { getJobResponse, listJobsResponse } from "../examplePayloads";
import type {
  BynderChangesObject,
  BynderRecord,
  PollingState,
} from "../types/triggers";
import { pollChangesTrigger } from "./pollChangesTrigger";

const NOW = "2026-06-10T00:00:00.000Z";
const LAST_POLL = "2026-06-01T00:00:00.000Z";
const LOOK_BACK = "2026-05-01T00:00:00.000Z";

const params = {
  connection: {},
  resourceType: "jobs",
  showNewRecords: true,
  showUpdatedRecords: true,
  lookBackDate: "",
};

const newJob: BynderRecord = {
  id: "job-new",
  dateCreated: "2026-06-05T00:00:00+00:00",
  dateModified: "2026-06-05T00:00:00+00:00",
};
const editedJob: BynderRecord = {
  id: "job-edited",
  dateCreated: "2026-01-01T00:00:00+00:00",
  dateModified: "2026-06-06T00:00:00+00:00",
};
const onLookBackJob: BynderRecord = {
  id: "job-on-look-back",
  dateCreated: LOOK_BACK,
  dateModified: LOOK_BACK,
};
const staleJob: BynderRecord = {
  id: "job-stale",
  dateCreated: "2025-01-01T00:00:00+00:00",
  dateModified: "2025-02-01T00:00:00+00:00",
};

type PollResult = {
  payload: { body: { data: BynderChangesObject } };
  polledNoChanges: boolean;
};

const createPollingContext = (initialState: PollingState = {}) => {
  let store: PollingState = initialState;
  const polling = {
    getState: () => store,
    setState: (state: PollingState) => {
      store = state;
    },
  };
  return {
    context: {
      polling,
      debug: { enabled: false },
    } as unknown as Partial<ActionContext>,
    getStore: () => store,
  };
};

const poll = async (
  context: Partial<ActionContext>,
  overrides: Partial<typeof params> = {},
): Promise<PollResult> => {
  const { result } = await invokeTrigger(
    pollChangesTrigger as never,
    context,
    undefined,
    { ...params, ...overrides } as never,
  );
  return result as unknown as PollResult;
};

const ids = (records: BynderRecord[]) => records.map((record) => record.id);

const chunk = <T>(items: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    chunks.push(items.slice(i, i + size));
  }
  return chunks;
};

describe("pollChangesTrigger", () => {
  beforeEach(() => {
    fetchRecordsMock.mockReset();
    vi.useFakeTimers({ toFake: ["Date"] });
    vi.setSystemTime(new Date(NOW));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  test("New and Updated Records is opt-in batchable with a default batch size", () => {
    expect(pollChangesTrigger.triggerResolverSupport).toBe("valid");
    expect(pollChangesTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(pollChangesTrigger.triggerResolver?.resolveItems).toBeInstanceOf(
      Function,
    );
  });

  test("lists the optional Look-back Date directly below the required inputs", () => {
    expect(Object.keys(pollChangesTrigger.inputs ?? {})).toEqual([
      "connection",
      "resourceType",
      "showNewRecords",
      "showUpdatedRecords",
      "lookBackDate",
    ]);
  });

  test("resolveItems flattens an example payload into batchable items", () => {
    const data: BynderChangesObject = {
      created: [listJobsResponse[0]],
      updated: [getJobResponse],
    };
    const payload = { ...defaultTriggerPayload(), body: { data } };

    const items =
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }) ?? [];

    expect(items).toEqual([
      { changeType: "created", record: listJobsResponse[0] },
      { changeType: "updated", record: getJobResponse },
    ]);
    const batchSize = pollChangesTrigger.batchConfig?.batchSize ?? 0;
    expect(chunk(items, batchSize)).toEqual([items]);
  });

  test("resolveItems flattens the payload shape perform actually returns", async () => {
    fetchRecordsMock.mockResolvedValue([newJob, editedJob, staleJob]);
    const { context } = createPollingContext({ lastPolledAt: LAST_POLL });
    const result = await poll(context);

    const payload = {
      ...defaultTriggerPayload(),
      body: { data: result.payload.body.data },
    };
    expect(
      pollChangesTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([
      { changeType: "created", record: newJob },
      { changeType: "updated", record: editedJob },
    ]);
  });

  test("emits records changed after the cursor and advances it", async () => {
    fetchRecordsMock.mockResolvedValue([newJob, editedJob, staleJob]);
    const { context, getStore } = createPollingContext({
      lastPolledAt: LAST_POLL,
    });

    const result = await poll(context);

    expect(ids(result.payload.body.data.created)).toEqual(["job-new"]);
    expect(ids(result.payload.body.data.updated)).toEqual(["job-edited"]);
    expect(result.polledNoChanges).toBe(false);
    expect(getStore()).toEqual({ lastPolledAt: NOW });
  });

  test("applies the visibility filters on an incremental recurrence", async () => {
    fetchRecordsMock.mockResolvedValue([newJob, editedJob]);
    const { context } = createPollingContext({ lastPolledAt: LAST_POLL });

    const result = await poll(context, { showUpdatedRecords: false });

    expect(ids(result.payload.body.data.created)).toEqual(["job-new"]);
    expect(result.payload.body.data.updated).toEqual([]);
  });

  test("a first poll without a Look-back Date emits nothing and starts the cursor", async () => {
    fetchRecordsMock.mockResolvedValue([newJob, editedJob, staleJob]);
    const { context, getStore } = createPollingContext();

    const result = await poll(context);

    expect(result.payload.body.data).toEqual({ created: [], updated: [] });
    expect(result.polledNoChanges).toBe(true);
    expect(getStore()).toEqual({ lastPolledAt: NOW });
  });

  test("seeds from the Look-back Date once, inclusively and ignoring the visibility filters", async () => {
    fetchRecordsMock.mockResolvedValue([
      newJob,
      editedJob,
      onLookBackJob,
      staleJob,
    ]);
    const { context, getStore } = createPollingContext();

    const seed = await poll(context, {
      lookBackDate: LOOK_BACK,
      showNewRecords: false,
      showUpdatedRecords: false,
    });

    expect(ids(seed.payload.body.data.created)).toEqual([
      "job-new",
      "job-on-look-back",
    ]);
    expect(ids(seed.payload.body.data.updated)).toEqual(["job-edited"]);
    expect(seed.polledNoChanges).toBe(false);
    expect(getStore()).toEqual({ lastPolledAt: NOW });

    const next = await poll(context, { lookBackDate: LOOK_BACK });

    expect(next.payload.body.data).toEqual({ created: [], updated: [] });
    expect(next.polledNoChanges).toBe(true);
  });

  test("seeds orders by creation date only", async () => {
    const order: BynderRecord = {
      id: "order-1",
      date_created: "2026-05-02T00:00:00+00:00",
    };
    const oldOrder: BynderRecord = {
      id: "order-old",
      date_created: "2026-04-30T00:00:00+00:00",
    };
    fetchRecordsMock.mockResolvedValue([order, oldOrder]);
    const { context } = createPollingContext();

    const seed = await poll(context, {
      resourceType: "orders",
      lookBackDate: LOOK_BACK,
    });

    expect(ids(seed.payload.body.data.created)).toEqual(["order-1"]);
    expect(seed.payload.body.data.updated).toEqual([]);
  });

  test("seeds collections from their non-ISO modified date", async () => {
    const collection: BynderRecord = {
      id: "collection-1",
      dateCreated: "October, 30 2014 13:54:00 +0000",
      dateModified: "May, 08 2026 14:17:37 +0000",
    };
    fetchRecordsMock.mockResolvedValue([collection]);
    const { context } = createPollingContext();

    const seed = await poll(context, {
      resourceType: "collections",
      lookBackDate: LOOK_BACK,
    });

    expect(seed.payload.body.data.created).toEqual([]);
    expect(ids(seed.payload.body.data.updated)).toEqual(["collection-1"]);
  });
});
