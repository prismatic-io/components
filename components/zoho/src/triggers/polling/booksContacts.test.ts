import {
  createConnection,
  invokeTrigger,
  loggerMock,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { zohoTemplatedConnection } from "../../connections";
import { booksGetRecordsExamplePayload } from "../../examplePayloads/books";
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
const BOOKS_BASE = "https://www.zohoapis.com";
const BOOKS_REPLY = booksGetRecordsExamplePayload.data;
const makeContext = (store: { lastUpdated?: string }) => ({
  debug: { enabled: false },
  logger: loggerMock(),
  polling: {
    getState: () => store,
    setState: (next: { lastUpdated?: string }) => {
      store.lastUpdated = next.lastUpdated;
    },
  },
});
// biome-ignore lint/suspicious/noExplicitAny: test-only context bridge
const asCtx = (c: ReturnType<typeof makeContext>): any => c;
// biome-ignore lint/suspicious/noExplicitAny: test-only trigger-shape bridge
const trigger: any = bookContactsPollingTrigger;
describe("bookContactsPollingTrigger", () => {
  afterEach(() => nock.cleanAll());
  test("threads state across polls: second poll forwards last_modified_time as a Books query param", async () => {
    const store: {
      lastUpdated?: string;
    } = {};
    const firstScope = nock(BOOKS_BASE)
      .get("/books/v3/contacts")
      .query((q) => q.last_modified_time === undefined)
      .reply(200, BOOKS_REPLY);
    const first = await invokeTrigger(
      trigger,
      asCtx(makeContext(store)),
      undefined, // biome-ignore lint/suspicious/noExplicitAny: test-only params bridge
      { connection: conn } as any,
    );
    expect(firstScope.isDone()).toBe(true);
    expect(store.lastUpdated).toBeDefined();
    expect(first.result?.polledNoChanges).toBe(true);
    expect(first.result?.payload.body.data).toEqual({
      created: [],
      updated: [],
    });
    const firstLastUpdated = store.lastUpdated as string;
    const expectedParam = toZohoTimestamp(firstLastUpdated);
    const secondScope = nock(BOOKS_BASE)
      .get("/books/v3/contacts")
      .query((q) => q.last_modified_time === expectedParam)
      .reply(200, BOOKS_REPLY);
    const second = await invokeTrigger(
      trigger,
      asCtx(makeContext(store)),
      undefined, // biome-ignore lint/suspicious/noExplicitAny: test-only params bridge
      { connection: conn } as any,
    );
    expect(secondScope.isDone()).toBe(true);
    expect(store.lastUpdated).not.toBe(firstLastUpdated);
    expect(second.result?.polledNoChanges).toBe(true);
  });
});
