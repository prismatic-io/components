import { Readable } from "node:stream";
import type { ActionContext } from "@prismatic-io/spectral";
import { ConnectionError } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { createActivityClient, createClient } from "../client";
import { connection as connectionDefinition } from "../connections";
import {
  ACTIVITY_SYNC_HANDOFF_KEY_PREFIX,
  INITIAL_SYNC_COMPLETED_KEY_PREFIX,
  LIST_CHANGES_STATE_KEY_PREFIX,
  MY_DRIVE,
} from "../constants";
import {
  buildActivityFilter,
  cleanArrayInput,
  cleanItemInput,
  cleanStringInput,
  fetchBackfillPage,
  fetchChangesPage,
  fetchStartPageToken,
  getActivitySyncHandoffKey,
  getDriveQueryParams,
  getInitialSyncCompletedKey,
  getListChangesLegacyStateKey,
  getListChangesNewStateKey,
  getOauth,
  getQueryDriveActivity,
  getToken,
  isInitialSyncCompleted,
  lookBackDateClean,
  resolveActivitySyncHandoff,
  resolveDriveActivities,
  resolveListChangeItems,
  resolveListChangesPageToken,
  streamToBuffer,
} from ".";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const ACTIVITY = "https://driveactivity.googleapis.com";
const DRIVE = "https://www.googleapis.com";
const buildContext = (overrides: {
  stepId?: string;
  stableId?: string;
  crossFlowState?: Record<string, unknown>;
  instanceState?: Record<string, unknown>;
}): ActionContext =>
  ({
    stepId: overrides.stepId ?? "step-1",
    flow: {
      id: "flow-id",
      name: "Flow 1",
      stableId: overrides.stableId ?? "stable-1",
    },
    crossFlowState: overrides.crossFlowState ?? {},
    instanceState: overrides.instanceState ?? {},
  }) as unknown as ActionContext;
