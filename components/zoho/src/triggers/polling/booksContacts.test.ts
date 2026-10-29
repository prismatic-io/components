import {
  createConnection,
  defaultTriggerPayload,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { zohoTemplatedConnection } from "../../connections";
import type { BookRecord, PollingState } from "../../types";
import { toZohoTimestamp } from "../../util/general";
import { bookContactsPollingTrigger } from "./booksContacts";

const conn = {
  ...createConnection(
    zohoTemplatedConnection,
    {},
    { access_token: "test-token" },
  ),
  context: { "accounts-server": "https://accounts.zoho.com" },
};

const BASE = "https://www.zohoapis.com";
const T0 = "2026-03-01T10:00:00.000Z";

const contact = (
  id: string,
  created: string,
  modified: string,
): BookRecord => ({
  created_time: created,
  last_modified_time: modified,
  contact_id: id,
});

type Perform = typeof bookContactsPollingTrigger.perform;
let store: PollingState;

const run = (lookBackDate = "") =>
  bookContactsPollingTrigger.perform(
    {
      polling: {
        getState: () => store,
        setState: (next: PollingState) => {
          store = next;
        },
      },
      debug: { enabled: false },
      logger: { debug: vi.fn(), warn: vi.fn() },
    } as unknown as Parameters<Perform>[0],
    defaultTriggerPayload() as unknown as Parameters<Perform>[1],
    { connection: conn, lookBackDate } as never,
  );

const sinceQuery = (since: string) => (q: Record<string, unknown>) =>
  q.last_modified_time === toZohoTimestamp(since);

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(new Date(T0));
  store = {};
});

afterEach(() => {
  vi.useRealTimers();
  nock.cleanAll();
});

describe("bookContactsPollingTrigger declaration", () => {
  test("is opt-in batchable with a default batch size and no pagination cursor", () => {
    expect(bookContactsPollingTrigger.triggerResolverSupport).toBe("valid");
    expect(bookContactsPollingTrigger.batchConfig).toEqual({ batchSize: 50 });
    expect(
      bookContactsPollingTrigger.triggerResolver?.resolveItems,
    ).toBeInstanceOf(Function);
    expect(
      bookContactsPollingTrigger.triggerResolver?.getNextPaginationState,
    ).toBeUndefined();
  });

  test("places Look-back Date directly below the connection", () => {
    expect(Object.keys(bookContactsPollingTrigger.inputs ?? {})).toEqual([
      "connection",
      "lookBackDate",
    ]);
  });

  test("resolveItems flattens the payload shape perform returns", () => {
    const updated = contact("1", "2020-01-01T00:00:00Z", T0);
    const payload = {
      ...defaultTriggerPayload(),
      body: { data: { updated: [updated] } },
    };
    expect(
      bookContactsPollingTrigger.triggerResolver?.resolveItems?.({} as never, {
        payload,
      }),
    ).toEqual([{ changeType: "updated", record: updated }]);
  });
});

describe("bookContactsPollingTrigger polling", () => {
  test("first poll without a Look-back Date starts at now", async () => {
    const scope = nock(BASE)
      .get("/books/v3/contacts")
      .query(sinceQuery(T0))
      .reply(200, { contacts: [], page_context: { has_more_page: false } });
    const r = await run();
    expect(scope.isDone()).toBe(true);
    expect(store).toEqual({ lastPolledAt: T0 });
    expect(r.polledNoChanges).toBe(true);
  });

  test("first poll with a Look-back Date seeds last_modified_time and the classification", async () => {
    const lb = "2026-01-01T00:00:00.000Z";
    const fresh = contact("n", "2026-02-01T00:00:00Z", "2026-02-01T00:00:00Z");
    const changed = contact(
      "o",
      "2025-06-01T00:00:00Z",
      "2026-02-02T00:00:00Z",
    );
    const untouched = contact(
      "u",
      "2025-06-01T00:00:00Z",
      "2025-06-02T00:00:00Z",
    );
    const scope = nock(BASE)
      .get("/books/v3/contacts")
      .query(sinceQuery(lb))
      .reply(200, {
        contacts: [fresh, changed, untouched],
        page_context: { has_more_page: false },
      });
    const r = await run(lb);
    expect(scope.isDone()).toBe(true);
    expect(r.payload.body.data).toEqual({
      created: [fresh],
      updated: [changed],
    });
    expect(store).toEqual({ lastPolledAt: T0 });
  });

  test("later polls ignore the Look-back Date and honor the pre-batching lastUpdated key", async () => {
    store = { lastUpdated: "2026-02-15T00:00:00.000Z" };
    const scope = nock(BASE)
      .get("/books/v3/contacts")
      .query(sinceQuery("2026-02-15T00:00:00.000Z"))
      .reply(200, { contacts: [], page_context: { has_more_page: false } });
    await run("2026-01-01T00:00:00.000Z");
    expect(scope.isDone()).toBe(true);
    expect(store).toEqual({ lastPolledAt: T0 });
  });
});
