import { createConnection } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../connections";
import {
  contentFragmentChangesExamplePayload,
  getContentFragmentExamplePayload,
  searchContentFragmentsExamplePayload,
} from "../examplePayloads";
import type { AemChangeItem, PollingState, PollWindowCursor } from "../types";
import { resolveAemChangeItems } from "../utils";
import { contentFragmentChanges as trigger } from "./contentFragmentChanges";

const exampleContentFragment = getContentFragmentExamplePayload.data;

type PerformContext = Parameters<typeof trigger.perform>[0];
type PerformPayload = Parameters<typeof trigger.perform>[1];

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const BASE = `https://${AEM_HOST}`;
const SEARCH_PATH = "/adobe/sites/cf/fragments/search";
const NOW = "2026-10-05T12:00:00.000Z";
const CLOCK = "2026-10-05T12:02:00.000Z";
const LOOK_BACK = "2026-09-01T00:00:00.000Z";
const PAGE_CURSOR = searchContentFragmentsExamplePayload.data.cursor;

const connection = createConnection(
  aemOAuthServerToServer,
  {
    aemHost: AEM_HOST,
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
    scopes: "openid, AdobeID",
    tokenUrl: "https://ims-na1.adobelogin.com/ims/token/v3",
  },
  { access_token: "test-access-token" },
);

const secondFragment = {
  ...exampleContentFragment,
  id: "second-fragment",
  modified: { at: "2026-10-01T08:00:00.000Z", by: "jdoe" },
};

const params = (lookBackDate: string) => ({
  connection,
  lookBackDate,
  path: undefined,
  statuses: ["PUBLISHED", "MODIFIED"],
  modelIds: [] as string[],
  tags: [] as string[],
  locales: [] as string[],
  publishBaseUrl: "https://www.example.com",
});

let store: PollingState;

const context = (batching: boolean) =>
  ({
    polling: {
      getState: () => store,
      setState: (next: PollingState) => {
        store = next;
      },
    },
    batch: { enabled: batching },
    debug: { enabled: false },
    logger: { debug: vi.fn(), info: vi.fn() },
  }) as unknown as PerformContext;

const payload = (paginationState?: PollWindowCursor) =>
  ({
    ...contentFragmentChangesExamplePayload.payload,
    body: { data: {} },
    paginationState,
  }) as unknown as PerformPayload;

const captureSearch =
  (sink: Record<string, string>[]) => (query: Record<string, unknown>) => {
    sink.push(query as Record<string, string>);
    return true;
  };

beforeAll(() => nock.disableNetConnect());
beforeEach(() => {
  store = {};
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(CLOCK));
});
afterEach(() => {
  nock.cleanAll();
  vi.useRealTimers();
});
afterAll(() => nock.enableNetConnect());

describe("contentFragmentChanges batching declaration", () => {
  test("declares opt-in batching with a batch size of 50 and a resolver", () => {
    expect(trigger.triggerResolverSupport).toBe("valid");
    expect(trigger.batchConfig).toEqual({ batchSize: 50 });
    expect(trigger.triggerResolver?.resolveItems).toBeInstanceOf(Function);
    expect(trigger.triggerResolver?.getNextPaginationState).toBeInstanceOf(
      Function,
    );
  });

  test("offers the Look-back Date directly below the connection", () => {
    expect(Object.keys(trigger.inputs ?? {}).slice(0, 2)).toEqual([
      "connection",
      "lookBackDate",
    ]);
  });
});

describe("resolveAemChangeItems", () => {
  const item = contentFragmentChangesExamplePayload.payload.body.data
    .items[0] as AemChangeItem;

  test("returns the tagged items of a realistic payload", () => {
    expect(resolveAemChangeItems({ items: [item] })).toEqual([item]);
  });

  test("tolerates an absent envelope and a missing items array", () => {
    expect(resolveAemChangeItems(undefined)).toEqual([]);
    expect(resolveAemChangeItems({})).toEqual([]);
  });
});

describe("triggerResolver.resolveItems", () => {
  test("flattens the example trigger payload into its items", () => {
    const items = trigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: contentFragmentChangesExamplePayload.payload } as never,
    );
    expect(items).toEqual(
      contentFragmentChangesExamplePayload.payload.body.data.items,
    );
    const batchSize = trigger.batchConfig?.batchSize ?? 1;
    const chunks: unknown[][] = [];
    for (let i = 0; i < (items ?? []).length; i += batchSize) {
      chunks.push((items ?? []).slice(i, i + batchSize));
    }
    expect(chunks).toHaveLength(1);
  });
});