describe("streamToBuffer", () => {
  test("concatenates every chunk in order", async () => {
    const buffer = await streamToBuffer(
      Readable.from([
        Buffer.from("Q3 "),
        Buffer.from("revenue "),
        Buffer.from("figures"),
      ]),
    );
    expect(buffer.toString()).toBe("Q3 revenue figures");
  });
  test("rejects when the stream errors", async () => {
    const stream = new Readable({
      read() {
        this.destroy(new Error("stream failed"));
      },
    });
    await expect(streamToBuffer(stream)).rejects.toThrow("stream failed");
  });
});
describe("getToken", () => {
  test("returns the access token as a string", () => {
    expect(getToken(connection)).toBe("test-token");
  });
  test("throws a ConnectionError when the access token is absent", () => {
    expect(() =>
      getToken(createConnection(connectionDefinition, {}, {})),
    ).toThrow(ConnectionError);
  });
});
describe("getOauth", () => {
  test("sets the access token on the OAuth2 client", () => {
    expect(getOauth("test-token").credentials.access_token).toBe("test-token");
  });
});
describe("cleanStringInput", () => {
  test("stringifies a truthy value", () => {
    expect(cleanStringInput("Pictures")).toBe("Pictures");
    expect(cleanStringInput(123)).toBe("123");
  });
  test("returns undefined for any falsy value, including 0 and false", () => {
    expect(cleanStringInput("")).toBeUndefined();
    expect(cleanStringInput(undefined)).toBeUndefined();
    expect(cleanStringInput(null)).toBeUndefined();
    expect(cleanStringInput(0)).toBeUndefined();
    expect(cleanStringInput(false)).toBeUndefined();
  });
});
describe("cleanArrayInput", () => {
  test("stringifies each entry and drops the falsy ones", () => {
    expect(cleanArrayInput(["CREATE", "", null, "EDIT"])).toEqual([
      "CREATE",
      "EDIT",
    ]);
  });
  test("returns an empty array for a non-array value", () => {
    expect(cleanArrayInput("CREATE")).toEqual([]);
    expect(cleanArrayInput(undefined)).toEqual([]);
  });
});
describe("cleanItemInput", () => {
  test("prefixes a bare ID with items/", () => {
    expect(cleanItemInput("1a2b3c")).toBe("items/1a2b3c");
  });
  test("leaves an already-prefixed ID alone", () => {
    expect(cleanItemInput("items/1a2b3c")).toBe("items/1a2b3c");
  });
  test("returns undefined for the My Drive sentinel", () => {
    expect(cleanItemInput(MY_DRIVE)).toBeUndefined();
  });
  test("returns undefined for an empty value", () => {
    expect(cleanItemInput("")).toBeUndefined();
    expect(cleanItemInput(undefined)).toBeUndefined();
  });
  test("passes through any value containing items/ anywhere", () => {
    expect(cleanItemInput("folder/items/1a2b")).toBe("folder/items/1a2b");
  });
});
describe("getDriveQueryParams", () => {
  test("turns shared-drive support off for the My Drive sentinel", () => {
    expect(getDriveQueryParams(MY_DRIVE)).toEqual({
      supportsAllDrives: false,
      includeItemsFromAllDrives: false,
      corpora: "user",
    });
  });
  test("scopes the query to a named shared drive", () => {
    expect(getDriveQueryParams("0AAvGyortvuqEXAMPLE")).toEqual({
      driveId: "0AAvGyortvuqEXAMPLE",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      corpora: "drive",
    });
  });
  test("leaves corpora unset when no drive is given", () => {
    expect(getDriveQueryParams("")).toEqual({
      driveId: "",
      supportsAllDrives: true,
      includeItemsFromAllDrives: true,
      corpora: undefined,
    });
  });
});
describe("getQueryDriveActivity", () => {
  afterEach(() => nock.cleanAll());
  test("returns the first page when fetchAll is false", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, {
        activities: [{ timestamp: "2025-03-11T15:58:37.276Z" }],
        nextPageToken: "p2",
      });
    const data = await getQueryDriveActivity(
      createActivityClient(connection),
      {},
      false,
    );
    expect(data.activities).toHaveLength(1);
    expect(data.nextPageToken).toBe("p2");
  });
  test("follows nextPageToken and appends every page when fetchAll is true", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { activities: [{ timestamp: "one" }], nextPageToken: "p2" });
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { activities: [{ timestamp: "two" }] });
    const data = await getQueryDriveActivity(
      createActivityClient(connection),
      {},
      true,
    );
    expect(data.activities).toEqual([
      { timestamp: "one" },
      { timestamp: "two" },
    ]);
  });
  test("forwards only the five documented query keys to the API", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    await getQueryDriveActivity(
      createActivityClient(connection),
      { filter: "time > 1", itemName: "items/abc", unsupported: "dropped" },
      false,
    );
    expect(body).toEqual({ filter: "time > 1", itemName: "items/abc" });
  });
  test("wraps the consolidation strategy name into the shape the API expects", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    await getQueryDriveActivity(
      createActivityClient(connection),
      { consolidationStrategy: "legacy" },
      false,
    );
    expect(body).toEqual({ consolidationStrategy: { legacy: {} } });
  });
  test("omits the consolidation strategy entirely when none was selected", async () => {
    let body: Record<string, unknown> = {};
    nock(ACTIVITY)
      .post("/v2/activity:query", (received) => {
        body = received as Record<string, unknown>;
        return true;
      })
      .reply(200, { activities: [] });
    await getQueryDriveActivity(
      createActivityClient(connection),
      { consolidationStrategy: undefined, filter: "time > 1" },
      false,
    );
    expect(body).toEqual({ filter: "time > 1" });
  });
});
describe("list changes state keys", () => {
  test("scopes the new key by flow stable ID and step ID", () => {
    const context = buildContext({ stepId: "step-9", stableId: "stable-9" });
    expect(getListChangesNewStateKey(context)).toBe(
      `${LIST_CHANGES_STATE_KEY_PREFIX}:stable-9:step-9`,
    );
  });
  test("uses the bare step ID as the legacy key", () => {
    expect(
      getListChangesLegacyStateKey(buildContext({ stepId: "step-9" })),
    ).toBe("step-9");
  });
});
describe("resolveListChangesPageToken", () => {
  test("prefers the token stored under the new crossFlowState key", () => {
    const context = buildContext({
      crossFlowState: {
        [`${LIST_CHANGES_STATE_KEY_PREFIX}:stable-1:step-1`]: "new-token",
      },
      instanceState: { "step-1": "legacy-token" },
    });
    expect(resolveListChangesPageToken(context)).toEqual({
      value: "new-token",
      isLegacy: false,
    });
  });
  test("falls back to the legacy instanceState key and flags it", () => {
    const context = buildContext({
      instanceState: { "step-1": "legacy-token" },
    });
    expect(resolveListChangesPageToken(context)).toEqual({
      value: "legacy-token",
      isLegacy: true,
    });
  });
  test("returns an empty token when neither location holds one", () => {
    expect(resolveListChangesPageToken(buildContext({}))).toEqual({
      value: "",
      isLegacy: false,
    });
  });
});
describe("initial sync state keys", () => {
  test("scopes both keys by flow stable ID and step ID", () => {
    const context = buildContext({ stepId: "step-9", stableId: "stable-9" });
    expect(getActivitySyncHandoffKey(context)).toBe(
      `${ACTIVITY_SYNC_HANDOFF_KEY_PREFIX}:stable-9:step-9`,
    );
    expect(getInitialSyncCompletedKey(context)).toBe(
      `${INITIAL_SYNC_COMPLETED_KEY_PREFIX}:stable-9:step-9`,
    );
  });
});
describe("resolveActivitySyncHandoff", () => {
  test("reads the instant an initial sync handed over", () => {
    const context = buildContext({
      instanceState: {
        [`${ACTIVITY_SYNC_HANDOFF_KEY_PREFIX}:stable-1:step-1`]:
          "2026-02-01T00:00:00.000Z",
      },
    });
    expect(resolveActivitySyncHandoff(context)).toBe(
      "2026-02-01T00:00:00.000Z",
    );
  });
  test("resolves to an empty string when no sync has handed anything over", () => {
    expect(resolveActivitySyncHandoff(buildContext({}))).toBe("");
  });
  test("resolves a cleared key to an empty string rather than the literal null", () => {
    const context = buildContext({
      instanceState: {
        [`${ACTIVITY_SYNC_HANDOFF_KEY_PREFIX}:stable-1:step-1`]: null,
      },
    });
    expect(resolveActivitySyncHandoff(context)).toBe("");
  });
});
describe("isInitialSyncCompleted", () => {
  test("is true once a sync has recorded completion", () => {
    const context = buildContext({
      instanceState: {
        [`${INITIAL_SYNC_COMPLETED_KEY_PREFIX}:stable-1:step-1`]: true,
      },
    });
    expect(isInitialSyncCompleted(context)).toBe(true);
  });
  test("is false for an instance that has never finished one", () => {
    expect(isInitialSyncCompleted(buildContext({}))).toBe(false);
  });
});
describe("lookBackDateClean", () => {
  test.each([
    undefined,
    null,
    "",
    "   ",
  ])("treats %p as no backfill", (value) => {
    expect(lookBackDateClean(value)).toBe("");
  });
  test("normalizes a valid date to a UTC instant", () => {
    expect(lookBackDateClean("2026-01-15")).toBe("2026-01-15T00:00:00.000Z");
  });
  test("trims surrounding whitespace before matching", () => {
    expect(lookBackDateClean("  2026-01-15  ")).toBe(
      "2026-01-15T00:00:00.000Z",
    );
  });
  test.each([
    "15-01-2026",
    "2026/01/15",
    "2026-1-15",
    "January 15, 2026",
    "2026-01-15T00:00:00.000Z",
  ])("rejects %p as a format that is not YYYY-MM-DD", (value) => {
    expect(() => lookBackDateClean(value)).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
  });
  test.each([
    "2026-02-31",
    "2026-13-01",
    "2026-00-10",
    "2025-02-29",
  ])("rejects %p as a date that is not on the calendar", (value) => {
    expect(() => lookBackDateClean(value)).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
  });
  test("accepts a leap day in a leap year", () => {
    expect(lookBackDateClean("2024-02-29")).toBe("2024-02-29T00:00:00.000Z");
  });
  test("rejects a future date", () => {
    const nextYear = new Date().getUTCFullYear() + 1;
    expect(() => lookBackDateClean(`${nextYear}-01-01`)).toThrow(
      "Look-back Date cannot be a future date",
    );
  });
  test.each([
    new Date("2026-01-15"),
    1737000000000,
    true,
    ["2026-01-15"],
  ])("rejects the non-string value %p", (value) => {
    expect(() => lookBackDateClean(value)).toThrow(
      "Look-back Date must be a date in YYYY-MM-DD format",
    );
  });
});
describe("fetchBackfillPage", () => {
  afterEach(() => nock.cleanAll());
  test("filters on the look-back window and orders oldest first", async () => {
    let query: Record<string, string> = {};
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((received) => {
        query = received as Record<string, string>;
        return true;
      })
      .reply(200, { files: [] });
    await fetchBackfillPage(createClient(connection), {
      modifiedAfter: "2026-01-01T00:00:00.000Z",
      driveId: "",
    });
    expect(query.q).toBe(
      "modifiedTime > '2026-01-01T00:00:00.000Z' and trashed = false",
    );
    expect(query.orderBy).toBe("modifiedTime");
    expect(query.fields).toContain("modifiedTime");
  });
  test("wraps each file as a change without inventing any field", async () => {
    nock(DRIVE)
      .get("/drive/v3/files")
      .query(true)
      .reply(200, {
        files: [
          {
            id: "file-a",
            name: "Notes.txt",
            kind: "drive#file",
            mimeType: "text/plain",
            modifiedTime: "2026-02-01T10:00:00.000Z",
          },
        ],
      });
    const { changes } = await fetchBackfillPage(createClient(connection), {
      modifiedAfter: "2026-01-01T00:00:00.000Z",
      driveId: "",
    });
    expect(changes).toEqual([
      {
        kind: "drive#change",
        changeType: "file",
        removed: false,
        fileId: "file-a",
        time: "2026-02-01T10:00:00.000Z",
        file: {
          kind: "drive#file",
          mimeType: "text/plain",
          id: "file-a",
          name: "Notes.txt",
        },
      },
    ]);
  });
  test("reports no next page when the response omits the token", async () => {
    nock(DRIVE).get("/drive/v3/files").query(true).reply(200, { files: [] });
    const page = await fetchBackfillPage(createClient(connection), {
      modifiedAfter: "2026-01-01T00:00:00.000Z",
      driveId: "",
    });
    expect(page.nextPageToken).toBeUndefined();
    expect(page.changes).toEqual([]);
  });
  test("carries the page token through and hands the next one back", async () => {
    let query: Record<string, string> = {};
    nock(DRIVE)
      .get("/drive/v3/files")
      .query((received) => {
        query = received as Record<string, string>;
        return true;
      })
      .reply(200, { nextPageToken: "files-3", files: [] });
    const page = await fetchBackfillPage(createClient(connection), {
      modifiedAfter: "2026-01-01T00:00:00.000Z",
      driveId: "",
      pageToken: "files-2",
    });
    expect(query.pageToken).toBe("files-2");
    expect(page.nextPageToken).toBe("files-3");
  });
  test("a page that omits the file array contributes nothing rather than throwing", async () => {
    nock(DRIVE).get("/drive/v3/files").query(true).reply(200, {});
    const { changes } = await fetchBackfillPage(createClient(connection), {
      modifiedAfter: "2026-01-01T00:00:00.000Z",
      driveId: "",
    });
    expect(changes).toEqual([]);
  });
});
describe("resolveListChangeItems", () => {
  test("returns the changes the round carried", () => {
    const changes = [{ fileId: "file-a" }, { fileId: "file-b" }];
    expect(resolveListChangeItems({ changes })).toEqual(changes);
  });
  test("returns an empty list when the envelope carried no changes key", () => {
    expect(resolveListChangeItems({})).toEqual([]);
  });
  test("returns an empty list when there is no envelope at all", () => {
    expect(resolveListChangeItems(undefined)).toEqual([]);
  });
});
describe("resolveDriveActivities", () => {
  test("returns the activities the round carried", () => {
    const activities = [{ timestamp: "2025-03-11T15:58:37.276Z" }];
    expect(resolveDriveActivities(activities)).toEqual(activities);
  });
  test("returns an empty list when there is no envelope at all", () => {
    expect(resolveDriveActivities(undefined)).toEqual([]);
  });
});
describe("buildActivityFilter", () => {
  test("quotes the window start as the API expects", () => {
    expect(buildActivityFilter("2026-01-01T00:00:00.000Z", [])).toBe(
      'time > "2026-01-01T00:00:00.000Z"',
    );
  });
  test("restricts to the requested action detail cases", () => {
    expect(
      buildActivityFilter("2026-01-01T00:00:00.000Z", ["CREATE", "EDIT"]),
    ).toBe(
      'time > "2026-01-01T00:00:00.000Z" AND detail.action_detail_case:(CREATE EDIT)',
    );
  });
  test("omits the action detail clause entirely when no events were selected", () => {
    expect(buildActivityFilter("2026-01-01T00:00:00.000Z", [])).not.toContain(
      "action_detail_case",
    );
  });
});
describe("fetchStartPageToken", () => {
  afterEach(() => nock.cleanAll());
  test("returns the cursor the Drive API issued", async () => {
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query(true)
      .reply(200, { startPageToken: "100" });
    expect(await fetchStartPageToken(createClient(connection), "")).toBe("100");
  });
  test("scopes the request to a shared drive when one was given", async () => {
    let query: Record<string, string> = {};
    nock(DRIVE)
      .get("/drive/v3/changes/startPageToken")
      .query((received) => {
        query = received as Record<string, string>;
        return true;
      })
      .reply(200, { startPageToken: "100" });
    await fetchStartPageToken(createClient(connection), "drive-1");
    expect(query.driveId).toBe("drive-1");
    expect(query.corpora).toBe("drive");
  });
});
describe("fetchChangesPage", () => {
  afterEach(() => nock.cleanAll());
  test("reads the requested page and returns the change list untouched", async () => {
    let query: Record<string, string> = {};
    nock(DRIVE)
      .get("/drive/v3/changes")
      .query((received) => {
        query = received as Record<string, string>;
        return true;
      })
      .reply(200, {
        kind: "drive#changeList",
        changes: [{ fileId: "file-a" }],
        nextPageToken: "2",
      });
    const data = await fetchChangesPage(createClient(connection), {
      pageToken: "1",
      driveId: "",
    });
    expect(query.pageToken).toBe("1");
    expect(query.pageSize).toBe("1000");
    expect(data.nextPageToken).toBe("2");
    expect(data.changes).toHaveLength(1);
  });
});
