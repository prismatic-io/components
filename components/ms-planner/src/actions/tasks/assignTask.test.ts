import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import {
  DEFAULT_ORDER_HINT,
  ODATA_TYPE,
  PLANNER_ENDPOINTS,
} from "../../constants";
import { assignTaskExamplePayload } from "../../examplePayloads";
import { assignTask } from "./assignTask";

const BASE = "https://graph.microsoft.com";
const TASK_ID = "01gzSlKkIUSUl6DF_EilrmQAKDhh";
const TASK_URL = `/v1.0${PLANNER_ENDPOINTS.TASK(TASK_ID)}`;
const ETAG = 'W/"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="';

const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);

const baseParams = {
  connection,
  groupId: undefined,
  planId: "xqQg5FS2LkCp935s-FIFm2QAFkHM",
  taskId: TASK_ID,
  assignment: { assignTo: [], unassign: [] },
  etag: undefined,
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("patches the assignments open type with the users to add and remove", async () => {
  let patchedBody: unknown;
  nock(BASE).get(TASK_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(TASK_URL)
    .matchHeader("If-Match", ETAG)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, assignTaskExamplePayload.data];
    });

  const { result } = await invoke(assignTask, {
    ...baseParams,
    assignment: { assignTo: ["user-a"], unassign: ["user-b"] },
  });

  expect(patchedBody).toEqual({
    assignments: {
      "user-a": {
        "@odata.type": ODATA_TYPE.assignment,
        orderHint: DEFAULT_ORDER_HINT,
      },
      "user-b": null,
    },
  });
  expect(result.data).toEqual(assignTaskExamplePayload.data);
});

test("honors a caller-supplied etag without reading the current one", async () => {
  const readScope = nock(BASE)
    .get(TASK_URL)
    .reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(TASK_URL)
    .matchHeader("If-Match", ETAG)
    .reply(200, assignTaskExamplePayload.data);

  await invoke(assignTask, {
    ...baseParams,
    assignment: { assignTo: ["user-a"], unassign: [] },
    etag: ETAG,
  });

  expect(readScope.isDone()).toBe(false);
});

test("throws before any HTTP call when both assignment lists are empty", async () => {
  const readScope = nock(BASE)
    .get(TASK_URL)
    .reply(200, { "@odata.etag": ETAG });
  const writeScope = nock(BASE).patch(TASK_URL).reply(200, {});

  await expect(
    invoke(assignTask, {
      ...baseParams,
      assignment: { assignTo: [], unassign: [] },
    }),
  ).rejects.toThrow(/at least one user to assign or unassign/);

  expect(readScope.isDone()).toBe(false);
  expect(writeScope.isDone()).toBe(false);
});

test("throws when a user appears in both lists, because the collision resolves to a removal", async () => {
  let patchedBody: unknown;
  nock(BASE).get(TASK_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(TASK_URL)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, assignTaskExamplePayload.data];
    });

  await invoke(assignTask, {
    ...baseParams,
    assignment: { assignTo: ["user-a"], unassign: ["user-a"] },
  });

  expect(patchedBody).toEqual({ assignments: { "user-a": null } });
});
