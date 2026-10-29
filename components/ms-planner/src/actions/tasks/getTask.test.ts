import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { getTaskExamplePayload } from "../../examplePayloads";
import { getTask } from "./getTask";
const BASE = "https://graph.microsoft.com";
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = {
  connection,
  groupId: undefined,
  planId: "xqQg5FS2LkCp935s-FIFm2QAFkHM",
  taskId: "01gzSlKkIUSUl6DF_EilrmQAKDhh",
};
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("returns the task the service sent", async () => {
  nock(BASE)
    .get("/v1.0/planner/tasks/01gzSlKkIUSUl6DF_EilrmQAKDhh")
    .reply(200, getTaskExamplePayload.data);
  const { result } = await invoke(getTask, params);
  expect(result.data).toEqual(getTaskExamplePayload.data);
});
test("surfaces a failed lookup", async () => {
  const errorScope = nock(BASE)
    .get("/v1.0/planner/tasks/01gzSlKkIUSUl6DF_EilrmQAKDhh")
    .reply(404, { error: { code: "itemNotFound" } });
  await expect(invoke(getTask, params)).rejects.toThrow(/status code 404/);
  expect(errorScope.isDone()).toBe(true);
});
