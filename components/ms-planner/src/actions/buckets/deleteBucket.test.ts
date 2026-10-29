import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { deleteBucket } from "./deleteBucket";

const BASE = "https://graph.microsoft.com";
const URL_PATH = "/v1.0/planner/buckets/hsOf2dhOJkqyYYZEtdzDe2QAIUCR";
const ETAG = 'W/"JzEtQnVja2V0QEBAQEBAQEBAQEBAQEBAQEBAWCc="';

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
  etag: undefined,
};

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

test("reads the current etag, then deletes the bucket with If-Match", async () => {
  const sentIfMatch: string[] = [];
  nock(BASE).get(URL_PATH).reply(200, { "@odata.etag": ETAG });
  nock(BASE)
    .delete(URL_PATH)
    .matchHeader("If-Match", (value) => {
      sentIfMatch.push(value as string);
      return true;
    })
    .reply(204);

  const { result } = await invoke(deleteBucket, params);

  expect(sentIfMatch).toEqual([ETAG]);
  expect(result.data).toEqual({
    success: true,
    id: "hsOf2dhOJkqyYYZEtdzDe2QAIUCR",
    message: "Bucket deleted successfully",
  });
});

test("honors a caller-supplied etag without reading the current one", async () => {
  const readScope = nock(BASE)
    .get(URL_PATH)
    .reply(200, { "@odata.etag": ETAG });
  nock(BASE).delete(URL_PATH).matchHeader("If-Match", ETAG).reply(204);

  await invoke(deleteBucket, { ...params, etag: ETAG });

  expect(readScope.isDone()).toBe(false);
});

test("surfaces a rejected delete", async () => {
  const etagScope = nock(BASE)
    .get(URL_PATH)
    .reply(200, { "@odata.etag": ETAG });
  const errorScope = nock(BASE)
    .delete(URL_PATH)
    .reply(403, { error: { code: "accessDenied" } });

  await expect(invoke(deleteBucket, params)).rejects.toThrow(/status code 403/);
  expect(etagScope.isDone()).toBe(true);
  expect(errorScope.isDone()).toBe(true);
});
