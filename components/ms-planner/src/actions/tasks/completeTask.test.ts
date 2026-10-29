import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { PERCENT_COMPLETE_DONE } from "../../constants";
import { completeTaskExamplePayload } from "../../examplePayloads";
import { completeTask } from "./completeTask";

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
  etag: undefined,
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("completes the task by sending percentComplete 100 and nothing else", async () => {
  let patchedBody: unknown;
  nock(BASE).get(TASK_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(TASK_URL)
    .matchHeader("If-Match", ETAG)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, completeTaskExamplePayload.data];
    });

  const { result } = await invoke(completeTask, params);

  expect(patchedBody).toEqual({ percentComplete: PERCENT_COMPLETE_DONE });
  expect(patchedBody).toEqual({ percentComplete: 100 });
  expect(result.data).toEqual(completeTaskExamplePayload.data);
});

test("surfaces a rejected update", async () => {
  const etagScope = nock(BASE)
    .get(TASK_URL)
    .reply(200, { "@odata.etag": ETAG });
  const errorScope = nock(BASE)
    .patch(TASK_URL)
    .reply(400, { error: { code: "invalidRequest" } });

  await expect(invoke(completeTask, params)).rejects.toThrow(/status code 400/);
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);
});
