import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { DEFAULT_ORDER_HINT } from "../../constants";
import { createBucketExamplePayload } from "../../examplePayloads";
import { createBucket } from "./createBucket";
const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = {
  connection,
  groupId: undefined,
  planId: PLAN_ID,
  name: "In Review",
};
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("posts to the top-level bucket collection with the plan named in the body", async () => {
  let postedBody: unknown;
  nock(BASE)
    .post("/v1.0/planner/buckets")
    .reply((_uri, body) => {
      postedBody = body;
      return [201, createBucketExamplePayload.data];
    });
  const { result } = await invoke(createBucket, params);
  expect(postedBody).toEqual({
    name: "In Review",
    planId: PLAN_ID,
    orderHint: DEFAULT_ORDER_HINT,
  });
  expect(DEFAULT_ORDER_HINT).toBe(" !");
  expect(result.data).toEqual(createBucketExamplePayload.data);
});
test("surfaces a rejected create", async () => {
  const errorScope = nock(BASE)
    .post("/v1.0/planner/buckets")
    .reply(400, { error: { code: "invalidRequest" } });
  await expect(invoke(createBucket, params)).rejects.toThrow(/status code 400/);
  expect(errorScope.isDone()).toBe(true);
});
