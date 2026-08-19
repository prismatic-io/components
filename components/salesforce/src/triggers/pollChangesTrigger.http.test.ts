import {
  createConnection,
  invokeTrigger,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createSalesforceClient } from "../client";
import { salesforceOAuth } from "../connections";
import { DEFAULT_SF_VERSION } from "../constants";
import type {
  PollingState,
  PollingTriggerObject,
  SalesforceChangesObject,
} from "../types";
import {
  advanceCursor,
  fetchDeletedRecords,
  fetchPollingPage,
  resolvePollingFields,
} from "../util";
import { pollChangesTrigger } from "./pollChangesTrigger";
const INSTANCE_URL = "https://example-dev-ed.my.salesforce.com";
const ACCESS_TOKEN = "00Dxx0000000000!fake-access-token";
const VERSION = DEFAULT_SF_VERSION;
const BASE_PATH = `/services/data/v${VERSION}`;
const BEARER = { reqheaders: { authorization: `Bearer ${ACCESS_TOKEN}` } };
const connection = createConnection(
  salesforceOAuth,
  {},
  { instance_url: INSTANCE_URL, access_token: ACCESS_TOKEN },
);
const client = () => createSalesforceClient(connection as never, VERSION);
const cursor = {
  watermark: "2026-08-10T12:00:00Z",
  windowStart: "2026-08-10T12:00:00Z",
  windowEnd: "2026-08-10T13:00:00Z",
  isBackfill: false,
};
const logger = {
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
const WINDOW_OPEN_MS = new Date("2026-08-10T12:00:00Z").getTime();
const page = (count: number, startSecond = 0): PollingTriggerObject[] =>
  Array.from({ length: count }, (_unused, index) => {
    const second = startSecond + index;
    const at = new Date(WINDOW_OPEN_MS + second * 1000);
    return {
      Id: `001${String(second).padStart(15, "0")}`,
      CreatedDate: "2020-01-01T00:00:00.000+0000",
      LastModifiedDate: `${at.toISOString().slice(0, 23)}+0000`,
    };
  });
const freezeClockAt = (iso: string) => {
  jest
    .useFakeTimers({
      doNotFake: [
        "hrtime",
        "nextTick",
        "performance",
        "queueMicrotask",
        "requestAnimationFrame",
        "cancelAnimationFrame",
        "requestIdleCallback",
        "cancelIdleCallback",
        "setImmediate",
        "clearImmediate",
        "setInterval",
        "clearInterval",
        "setTimeout",
        "clearTimeout",
      ],
    })
    .setSystemTime(new Date(iso));
};
describe("pollChangesTrigger over HTTP (real jsforce against nock)", () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });
  afterAll(() => {
    nock.enableNetConnect();
  });
  afterEach(() => {
    nock.cleanAll();
    jest.useRealTimers();
    jest.clearAllMocks();
  });
  test("the SOQL that reaches Salesforce carries the floored cursor bounds, the cursor ORDER BY, and the LIMIT", async () => {
    let sentSOQL: string | undefined;
    nock(INSTANCE_URL)
      .get(`${BASE_PATH}/query`)
      .query((actual) => {
        sentSOQL = actual.q as string;
        return true;
      })
      .reply(200, { totalSize: 0, done: true, records: [] });
    await fetchPollingPage(await client(), {
      recordType: "Account",
      fields: ["Name"],
      filters: { Industry: "Banking" },
      cursor,
      pageSize: 500,
    });
    expect(sentSOQL).toBe(
      "SELECT Id, CreatedDate, LastModifiedDate, Name FROM Account" +
        " WHERE Industry = 'Banking'" +
        " AND LastModifiedDate >= 2026-08-10T12:00:00Z" +
        " AND LastModifiedDate < 2026-08-10T13:00:00Z" +
        " ORDER BY LastModifiedDate ASC, Id ASC" +
        " LIMIT 500",
    );
    expect(nock.isDone()).toBe(true);
  });
  test("a page split across a queryMore locator is reassembled, and advanceCursor keys off the assembled page", async () => {
    const pageSize = 2300;
    const first = page(2000);
    const second = page(300, 2000);
    const locator = "01g5000000GpSaAAAV-2000";
    nock(INSTANCE_URL)
      .get(`${BASE_PATH}/query`)
      .query(true)
      .reply(200, {
        totalSize: pageSize,
        done: false,
        nextRecordsUrl: `${BASE_PATH}/query/${locator}`,
        records: first,
      })
      .get(`${BASE_PATH}/query/${locator}`)
      .reply(200, { totalSize: pageSize, done: true, records: second });
    const assembled = await fetchPollingPage(await client(), {
      recordType: "Account",
      fields: [],
      filters: {},
      cursor,
      pageSize,
    });
    expect(assembled).toHaveLength(pageSize);
    expect(assembled.map((r) => r.Id)).toEqual(
      [...first, ...second].map((r) => r.Id),
    );
    expect(nock.isDone()).toBe(true);
    const { emit, nextCursor } = advanceCursor(assembled, cursor, pageSize);
    expect(nextCursor?.watermark).toBe("2026-08-10T12:38:19Z");
    expect(nextCursor?.lastId).toBe(assembled.at(-1)?.Id);
    expect(emit).toHaveLength(pageSize);
    expect(emit.at(-1)?.Id).toBe(assembled.at(-1)?.Id);
  });
  test("accumulating to exactly the page size with done:false is the final page, not an incomplete result set", async () => {
    const pageSize = 100;
    const locator = "01g5000000GpSaAAAV-60";
    nock(INSTANCE_URL)
      .get(`${BASE_PATH}/query`)
      .query(true)
      .reply(200, {
        totalSize: 500,
        done: false,
        nextRecordsUrl: `${BASE_PATH}/query/${locator}`,
        records: page(60),
      })
      .get(`${BASE_PATH}/query/${locator}`)
      .reply(200, {
        totalSize: 500,
        done: false,
        nextRecordsUrl: `${BASE_PATH}/query/01g5000000GpSaAAAV-100`,
        records: page(40, 60),
      });
    const records = await fetchPollingPage(await client(), {
      recordType: "Account",
      fields: [],
      filters: {},
      cursor,
      pageSize,
    });
    expect(records).toHaveLength(pageSize);
    expect(nock.isDone()).toBe(true);
  });
  test("resolvePollingFields builds the SELECT list from the real describe response", async () => {
    nock(INSTANCE_URL)
      .get(`${BASE_PATH}/sobjects/Account/describe`)
      .reply(200, {
        name: "Account",
        fields: [
          { name: "Id", type: "id" },
          { name: "Name", type: "string" },
          { name: "Description", type: "textarea", length: 32000 },
        ],
      });
    const fields = await resolvePollingFields(
      await client(),
      "Account",
      [],
      false,
      logger,
    );
    expect(fields).toEqual([
      "Id",
      "CreatedDate",
      "LastModifiedDate",
      "Name",
      "Description",
    ]);
    expect(nock.isDone()).toBe(true);
  });
  test("the deleted-records window reaches Salesforce as jsforce's reformatted dates, not the ISO strings the component passes", async () => {
    const since = "2026-08-10T10:00:00.123Z";
    const now = "2026-08-10T13:00:00.456Z";
    let sentQuery: Record<string, unknown> | undefined;
    nock(INSTANCE_URL)
      .get(`${BASE_PATH}/sobjects/Account/deleted`)
      .query((actual) => {
        sentQuery = actual;
        return true;
      })
      .reply(200, {
        deletedRecords: [
          {
            id: "001000000000001AAA",
            deletedDate: "2026-08-10T11:30:00.000+0000",
          },
        ],
        earliestDateAvailable: "2026-07-27T00:00:00.000+0000",
        latestDateCovered: "2026-08-10T12:59:00.000+0000",
      });
    const { deletedRecords, coveredUntil } = await fetchDeletedRecords(
      await client(),
      "Account",
      since,
      now,
      logger,
    );
    expect(sentQuery).toEqual({
      start: "2026-08-10T10:00:00+00:00",
      end: "2026-08-10T13:00:00+00:00",
    });
    expect(deletedRecords).toEqual([
      {
        id: "001000000000001AAA",
        deletedDate: "2026-08-10T11:30:00.000+0000",
        IsDeleted: true,
      },
    ]);
    expect(coveredUntil).toBe("2026-08-10T12:59:00.000+0000");
    expect(nock.isDone()).toBe(true);
  });
  test("the whole trigger drains over HTTP with the connection's bearer token, resuming round two at the keyset", async () => {
    freezeClockAt("2026-08-10T13:00:00.000Z");
    const describeBody = {
      name: "Account",
      fields: [
        { name: "Id", type: "id" },
        { name: "Name", type: "string" },
      ],
    };
    const roundOne = page(1, 1);
    const roundTwo = page(1, 2);
    const boundary = page(1, 3);
    const sentSOQL: string[] = [];
    nock(INSTANCE_URL, BEARER)
      .get(`${BASE_PATH}/sobjects/Account/describe`)
      .twice()
      .reply(200, describeBody)
      .get(`${BASE_PATH}/query`)
      .query((actual) => {
        sentSOQL.push(actual.q as string);
        return true;
      })
      .reply(200, {
        totalSize: 3,
        done: true,
        records: [...roundOne, ...roundTwo, ...boundary],
      })
      .get(`${BASE_PATH}/query`)
      .query((actual) => {
        sentSOQL.push(actual.q as string);
        return true;
      })
      .reply(200, { totalSize: 0, done: true, records: [] });
    // `@ts-expect-error` about exactly that), so the store is injected with a
    let state: PollingState = { lastPolledAt: "2026-08-10T12:00:00.000Z" };
    const context = {
      polling: {
        getState: () => state,
        setState: (next: PollingState) => {
          state = next;
        },
      },
    } as never;
    const params = {
      connection,
      version: VERSION,
      recordType: "Account",
      showNewRecords: true,
      showUpdatedRecords: true,
      showDeletedRecords: false,
      selectedFields: [],
      returnIdsOnly: false,
      lookBackDate: "",
      dynamicValues: {},
      fieldValues: {},
      fieldValueTypes: [],
      maxRecordsToFetch: 3,
    } as never;
    const invokePoll = async (paginationState: unknown) => {
      const { result } = await invokeTrigger(
        pollChangesTrigger as never,
        context,
        { paginationState } as never,
        params,
      );
      return result as unknown as {
        payload: {
          paginationState?: unknown;
          body: {
            data: SalesforceChangesObject;
          };
        };
      };
    };
    const first = await invokePoll(undefined);
    const firstCursor = first.payload.paginationState;
    expect(firstCursor).toEqual(
      expect.objectContaining({
        watermark: "2026-08-10T12:00:03Z",
        isBackfill: false,
      }),
    );
    const second = await invokePoll(firstCursor);
    expect(second.payload.paginationState).toBeUndefined();
    expect(sentSOQL).toHaveLength(2);
    expect(sentSOQL[0]).toContain("LastModifiedDate >= 2026-08-10T12:00:00Z");
    expect(sentSOQL[1]).toContain(
      "(LastModifiedDate > 2026-08-10T12:00:03Z OR (LastModifiedDate = 2026-08-10T12:00:03Z AND Id > '001000000000000003'))",
    );
    expect(sentSOQL[0]).toContain("LastModifiedDate < 2026-08-10T13:00:00Z");
    expect(sentSOQL[1]).toContain("LastModifiedDate < 2026-08-10T13:00:00Z");
    const ids = [first, second].flatMap((round) => {
      const data = round.payload.body.data;
      return [...data.createdRecords, ...data.updatedRecords].map(
        (r) => r.Id as string,
      );
    });
    expect(ids).toEqual(
      [...roundOne, ...roundTwo, ...boundary].map((r) => r.Id),
    );
    expect(nock.isDone()).toBe(true);
  });
});
