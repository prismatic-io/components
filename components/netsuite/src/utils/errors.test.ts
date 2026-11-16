import type { Connection } from "@prismatic-io/spectral";
import nock from "nock";
import { createClient } from "../client";
import { handleNetSuiteErrors, netSuiteRetryConfig } from "./errors";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";

const oauthConnection: Connection = {
  key: "oauth",
  configVarKey: "NetSuite Connection",
  fields: {
    tokenUrl: `${ORIGIN}/services/rest/auth/oauth2/v1/token`,
  },
  token: { access_token: "access-token" },
};

const errorBody = {
  type: "https://www.rfc-editor.org/rfc/rfc9110.html#section-15.5.1",
  title: "Bad Request",
  status: 400,
  "o:errorDetails": [
    {
      detail:
        "Invalid value for the resource or sub-resource field 'subsidiary'.",
      "o:errorPath": "subsidiary",
      "o:errorCode": "INVALID_VALUE",
    },
    {
      detail: "Please enter a value for Company Name.",
      "o:errorCode": "USER_ERROR",
    },
  ],
};

const captureError = async (request: Promise<unknown>): Promise<unknown> => {
  try {
    await request;
  } catch (error) {
    return error;
  }
  throw new Error("Expected the request to fail.");
};

describe("netSuiteRetryConfig", () => {
  const errorWith = (status?: number, method = "post") => ({
    config: { method },
    response: status === undefined ? undefined : { status },
  });

  test.each([
    ["a 429 on a POST", errorWith(429, "post"), true],
    ["a 429 on a GET", errorWith(429, "get"), true],
    ["a 400", errorWith(400), false],
    ["a 500", errorWith(500), false],
    ["a network failure", errorWith(undefined), false],
  ])("retries %s: %s", (_label, error, expected) => {
    expect(netSuiteRetryConfig.retryCondition(error)).toBe(expected);
  });

  test("backs off exponentially with jitter", () => {
    for (const [attempt, base] of [
      [1, 1000],
      [2, 2000],
      [3, 4000],
    ]) {
      const delay = netSuiteRetryConfig.retryDelay(attempt);
      expect(delay).toBeGreaterThanOrEqual(base);
      expect(delay).toBeLessThan(base + 500);
    }
  });
});

describe("createClient", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("retries a request NetSuite rejects with CONCURRENCY_LIMIT_EXCEEDED", async () => {
    nock(ORIGIN)
      .post("/services/rest/record/v1/customer")
      .reply(429, {
        "o:errorDetails": [
          {
            detail: "Concurrent request limit exceeded.",
            "o:errorCode": "CONCURRENCY_LIMIT_EXCEEDED",
          },
        ],
      })
      .post("/services/rest/record/v1/customer")
      .reply(204, "", {
        location: `${ORIGIN}/services/rest/record/v1/customer/107`,
      });

    const client = await createClient(oauthConnection, "record");
    const { status } = await client.post("/customer", { companyname: "Acme" });

    expect(status).toBe(204);
    expect(nock.isDone()).toBe(true);
  });
});

describe("handleNetSuiteErrors", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("builds the message from NetSuite's error codes and details", async () => {
    nock(ORIGIN)
      .post("/services/rest/record/v1/customer")
      .reply(400, errorBody);
    const client = await createClient(oauthConnection, "record");

    const handled = handleNetSuiteErrors(
      await captureError(client.post("/customer", {})),
    ) as Record<string, unknown>;

    expect(handled).toMatchObject({ status: 400, data: errorBody });
    expect(handled.message).toBe(
      "Request failed with status code 400: INVALID_VALUE: Invalid value for the resource or sub-resource field 'subsidiary'.; USER_ERROR: Please enter a value for Company Name.",
    );
  });

  test("keeps spectral's message when the body carries no NetSuite error details", async () => {
    nock(ORIGIN)
      .get("/services/rest/record/v1/customer/1")
      .reply(502, "Bad Gateway");
    const client = await createClient(oauthConnection, "record");

    const handled = handleNetSuiteErrors(
      await captureError(client.get("/customer/1")),
    ) as Record<string, unknown>;

    expect(handled).toMatchObject({
      status: 502,
      message: "Request failed with status code 502",
    });
  });

  test("returns an error that is not an HTTP error unchanged", () => {
    const error = new Error("Unexpected Record Type: widget");
    expect(handleNetSuiteErrors(error)).toBe(error);
  });
});
