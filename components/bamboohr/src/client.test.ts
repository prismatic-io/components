import nock from "nock";
import { afterAll, afterEach, beforeAll, describe, expect, test } from "vitest";
import { createBambooClient } from "./client";
import { MAX_RETRIES } from "./constants";
import { BAMBOO_HOST, GATEWAY, testConnection } from "./testHelpers";

const TABLE_URL = "/v1_1/employees/42/tables/jobInfo";
const TABLE_PATH = `${GATEWAY}${TABLE_URL}`;
const ROW = { jobTitle: "Senior Developer" };

const client = () => createBambooClient(testConnection, false);
const connectionReset = (): Error =>
  Object.assign(new Error("socket hang up"), { code: "ECONNRESET" });

beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

describe("createBambooClient", () => {
  test("sends Basic auth built from the API key to the company gateway", async () => {
    nock(BAMBOO_HOST, {
      reqheaders: { authorization: "Basic dGVzdC1hcGkta2V5Ong=" },
    })
      .get(`${GATEWAY}/v1/meta/tables`)
      .reply(200, []);
    const { status } = await client().get("/v1/meta/tables");
    expect(status).toBe(200);
  });

  test("appends the X-BambooHR-Error-Message header to the error message", async () => {
    nock(BAMBOO_HOST).post(TABLE_PATH, ROW).reply(400, "", {
      "X-BambooHR-Error-Message": 'Couldn\'t find jobTitle: "Senior Developer"',
    });
    await expect(client().post(TABLE_URL, ROW)).rejects.toThrow(
      'Request failed with status code 400: Couldn\'t find jobTitle: "Senior Developer"',
    );
  });

  test("leaves the message unchanged when the header is absent", async () => {
    nock(BAMBOO_HOST).post(TABLE_PATH, ROW).reply(404, "");
    await expect(client().post(TABLE_URL, ROW)).rejects.toThrow(
      /^Request failed with status code 404$/,
    );
  });

  test("retries a 429 after Retry-After and returns the later success", async () => {
    nock(BAMBOO_HOST)
      .post(TABLE_PATH, ROW)
      .reply(429, "", { "Retry-After": "0" })
      .post(TABLE_PATH, ROW)
      .reply(200, "");
    const { status } = await client().post(TABLE_URL, ROW);
    expect(status).toBe(200);
    expect(nock.isDone()).toBe(true);
  });

  test("gives up after MAX_RETRIES retries on a persistent 429", async () => {
    const scope = nock(BAMBOO_HOST)
      .post(TABLE_PATH, ROW)
      .times(MAX_RETRIES + 1)
      .reply(429, "", { "Retry-After": "0" });
    await expect(client().post(TABLE_URL, ROW)).rejects.toThrow(
      /^Request failed with status code 429$/,
    );
    expect(scope.isDone()).toBe(true);
  });

  test("appends the header detail once when a 429 is retried", async () => {
    nock(BAMBOO_HOST)
      .post(TABLE_PATH, ROW)
      .times(MAX_RETRIES + 1)
      .reply(429, "", {
        "Retry-After": "0",
        "X-BambooHR-Error-Message": "Rate limit exceeded",
      });
    const error = await client()
      .post(TABLE_URL, ROW)
      .catch((e: Error) => e);
    expect((error as Error).message).toBe(
      "Request failed with status code 429: Rate limit exceeded",
    );
  });

  test("retries a GET that hit a network error and returns the later success", async () => {
    nock(BAMBOO_HOST)
      .get(`${GATEWAY}/v1/meta/tables`)
      .replyWithError(connectionReset())
      .get(`${GATEWAY}/v1/meta/tables`)
      .reply(200, []);
    const { status } = await client().get("/v1/meta/tables");
    expect(status).toBe(200);
    expect(nock.isDone()).toBe(true);
  });

  test("does not retry a POST that hit a network error", async () => {
    const scope = nock(BAMBOO_HOST)
      .post(TABLE_PATH, ROW)
      .times(1)
      .replyWithError(connectionReset());
    await expect(client().post(TABLE_URL, ROW)).rejects.toThrow(
      "socket hang up",
    );
    expect(scope.isDone()).toBe(true);
  });

  test("does not retry a 500", async () => {
    const scope = nock(BAMBOO_HOST)
      .post(TABLE_PATH, ROW)
      .times(1)
      .reply(500, "");
    await expect(client().post(TABLE_URL, ROW)).rejects.toThrow(
      /^Request failed with status code 500$/,
    );
    expect(scope.isDone()).toBe(true);
  });
});
