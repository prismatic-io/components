import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { getBucketExamplePayload } from "../../examplePayloads";
import { getBucket } from "./getBucket";

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
  bucketId: "hsOf2dhOJkqyYYZEtdzDe2QAIUCR",
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("returns the bucket the service sent", async () => {
  nock(BASE)
    .get("/v1.0/planner/buckets/hsOf2dhOJkqyYYZEtdzDe2QAIUCR")
    .reply(200, getBucketExamplePayload.data);

  const { result } = await invoke(getBucket, params);

  expect(result.data).toEqual(getBucketExamplePayload.data);
});

test("surfaces a failed lookup", async () => {
  const errorScope = nock(BASE)
    .get("/v1.0/planner/buckets/hsOf2dhOJkqyYYZEtdzDe2QAIUCR")
    .reply(404, { error: { code: "itemNotFound" } });

  await expect(invoke(getBucket, params)).rejects.toThrow(/status code 404/);
  expect(errorScope.isDone()).toBe(true);
});
