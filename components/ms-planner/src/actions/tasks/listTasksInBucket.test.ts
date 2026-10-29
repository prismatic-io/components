import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { listTasksInBucketExamplePayload } from "../../examplePayloads";
import { listTasksInBucket } from "./listTasksInBucket";

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

test("returns every task the paged walk collected", async () => {
  nock(BASE)
    .get("/v1.0/planner/buckets/hsOf2dhOJkqyYYZEtdzDe2QAIUCR/tasks")
    .reply(200, listTasksInBucketExamplePayload.data);

  const { result } = await invoke(listTasksInBucket, params);

  expect(result.data).toEqual({
    ...listTasksInBucketExamplePayload.data,
    truncated: false,
  });
});

test("surfaces a failed list request", async () => {
  const errorScope = nock(BASE)
    .get("/v1.0/planner/buckets/hsOf2dhOJkqyYYZEtdzDe2QAIUCR/tasks")
    .reply(403, { error: { code: "accessDenied" } });

  await expect(invoke(listTasksInBucket, params)).rejects.toThrow(
    /status code 403/,
  );
  expect(errorScope.isDone()).toBe(true);
});
