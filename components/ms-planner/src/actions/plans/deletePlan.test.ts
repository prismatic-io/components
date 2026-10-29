import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { deletePlan } from "./deletePlan";
const BASE = "https://graph.microsoft.com";
const URL_PATH = "/v1.0/planner/plans/xqQg5FS2LkCp935s-FIFm2QAFkHM";
const ETAG = 'W/"JzEtUGxhbiAgQEBAQEBAQEBAQEBAQEBAWCc="';
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = {
  connection,
  groupId: undefined,
  planId: "xqQg5FS2LkCp935s-FIFm2QAFkHM",
  etag: undefined,
};
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("reads the current etag, then deletes the plan with If-Match", async () => {
  const sentIfMatch: string[] = [];
  nock(BASE).get(URL_PATH).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .delete(URL_PATH)
    .matchHeader("If-Match", (value) => {
      sentIfMatch.push(value as string);
      return true;
    })
    .reply(204);
  const { result } = await invoke(deletePlan, params);
  expect(sentIfMatch).toEqual([ETAG]);
  expect(result.data).toEqual({
    success: true,
    id: "xqQg5FS2LkCp935s-FIFm2QAFkHM",
    message: "Plan deleted successfully",
  });
});
test("honors a caller-supplied etag without reading the current one", async () => {
  const readScope = nock(BASE)
    .get(URL_PATH)
    .reply(200, { "@odata.etag": ETAG });
  nock(BASE).delete(URL_PATH).matchHeader("If-Match", ETAG).reply(204);
  await invoke(deletePlan, { ...params, etag: ETAG });
  expect(readScope.isDone()).toBe(false);
});
test("surfaces a rejected delete", async () => {
  const etagScope = nock(BASE)
    .get(URL_PATH)
    .reply(200, { "@odata.etag": ETAG });
  const errorScope = nock(BASE)
    .delete(URL_PATH)
    .reply(403, { error: { code: "accessDenied" } });
  await expect(invoke(deletePlan, params)).rejects.toThrow(/status code 403/);
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);
});
