import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { deleteTask } from "./deleteTask";

const BASE = "https://graph.microsoft.com";
const URL_PATH = "/v1.0/planner/tasks/01gzSlKkIUSUl6DF_EilrmQAKDhh";
const ETAG = 'W/"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="';

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
  etag: undefined,
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("reads the current etag, then deletes the task with If-Match", async () => {
  const sentIfMatch: string[] = [];
  nock(BASE).get(URL_PATH).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .delete(URL_PATH)
    .matchHeader("If-Match", (value) => {
      sentIfMatch.push(value as string);
      return true;
    })
    .reply(204);

  const { result } = await invoke(deleteTask, params);

  expect(sentIfMatch).toEqual([ETAG]);
  expect(result.data).toEqual({
    success: true,
    id: "01gzSlKkIUSUl6DF_EilrmQAKDhh",
    message: "Task deleted successfully",
  });
});

test("honors a caller-supplied etag without reading the current one", async () => {
  const readScope = nock(BASE)
    .get(URL_PATH)
    .reply(200, { "@odata.etag": ETAG });
  nock(BASE).delete(URL_PATH).matchHeader("If-Match", ETAG).reply(204);

  await invoke(deleteTask, { ...params, etag: ETAG });

  expect(readScope.isDone()).toBe(false);
});

test("surfaces a rejected delete", async () => {
  const etagScope = nock(BASE)
    .get(URL_PATH)
    .reply(200, { "@odata.etag": ETAG });
  const errorScope = nock(BASE)
    .delete(URL_PATH)
    .reply(403, { error: { code: "accessDenied" } });

  await expect(invoke(deleteTask, params)).rejects.toThrow(/status code 403/);
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);
});
