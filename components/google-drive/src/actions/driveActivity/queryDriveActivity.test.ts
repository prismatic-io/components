import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import { queryDriveActivityExamplePayload } from "../../examplePayloads";
import { queryDriveActivity } from "./queryDriveActivity";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const ACTIVITY = "https://driveactivity.googleapis.com";
const baseParams = {
  connection,
  itemName: undefined,
  ancestorName: undefined,
  pageToken: undefined,
  filter: undefined,
  consolidationStrategy: undefined,
};
describe("queryDriveActivity", () => {
  afterEach(() => nock.cleanAll());
  test("fetchAll false returns only the first page", async () => {
    const activity = queryDriveActivityExamplePayload.data.activities[0];
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { activities: [activity], nextPageToken: "p2" });
    const { result } = await invoke(queryDriveActivity, {
      ...baseParams,
      fetchAll: false,
    });
    expect(result.data).toEqual({
      activities: [activity],
      nextPageToken: "p2",
    });
  });
  test("fetchAll true concatenates every page's activities but leaves nextPageToken stale", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, {
        activities: [{ timestamp: "2025-03-11T15:58:37.276Z" }],
        nextPageToken: "next-1",
      });
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { activities: [{ timestamp: "2025-03-12T09:00:00.000Z" }] });
    const { result } = await invoke(queryDriveActivity, {
      ...baseParams,
      fetchAll: true,
    });
    expect((result.data as Record<string, unknown>).activities).toEqual([
      { timestamp: "2025-03-11T15:58:37.276Z" },
      { timestamp: "2025-03-12T09:00:00.000Z" },
    ]);
    expect((result.data as Record<string, unknown>).nextPageToken).toBe(
      "next-1",
    );
  });
  test("fetchAll true walks past a first page that carries no activities array", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { nextPageToken: "next-1" });
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { activities: [{ timestamp: "2025-03-12T09:00:00.000Z" }] });
    const { result } = await invoke(queryDriveActivity, {
      ...baseParams,
      fetchAll: true,
    });
    expect((result.data as Record<string, unknown>).activities).toEqual([
      { timestamp: "2025-03-12T09:00:00.000Z" },
    ]);
  });
  test("fetchAll true walks past a later page that carries no activities array", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, {
        activities: [{ timestamp: "2025-03-11T15:58:37.276Z" }],
        nextPageToken: "next-1",
      });
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { nextPageToken: "next-2" });
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { activities: [{ timestamp: "2025-03-13T09:00:00.000Z" }] });
    const { result } = await invoke(queryDriveActivity, {
      ...baseParams,
      fetchAll: true,
    });
    expect((result.data as Record<string, unknown>).activities).toEqual([
      { timestamp: "2025-03-11T15:58:37.276Z" },
      { timestamp: "2025-03-13T09:00:00.000Z" },
    ]);
  });
  test("fetchAll true leaves the response untouched when a lone page matched nothing", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(200, { kind: "drive#activityList" });
    const { result } = await invoke(queryDriveActivity, {
      ...baseParams,
      fetchAll: true,
    });
    expect(result.data).toEqual({ kind: "drive#activityList" });
    expect(result.data).not.toHaveProperty("activities");
  });
  test("surfaces an API error", async () => {
    nock(ACTIVITY)
      .post("/v2/activity:query")
      .reply(500, { error: { message: "Server error" } });
    await expect(
      invoke(queryDriveActivity, { ...baseParams, fetchAll: false }),
    ).rejects.toThrow();
  });
});
