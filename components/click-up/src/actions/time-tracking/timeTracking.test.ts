import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { clickUpApiKeyConnection } from "../../connections/clickUpApiKeyConnection";
import {
  createTimeEntryExamplePayload,
  getTimeEntriesWithinDateRangeExamplePayload,
  startTimeEntryExamplePayload,
  updateTimeEntryExamplePayload,
} from "../../examplePayloads";
import { createTimeEntry } from "./createTimeEntry";
import { getTimeEntriesWithinDateRange } from "./getTimeEntriesWithinDateRange";
import { startTimeEntry } from "./startTimeEntry";
import { updateTimeEntry } from "./updateTimeEntry";
const API = "https://api.clickup.com";
const connection = createConnection(clickUpApiKeyConnection, {
  apiKey: "test-key",
});
interface Captured {
  body?: unknown;
  query?: Record<string, unknown>;
  headers?: Record<string, unknown>;
}
const mockClickUp = (
  method: string,
  path: string,
  status: number,
  reply: unknown,
): Captured => {
  const captured: Captured = {};
  nock(API)
    .intercept(`/api/v2${path}`, method, (body) => {
      captured.body = body;
      return true;
    })
    .query((query) => {
      captured.query = query;
      return true;
    })
    .reply(status, function () {
      captured.headers = this.req.headers;
      return reply as nock.Body;
    });
  return captured;
};
type ActionUnderTest = {
  inputs: Record<
    string,
    {
      type?: string;
    }
  >;
  perform: unknown;
};
const run = (action: ActionUnderTest, params: Record<string, unknown>) => {
  const connectionKey = Object.keys(action.inputs).find(
    (key) => action.inputs[key].type === "connection",
  ) as string;
  return invoke(
    action as any,
    { [connectionKey]: connection, ...params } as any,
  );
};
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  const consumed = nock.isDone();
  nock.cleanAll();
  expect(consumed).toBe(true);
});
const tagsCode = JSON.stringify({
  tags: [{ name: "billable", tag_bg: "#BF55EC", tag_fg: "#FFFFFF" }],
});
describe("createTimeEntry", () => {
  const params = {
    teamId: "9012345",
    customTaskIds: false,
    customTeamId: "9012345",
    description: "Design review",
    start: 1767225600000,
    billable: true,
    duration: 3600000,
    assigneeTimeEntry: 183,
    taskId: "9hx",
    tagsCode,
  };
  test("happy path parses the tags JSON into the body and returns the response", async () => {
    const req = mockClickUp(
      "POST",
      "/team/9012345/time_entries",
      200,
      createTimeEntryExamplePayload.data,
    );
    const { result } = await run(createTimeEntry, params);
    expect(result).toEqual(createTimeEntryExamplePayload);
    expect(req.query).toEqual({ custom_task_ids: "false", team_id: "9012345" });
    expect(req.body).toEqual({
      description: "Design review",
      tags: [{ name: "billable", tag_bg: "#BF55EC", tag_fg: "#FFFFFF" }],
      start: 1767225600000,
      billable: true,
      duration: 3600000,
      assignee: 183,
      tid: "9hx",
    });
  });
});
describe("getTimeEntriesWithinDateRange", () => {
  const params = {
    teamId: "9012345",
    startDate: "1767225600000",
    endDate: "1767312000000",
    assignee: "183",
    includeTaskTags: false,
    includeLocationNames: true,
    spaceId: "",
    folderId: undefined,
    listId: "124",
    taskId: undefined,
    customTaskIds: false,
    customTeamId: undefined,
  };
  test("happy path drops empty filters and returns the time entries", async () => {
    const req = mockClickUp(
      "GET",
      "/team/9012345/time_entries",
      200,
      getTimeEntriesWithinDateRangeExamplePayload.data,
    );
    const { result } = await run(getTimeEntriesWithinDateRange, params);
    expect(result).toEqual(getTimeEntriesWithinDateRangeExamplePayload);
    expect(req.query).toEqual({
      start_date: "1767225600000",
      end_date: "1767312000000",
      assignee: "183",
      include_task_tags: "false",
      include_location_names: "true",
      list_id: "124",
      custom_task_ids: "false",
    });
  });
});
describe("startTimeEntry", () => {
  const params = {
    teamId: "9012345",
    customTaskIds: false,
    customTeamId: undefined,
    description: "Pairing",
    billable: false,
    taskId: "9hx",
    tagNamesArray: ["pairing", "review"],
  };
  test("happy path maps tag names to tag objects and returns the running entry", async () => {
    const req = mockClickUp(
      "POST",
      "/team/9012345/time_entries/start",
      200,
      startTimeEntryExamplePayload.data,
    );
    const { result } = await run(startTimeEntry, params);
    expect(result).toEqual(startTimeEntryExamplePayload);
    expect(req.query).toEqual({ custom_task_ids: "false" });
    expect(req.body).toEqual({
      description: "Pairing",
      tags: [{ name: "pairing" }, { name: "review" }],
      tid: "9hx",
      billable: false,
    });
  });
});
describe("updateTimeEntry", () => {
  const params = {
    teamId: "9012345",
    customTaskIds: false,
    customTeamId: "9012345",
    description: "Design review (extended)",
    start: 1767225600000,
    billable: true,
    duration: 5400000,
    taskId: "9hx",
    timerId: "1963465985517105840",
    tagAction: "add",
    end: 1767231000000,
    tagsCode,
  };
  test("happy path puts the time entry update and returns the response", async () => {
    const req = mockClickUp(
      "PUT",
      "/team/9012345/time_entries/1963465985517105840",
      200,
      updateTimeEntryExamplePayload.data,
    );
    const { result } = await run(updateTimeEntry, params);
    expect(result).toEqual(updateTimeEntryExamplePayload);
    expect(req.query).toEqual({ custom_task_ids: "false", team_id: "9012345" });
    expect(req.body).toEqual({
      description: "Design review (extended)",
      tags: [{ name: "billable", tag_bg: "#BF55EC", tag_fg: "#FFFFFF" }],
      start: 1767225600000,
      billable: true,
      duration: 5400000,
      tid: "9hx",
      tag_action: "add",
      end: 1767231000000,
    });
  });
});
