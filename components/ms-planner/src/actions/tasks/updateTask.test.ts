import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { DEFAULT_ORDER_HINT, ODATA_TYPE } from "../../constants";
import { updateTaskExamplePayload } from "../../examplePayloads";
import { updateTask } from "./updateTask";
const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const TASK_ID = "01gzSlKkIUSUl6DF_EilrmQAKDhh";
const TASK_URL = `/v1.0/planner/tasks/${TASK_ID}`;
const ETAG = 'W/"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="';
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = {
  connection,
  groupId: undefined,
  planId: PLAN_ID,
  taskId: TASK_ID,
  title: undefined,
  bucketId: undefined,
  assignment: { assignTo: [], unassign: [] },
  schedule: { startDateTime: undefined, dueDateTime: undefined },
  priority: undefined,
  percentComplete: undefined,
  categories: { applyCategories: [], removeCategories: [] },
  conversationThreadId: undefined,
  etag: undefined,
};
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("sends only the fields the caller actually set", async () => {
  let patchedBody: unknown;
  nock(BASE).get(TASK_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(TASK_URL)
    .matchHeader("If-Match", ETAG)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, updateTaskExamplePayload.data];
    });
  const { result } = await invoke(updateTask, {
    ...params,
    title: "Update the client list before launch",
  });
  expect(patchedBody).toEqual({
    title: "Update the client list before launch",
  });
  expect(result.data).toEqual(updateTaskExamplePayload.data);
});
test("builds the assignment and category open types and preserves a percentComplete of 0", async () => {
  let patchedBody: unknown;
  nock(BASE).get(TASK_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(TASK_URL)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, updateTaskExamplePayload.data];
    });
  await invoke(updateTask, {
    ...params,
    percentComplete: 0,
    conversationThreadId: "thread-1",
    schedule: { startDateTime: undefined, dueDateTime: "2024-01-22T12:00:00Z" },
    assignment: { assignTo: ["user-a"], unassign: [] },
    categories: { applyCategories: [], removeCategories: ["category3"] },
  });
  expect(patchedBody).toEqual({
    percentComplete: 0,
    conversationThreadId: "thread-1",
    dueDateTime: "2024-01-22T12:00:00Z",
    assignments: {
      "user-a": {
        "@odata.type": ODATA_TYPE.assignment,
        orderHint: DEFAULT_ORDER_HINT,
      },
    },
    appliedCategories: { category3: false },
  });
});
test("surfaces a rejected update", async () => {
  const etagScope = nock(BASE)
    .get(TASK_URL)
    .reply(200, { "@odata.etag": ETAG });
  const errorScope = nock(BASE)
    .patch(TASK_URL)
    .reply(400, { error: { code: "invalidRequest" } });
  await expect(invoke(updateTask, { ...params, title: "x" })).rejects.toThrow(
    /status code 400/,
  );
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);
});
