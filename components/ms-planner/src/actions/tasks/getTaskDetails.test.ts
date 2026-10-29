import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { getTaskDetailsExamplePayload } from "../../examplePayloads";
import { getTaskDetails } from "./getTaskDetails";
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
test("returns the task details the service sent", async () => {
  nock(BASE)
    .get("/v1.0/planner/tasks/01gzSlKkIUSUl6DF_EilrmQAKDhh/details")
    .reply(200, getTaskDetailsExamplePayload.data);
  const { result } = await invoke(getTaskDetails, params);
  expect(result.data).toEqual(getTaskDetailsExamplePayload.data);
});
test("surfaces a failed lookup", async () => {
  const errorScope = nock(BASE)
    .get("/v1.0/planner/tasks/01gzSlKkIUSUl6DF_EilrmQAKDhh/details")
    .reply(404, { error: { code: "itemNotFound" } });
  await expect(invoke(getTaskDetails, params)).rejects.toThrow(
    /status code 404/,
  );
  expect(errorScope.isDone()).toBe(true);
});