describe("contentFragmentChanges perform", () => {
  test("drains a window across platform-driven rounds when batching is on", async () => {
    const queries: Record<string, string>[] = [];
    nock(BASE)
      .get(SEARCH_PATH)
      .query(captureSearch(queries))
      .reply(200, searchContentFragmentsExamplePayload.data);

    const round1 = await trigger.perform(
      context(true),
      payload(),
      params(LOOK_BACK),
    );
    const cursor: PollWindowCursor = {
      windowStart: LOOK_BACK,
      windowEnd: NOW,
      cursor: PAGE_CURSOR,
    };
    expect(round1.payload.paginationState).toEqual(cursor);
    expect(store).toEqual({ cursor });
    expect(round1.polledNoChanges).toBe(false);
    expect(nock.isDone()).toBe(true);
    expect(JSON.parse(queries[0].query)).toEqual({
      filter: {
        status: ["PUBLISHED", "MODIFIED"],
        modifiedOrCreated: {
          after: "2026-08-31T23:59:59.999Z",
          before: "2026-10-05T12:00:00.001Z",
        },
      },
      sort: [{ on: "modifiedOrCreated", order: "ASC" }],
    });
    expect(queries[0].limit).toBe("50");
    expect(queries[0].cursor).toBeUndefined();
    const round1Items = trigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: round1.payload } as never,
    ) as AemChangeItem[];
    expect(
      round1Items.map((item) => [item.changeType, item.record.id]),
    ).toEqual([["initialSync", exampleContentFragment.id]]);
    expect(round1Items[0].record.url).toBe(
      `https://www.example.com${exampleContentFragment.path}`,
    );
    expect(
      trigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: round1.payload } as never,
      ),
    ).toEqual(cursor);

    vi.setSystemTime(new Date("2026-10-05T12:05:00.000Z"));
    nock(BASE)
      .get(SEARCH_PATH)
      .query(captureSearch(queries))
      .reply(200, { items: [secondFragment] });
    const round2 = await trigger.perform(
      context(true),
      payload(round1.payload.paginationState as PollWindowCursor),
      params(LOOK_BACK),
    );
    expect(queries[1].cursor).toBe(PAGE_CURSOR);
    expect(round2.payload.paginationState).toBeUndefined();
    expect(store).toEqual({ lastPolledAt: NOW });
    expect(round2.polledNoChanges).toBe(false);
    expect(
      trigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: round2.payload } as never,
      ),
    ).toBeNull();
    expect(
      (round2.payload.body.data as { items: AemChangeItem[] }).items.map(
        (item) => item.record.id,
      ),
    ).toEqual(["second-fragment"]);
  });

  test("reports changes on a platform-driven round that drains an empty last page", async () => {
    store = {
      cursor: { windowStart: LOOK_BACK, windowEnd: NOW, cursor: PAGE_CURSOR },
    };
    nock(BASE).get(SEARCH_PATH).query(true).reply(200, { items: [] });
    const result = await trigger.perform(
      context(true),
      payload({ windowStart: LOOK_BACK, windowEnd: NOW, cursor: PAGE_CURSOR }),
      params(""),
    );
    expect(result.polledNoChanges).toBe(false);
    expect(store).toEqual({ lastPolledAt: NOW });
  });

  test("seeds an initial sync from the Look-back Date", async () => {
    nock(BASE)
      .get(SEARCH_PATH)
      .query(true)
      .reply(200, { items: [exampleContentFragment] });
    const result = await trigger.perform(
      context(false),
      payload(),
      params(LOOK_BACK),
    );
    const items = (result.payload.body.data as { items: AemChangeItem[] })
      .items;
    expect(items.map((item) => item.changeType)).toEqual(["initialSync"]);
    expect(store).toEqual({ lastPolledAt: NOW });
  });

  test("starts empty on the first run without a Look-back Date", async () => {
    const result = await trigger.perform(context(false), payload(), params(""));
    expect(result.polledNoChanges).toBe(true);
    expect(result.payload.body.data).toEqual({ items: [] });
    expect(store).toEqual({ lastPolledAt: NOW });
  });

  test("delivers a record on the window boundary exactly once", async () => {
    const start = "2026-10-01T00:00:00.000Z";
    store = { lastPolledAt: start };
    const atStart = {
      ...exampleContentFragment,
      id: "at-start",
      modified: { at: start },
    };
    const atEnd = {
      ...exampleContentFragment,
      id: "at-end",
      modified: { at: NOW },
    };
    nock(BASE)
      .get(SEARCH_PATH)
      .query(true)
      .reply(200, { items: [atStart, atEnd] });
    const result = await trigger.perform(context(false), payload(), params(""));
    const items = (result.payload.body.data as { items: AemChangeItem[] })
      .items;
    expect(items.map((item) => item.record.id)).toEqual(["at-start"]);
    expect(store).toEqual({ lastPolledAt: NOW });
  });

  test("surfaces an API error without advancing the watermark", async () => {
    store = { lastPolledAt: "2026-10-01T00:00:00.000Z" };
    nock(BASE)
      .get(SEARCH_PATH)
      .query(true)
      .reply(500, { title: "Server Error" });
    await expect(
      trigger.perform(context(false), payload(), params("")),
    ).rejects.toThrow("Request failed with status code 500");
    expect(store).toEqual({ lastPolledAt: "2026-10-01T00:00:00.000Z" });
  });
});
