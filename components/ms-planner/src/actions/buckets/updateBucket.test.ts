import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { updateBucketExamplePayload } from "../../examplePayloads";
import { updateBucket } from "./updateBucket";

const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const BUCKET_ID = "hsOf2dhOJkqyYYZEtdzDe2QAIUCR";
const BUCKET_URL = `/v1.0/planner/buckets/${BUCKET_ID}`;
const ETAG = 'W/"JzEtQnVja2V0QEBAQEBAQEBAQEBAQEBAQEBAWCc="';

const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = {
  connection,
  groupId: undefined,
  planId: PLAN_ID,
  bucketId: BUCKET_ID,
  name: "Ready to Ship",
  etag: undefined,
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("renames the bucket with the current etag as If-Match", async () => {
  let patchedBody: unknown;
  nock(BASE).get(BUCKET_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(BUCKET_URL)
    .matchHeader("If-Match", ETAG)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, updateBucketExamplePayload.data];
    });

  const { result } = await invoke(updateBucket, params);

  expect(patchedBody).toEqual({ name: "Ready to Ship" });
  expect(result.data).toEqual(updateBucketExamplePayload.data);
});

test("surfaces a rejected update", async () => {
  const etagScope = nock(BASE)
    .get(BUCKET_URL)
    .reply(200, { "@odata.etag": ETAG });
  const errorScope = nock(BASE)
    .patch(BUCKET_URL)
    .reply(400, { error: { code: "invalidRequest" } });

  await expect(invoke(updateBucket, params)).rejects.toThrow(/status code 400/);
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);
});
