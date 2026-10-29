import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { listBucketsInPlanExamplePayload } from "../../examplePayloads";
import { listBucketsInPlan } from "./listBucketsInPlan";
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
test("returns every bucket the paged walk collected", async () => {
  nock(BASE)
    .get("/v1.0/planner/plans/xqQg5FS2LkCp935s-FIFm2QAFkHM/buckets")
    .reply(200, listBucketsInPlanExamplePayload.data);
  const { result } = await invoke(listBucketsInPlan, params);
  expect(result.data).toEqual({
    ...listBucketsInPlanExamplePayload.data,
    truncated: false,
  });
});
test("surfaces a failed list request", async () => {
  const errorScope = nock(BASE)
    .get("/v1.0/planner/plans/xqQg5FS2LkCp935s-FIFm2QAFkHM/buckets")
    .reply(403, { error: { code: "accessDenied" } });
  await expect(invoke(listBucketsInPlan, params)).rejects.toThrow(
    /status code 403/,
  );
  expect(errorScope.isDone()).toBe(true);
});
