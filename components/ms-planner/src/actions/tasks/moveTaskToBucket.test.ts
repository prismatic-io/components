import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { moveTaskToBucketExamplePayload } from "../../examplePayloads";
import { moveTaskToBucket } from "./moveTaskToBucket";

const BASE = "https://graph.microsoft.com";
const PLAN_ID = "xqQg5FS2LkCp935s-FIFm2QAFkHM";
const TASK_ID = "01gzSlKkIUSUl6DF_EilrmQAKDhh";
const TASK_URL = `/v1.0/planner/tasks/${TASK_ID}`;
const DESTINATION_BUCKET_ID = "vNZfhYs0GkWQ2Bo0R0h3upcAG5rB";
const ETAG = 'W/"JzEtVGFzayAgQEBAQEBAQEBAQEBAQEBAWCc="';

const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
const params = {
  connection,
  groupId: undefined,
  planId: PLAN_ID,
  taskId: TASK_ID,
  bucketId: DESTINATION_BUCKET_ID,
  etag: undefined,
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("patches only the destination bucket id", async () => {
  let patchedBody: unknown;
  nock(BASE).get(TASK_URL).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .patch(TASK_URL)
    .matchHeader("If-Match", ETAG)
    .reply((_uri, body) => {
      patchedBody = body;
      return [200, moveTaskToBucketExamplePayload.data];
    });

  const { result } = await invoke(moveTaskToBucket, params);

  expect(patchedBody).toEqual({ bucketId: DESTINATION_BUCKET_ID });
  expect(result.data).toEqual(moveTaskToBucketExamplePayload.data);
});

test("surfaces a rejected move, such as a bucket in another plan", async () => {
  const etagScope = nock(BASE)
    .get(TASK_URL)
    .reply(200, { "@odata.etag": ETAG });
  const errorScope = nock(BASE)
    .patch(TASK_URL)
    .reply(400, { error: { code: "invalidRequest" } });

  await expect(invoke(moveTaskToBucket, params)).rejects.toThrow(
    /status code 400/,
  );
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);
});
