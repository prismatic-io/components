import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { afterEach, beforeAll, expect, test } from "vitest";
import { templatedOauth } from "../../connections";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";
const BASE = "https://graph.microsoft.com";
const connection = createConnection(
  templatedOauth,
  {},
  { access_token: "test-token" },
);
beforeAll(() => {
  nock.disableNetConnect();
});
afterEach(() => {
  nock.cleanAll();
});
test("forwards the method, path and headers and returns the response untouched", async () => {
  const sent: {
    path?: string;
    accept?: string;
    contentType?: string;
    auth?: string;
    ifMatch?: string;
  } = {};
  nock(BASE)
    .get("/v1.0/planner/plans")
    .query({ $top: "5" })
    .reply(function () {
      sent.path = this.req.path;
      sent.accept = this.req.headers.accept as string;
      sent.contentType = this.req.headers["content-type"] as string;
      sent.auth = this.req.headers.authorization as string;
      sent.ifMatch = this.req.headers["if-match"] as string;
      return [200, rawRequestExamplePayload.data];
    });
  const { result } = await invoke(rawRequest, {
    connection,
    url: "/planner/plans",
    method: "GET",
    data: undefined,
    formData: [],
    fileData: [],
    fileDataFileNames: {},
    queryParams: [{ key: "$top", value: "5" }],
    headers: [
      { key: "If-Match", value: 'W/"JzEtUGxhbiAgQEBAQEBAQEBAQEBAQEBAWCc="' },
      { key: "Content-Type", value: "text/plain" },
    ],
    responseType: "json",
    timeout: 0,
    retryDelayMS: 0,
    retryAllErrors: false,
    maxRetries: 0,
    useExponentialBackoff: false,
  });
  expect(sent.path).toBe("/v1.0/planner/plans?$top=5");
  expect(sent.accept).toBe("application/json");
  expect(sent.contentType).toBe("text/plain");
  expect(sent.auth).toBe("Bearer test-token");
  expect(sent.ifMatch).toBe('W/"JzEtUGxhbiAgQEBAQEBAQEBAQEBAQEBAWCc="');
  expect(result.data).toEqual(rawRequestExamplePayload.data);
});
