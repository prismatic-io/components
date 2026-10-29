import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { getPlanDetailsExamplePayload } from "../../examplePayloads";
import { getPlanDetails } from "./getPlanDetails";
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
test("returns the plan details the service sent", async () => {
  nock(BASE)
    .get("/v1.0/planner/plans/xqQg5FS2LkCp935s-FIFm2QAFkHM/details")
    .reply(200, getPlanDetailsExamplePayload.data);
  const { result } = await invoke(getPlanDetails, params);
  expect(result.data).toEqual(getPlanDetailsExamplePayload.data);
});
test("surfaces a failed lookup", async () => {
  const errorScope = nock(BASE)
    .get("/v1.0/planner/plans/xqQg5FS2LkCp935s-FIFm2QAFkHM/details")
    .reply(404, { error: { code: "itemNotFound" } });
  await expect(invoke(getPlanDetails, params)).rejects.toThrow(
    /status code 404/,
  );
  expect(errorScope.isDone()).toBe(true);
});
