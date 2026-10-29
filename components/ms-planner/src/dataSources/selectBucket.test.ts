import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../connections";
import { PLANNER_ENDPOINTS } from "../constants";
import { listBucketsInPlanExamplePayload } from "../examplePayloads";
import { selectBucket } from "./selectBucket";
const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const BUCKETS_URL = `/v1.0${PLANNER_ENDPOINTS.PLAN_BUCKETS(PLAN_ID)}`;
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const buckets = listBucketsInPlanExamplePayload.data;
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("lists a plan's buckets as picklist entries", async () => {
  nock(BASE).get(BUCKETS_URL).reply(200, buckets);
  const { result } = await invokeDataSource(selectBucket, {
    connection,
    planId: PLAN_ID,
  });
  expect(result).toEqual([{ label: "In Review", key: buckets.value[0].id }]);
});
test("returns an empty picklist when the plan has no buckets", async () => {
  nock(BASE).get(BUCKETS_URL).reply(200, { value: [] });
  const { result } = await invokeDataSource(selectBucket, {
    connection,
    planId: PLAN_ID,
  });
  expect(result).toEqual([]);
});
