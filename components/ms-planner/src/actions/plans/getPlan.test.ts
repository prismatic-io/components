import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { getPlanExamplePayload } from "../../examplePayloads";
import { getPlan } from "./getPlan";
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
};
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("returns the plan the service sent", async () => {
  nock(BASE)
    .get("/v1.0/planner/plans/xqQg5FS2LkCp935s-FIFm2QAFkHM")
    .reply(200, getPlanExamplePayload.data);
  const { result } = await invoke(getPlan, params);
  expect(result.data).toEqual(getPlanExamplePayload.data);
});
test("surfaces a failed lookup", async () => {
  const errorScope = nock(BASE)
    .get("/v1.0/planner/plans/xqQg5FS2LkCp935s-FIFm2QAFkHM")
    .reply(404, { error: { code: "itemNotFound" } });
  await expect(invoke(getPlan, params)).rejects.toThrow(/status code 404/);
  expect(errorScope.isDone()).toBe(true);
});
