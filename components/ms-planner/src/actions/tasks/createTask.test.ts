import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import {
  DEFAULT_ORDER_HINT,
  ODATA_TYPE,
  PLANNER_ENDPOINTS,
} from "../../constants";
import { createTaskExamplePayload } from "../../examplePayloads";
import { createTask } from "./createTask";

const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const TASK_ID = "01gzSlKkIUSUl6DF_EilrmQAKDhh";
const TASKS_URL = `/v1.0${PLANNER_ENDPOINTS.TASKS}`;
const DETAILS_URL = `/v1.0${PLANNER_ENDPOINTS.TASK_DETAILS(TASK_ID)}`;

const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);

const exampleTask = createTaskExamplePayload.data.task;
const exampleDetails = createTaskExamplePayload.data.details;

const baseParams = {
  connection,
  groupId: undefined,
  planId: PLAN_ID,
  bucketId: undefined,
  title: "Update the client list",
  assignment: { assignTo: [], unassign: [] },
  schedule: { startDateTime: undefined, dueDateTime: undefined },
  priority: undefined,
  percentComplete: undefined,
  categories: { applyCategories: [], removeCategories: [] },
  description: undefined,
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("creates the task, then writes the description to its details resource", async () => {
  let postedBody: unknown;
  nock(BASE)
    .post(TASKS_URL)
    .reply((_uri, body) => {
      postedBody = body;
      return [201, exampleTask];
    });
  nock(BASE)
    .get(DETAILS_URL)
    .reply(200, { "@odata.etag": exampleDetails?.["@odata.etag"] });

  let patchedBody: unknown;
  nock(BASE)
    .patch(DETAILS_URL)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, exampleDetails];
    });

  const { result } = await invoke(createTask, {
    ...baseParams,
    description: "Confirm every contact before the launch.",
  });

  expect(postedBody).toEqual({
    planId: PLAN_ID,
    title: "Update the client list",
  });
  expect(patchedBody).toEqual({
    description: "Confirm every contact before the launch.",
  });
  expect(result.data).toEqual({ task: exampleTask, details: exampleDetails });
});

test("skips the details write entirely when no description is supplied", async () => {
  nock(BASE).post(TASKS_URL).reply(201, exampleTask);
  const detailsScope = nock(BASE).get(DETAILS_URL).reply(200, {});

  const { result } = await invoke(createTask, baseParams);

  expect(result.data).toEqual({ task: exampleTask, details: null });
  expect(detailsScope.isDone()).toBe(false);
});

test("sends the open-type maps and preserves a percentComplete of 0", async () => {
  let postedBody: Record<string, unknown> = {};
  nock(BASE)
    .post(TASKS_URL)
    .reply((_uri, body) => {
      postedBody = body as Record<string, unknown>;
      return [201, exampleTask];
    });

  await invoke(createTask, {
    ...baseParams,
    bucketId: "hsOf2dhOJkqyYYZEtdzDe2QAIUCR",
    priority: 5,
    percentComplete: 0,
    schedule: { startDateTime: "2024-01-15T12:00:00Z", dueDateTime: undefined },
    assignment: { assignTo: ["user-a"], unassign: ["user-b"] },
    categories: { applyCategories: ["category3"], removeCategories: [] },
  });

  expect(postedBody).toEqual({
    planId: PLAN_ID,
    title: "Update the client list",
    bucketId: "hsOf2dhOJkqyYYZEtdzDe2QAIUCR",
    priority: 5,
    percentComplete: 0,
    startDateTime: "2024-01-15T12:00:00Z",
    assignments: {
      "user-a": {
        "@odata.type": ODATA_TYPE.assignment,
        orderHint: DEFAULT_ORDER_HINT,
      },
      "user-b": null,
    },
    appliedCategories: { category3: true },
  });
});

test("throws after the task already exists when the details write is rejected", async () => {
  const taskScope = nock(BASE).post(TASKS_URL).reply(201, exampleTask);
  const etagScope = nock(BASE)
    .get(DETAILS_URL)
    .reply(200, { "@odata.etag": exampleDetails?.["@odata.etag"] });
  const errorScope = nock(BASE)
    .patch(DETAILS_URL)
    .reply(400, { error: { code: "invalidRequest" } });

  await expect(
    invoke(createTask, {
      ...baseParams,
      description: "Confirm every contact.",
    }),
  ).rejects.toThrow(/status code 400/);
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);

  expect(taskScope.isDone()).toBe(true);
});
