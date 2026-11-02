import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { aemOAuthServerToServer } from "../connections";
import {
  assetChangesExamplePayload,
  searchAssetsExamplePayload,
} from "../examplePayloads";
import type { AemChangeItem, PollingState, PollWindowCursor } from "../types";
import { resolveAemChangeItems } from "../utils";
import { assetChanges as trigger } from "./assetChanges";

const exampleAssetSearchHit = searchAssetsExamplePayload.data.hits.results[0];

type PerformContext = Parameters<typeof trigger.perform>[0];
type PerformPayload = Parameters<typeof trigger.perform>[1];

const AEM_HOST = "author-p12345-e123456.adobeaemcloud.com";
const BASE = `https://${AEM_HOST}`;
const SEARCH_PATH = "/adobe/assets/search";
const NOW = "2026-10-05T12:00:00.000Z";
const CLOCK = "2026-10-05T12:02:00.000Z";
const LOOK_BACK = "2026-04-01T00:00:00.000Z";
const PAGE_CURSOR = searchAssetsExamplePayload.data.cursor;
const FOLDER_ID = "urn:aaid:aem:abcd1234-ab12-ab12-ab12-abcdef123456";

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

const secondHit = {
  ...exampleAssetSearchHit,
  assetId: "urn:aaid:aem:second",
  repositoryMetadata: {
    ...exampleAssetSearchHit.repositoryMetadata,
    "repo:modifyDate": "2026-09-01T00:00:00.000Z",
  },
};

const params = (lookBackDate: string) => ({
  connection,
  lookBackDate,
  folderIds: [FOLDER_ID],
  mimeTypes: [] as string[],
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
    ...assetChangesExamplePayload.payload,
    body: { data: {} },
    paginationState,
  }) as unknown as PerformPayload;

const itemsOf = (result: { payload: { body: { data: unknown } } }) =>
  (result.payload.body.data as { items: AemChangeItem[] }).items;

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

describe("assetChanges batching declaration", () => {
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
  const item = assetChangesExamplePayload.payload.body.data
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
      { payload: assetChangesExamplePayload.payload } as never,
    );
    expect(items).toEqual(assetChangesExamplePayload.payload.body.data.items);
    const batchSize = trigger.batchConfig?.batchSize ?? 1;
    const chunks: unknown[][] = [];
    for (let i = 0; i < (items ?? []).length; i += batchSize) {
      chunks.push((items ?? []).slice(i, i + batchSize));
    }
    expect(chunks).toHaveLength(1);
  });
});

describe("assetChanges perform", () => {
  test("drains a window across platform-driven rounds when batching is on", async () => {
    const bodies: Record<string, unknown>[] = [];
    nock(BASE)
      .post(SEARCH_PATH, (body) => {
        bodies.push(body);
        return true;
      })
      .reply(200, searchAssetsExamplePayload.data);

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
    expect(bodies[0]).toEqual({
      query: [
        { term: { "repositoryMetadata.repo:ancestors": [FOLDER_ID] } },
        {
          range: {
            "repositoryMetadata.repo:modifyDate": { gte: LOOK_BACK, lt: NOW },
          },
        },
      ],
      sort: [{ field: "repositoryMetadata.repo:modifyDate", order: "ASC" }],
      limit: 50,
    });
    const round1Items = trigger.triggerResolver?.resolveItems?.(
      {} as never,
      { payload: round1.payload } as never,
    ) as AemChangeItem[];
    expect(
      round1Items.map((item) => [item.changeType, item.record.id]),
    ).toEqual([["initialSync", exampleAssetSearchHit.assetId]]);
    expect(round1Items[0].record.scope).toBe(FOLDER_ID);
    expect(
      trigger.triggerResolver?.getNextPaginationState?.(
        {} as never,
        { payload: round1.payload } as never,
      ),
    ).toEqual(cursor);

    vi.setSystemTime(new Date("2026-10-05T12:05:00.000Z"));
    nock(BASE)
      .post(SEARCH_PATH, (body) => {
        bodies.push(body);
        return true;
      })
      .reply(200, { hits: { results: [secondHit] } });
    const round2 = await trigger.perform(
      context(true),
      payload(round1.payload.paginationState as PollWindowCursor),
      params(LOOK_BACK),
    );
    expect(bodies[1].cursor).toBe(PAGE_CURSOR);
    expect(round2.payload.paginationState).toBeUndefined();
    expect(store).toEqual({ lastPolledAt: NOW });
    expect(round2.polledNoChanges).toBe(false);
    expect(itemsOf(round2).map((item) => item.record.id)).toEqual([
      "urn:aaid:aem:second",
    ]);
  });

  test("reports changes on a platform-driven round that drains an empty last page", async () => {
    store = {
      cursor: { windowStart: LOOK_BACK, windowEnd: NOW, cursor: PAGE_CURSOR },
    };
    nock(BASE)
      .post(SEARCH_PATH)
      .reply(200, { hits: { results: [] } });
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
      .post(SEARCH_PATH)
      .reply(200, { hits: { results: [exampleAssetSearchHit] } });
    const result = await trigger.perform(
      context(false),
      payload(),
      params(LOOK_BACK),
    );
    expect(itemsOf(result).map((item) => item.changeType)).toEqual([
      "initialSync",
    ]);
    expect(store).toEqual({ lastPolledAt: NOW });
  });

  test("starts empty on the first run without a Look-back Date", async () => {
    const result = await trigger.perform(context(false), payload(), params(""));
    expect(result.polledNoChanges).toBe(true);
    expect(result.payload.body.data).toEqual({ items: [] });
    expect(store).toEqual({ lastPolledAt: NOW });
  });

  test("classifies a later poll's records as created or modified", async () => {
    const start = "2026-10-01T00:00:00.000Z";
    store = { lastPolledAt: start };
    const created = {
      ...exampleAssetSearchHit,
      assetId: "urn:aaid:aem:new",
      repositoryMetadata: {
        "repo:createDate": "2026-10-02T00:00:00.000Z",
        "repo:modifyDate": "2026-10-02T00:00:00.000Z",
      },
    };
    const modified = {
      ...exampleAssetSearchHit,
      repositoryMetadata: {
        ...exampleAssetSearchHit.repositoryMetadata,
        "repo:modifyDate": "2026-10-03T00:00:00.000Z",
      },
    };
    nock(BASE)
      .post(SEARCH_PATH)
      .reply(200, { hits: { results: [created, modified] } });
    const result = await trigger.perform(context(false), payload(), params(""));
    expect(itemsOf(result).map((item) => item.changeType)).toEqual([
      "created",
      "modified",
    ]);
    expect(result.polledNoChanges).toBe(false);
  });

  test("surfaces an API error without advancing the watermark", async () => {
    store = { lastPolledAt: "2026-10-01T00:00:00.000Z" };
    nock(BASE).post(SEARCH_PATH).reply(400, { title: "Invalid query" });
    await expect(
      trigger.perform(context(false), payload(), params("")),
    ).rejects.toThrow("Request failed with status code 400");
    expect(store).toEqual({ lastPolledAt: "2026-10-01T00:00:00.000Z" });
  });
});
