import { createConnection, loggerMock } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { createClient } from "../client";
import { oauth } from "../connections";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  googleAdsSearchPath,
} from "../constants";
import {
  describeGoogleAdsError,
  googleAdsRetryConfig,
  handleGoogleAdsErrors,
} from "./errors";

vi.mock("../constants", async (importOriginal) => ({
  ...(await importOriginal<typeof import("../constants")>()),
  GOOGLE_ADS_RETRY_BASE_DELAY_MS: 0,
  GOOGLE_ADS_RETRY_MAX_JITTER_MS: 0,
}));

const CUSTOMER_ID = "1234567890";
const SEARCH_PATH = `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(CUSTOMER_ID)}`;
const MUTATE_PATH = `/${GOOGLE_ADS_API_VERSION}/customers/${CUSTOMER_ID}/campaigns:mutate`;
const REQUEST_ID = "AbCdEfGhIjKlMnOpQrStUv";

const connection = createConnection(
  oauth,
  {},
  { access_token: "test-access-token" },
);

const googleAdsFailure = (category: string, code: string, message: string) => ({
  error: {
    code: 400,
    message: "Request contains an invalid argument.",
    status: "INVALID_ARGUMENT",
    details: [
      {
        "@type":
          "type.googleapis.com/google.ads.googleads.v26.errors.GoogleAdsFailure",
        errors: [{ errorCode: { [category]: code }, message }],
        requestId: REQUEST_ID,
      },
    ],
  },
});

const rateLimited = googleAdsFailure(
  "quotaError",
  "RESOURCE_TEMPORARILY_EXHAUSTED",
  "Too many requests. Retry in 2 seconds.",
);
const transient = googleAdsFailure(
  "internalError",
  "TRANSIENT_ERROR",
  "The request could not be completed. Retry it.",
);
const dailyQuota = googleAdsFailure(
  "quotaError",
  "RESOURCE_EXHAUSTED",
  "The daily operation limit was reached.",
);
const testAccessOnly = googleAdsFailure(
  "authorizationError",
  "CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION",
  "The Google Cloud project is not approved for production access.",
);

const client = () =>
  createClient({ connection, debugEnabled: false, logger: loggerMock() });

describe("googleAdsRetryConfig.retryCondition", () => {
  const search = { method: "post", url: googleAdsSearchPath(CUSTOMER_ID) };
  const mutate = { method: "post", url: "/customers/1/campaigns:mutate" };
  const get = { method: "get", url: "/customers:listAccessibleCustomers" };

  test.each([
    ["a search", search, rateLimited, true],
    ["a search", search, transient, true],
    ["a GET", get, transient, true],
    ["a mutate", mutate, rateLimited, true],
    ["a mutate", mutate, transient, false],
    ["a search", search, dailyQuota, false],
    ["a search", search, testAccessOnly, false],
  ])("%s failing with %#", (_, config, body, expected) => {
    expect(
      googleAdsRetryConfig.retryCondition({ config, response: { data: body } }),
    ).toBe(expected);
  });

  test("retries a network failure on a read but not on a write", () => {
    expect(googleAdsRetryConfig.retryCondition({ config: search })).toBe(true);
    expect(googleAdsRetryConfig.retryCondition({ config: mutate })).toBe(false);
  });
});

describe("client retries", () => {
  afterEach(() => nock.cleanAll());

  test("a rate-limited search succeeds on the retry", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH)
      .reply(429, rateLimited)
      .post(SEARCH_PATH)
      .reply(200, { results: [] });

    const { data } = await client().post(googleAdsSearchPath(CUSTOMER_ID), {
      query: "SELECT customer.id FROM customer",
    });

    expect(data).toEqual({ results: [] });
    expect(scope.isDone()).toBe(true);
  });

  test("a mutate that hits a transient error is sent once", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(MUTATE_PATH)
      .reply(500, transient);
    const retry = nock(GOOGLE_ADS_BASE_URL)
      .post(MUTATE_PATH)
      .reply(200, { results: [] });

    await expect(
      client().post(`/customers/${CUSTOMER_ID}/campaigns:mutate`, {}),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
    expect(retry.isDone()).toBe(false);
  });

  test("a search over the daily quota is sent once", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH)
      .reply(429, dailyQuota);
    const retry = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH)
      .reply(200, { results: [] });

    await expect(
      client().post(googleAdsSearchPath(CUSTOMER_ID), { query: "x" }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
    expect(retry.isDone()).toBe(false);
  });
});

describe("error messages", () => {
  afterEach(() => nock.cleanAll());

  const failedSearch = async (body: Record<string, unknown>, headers = {}) => {
    nock(GOOGLE_ADS_BASE_URL).post(SEARCH_PATH).reply(403, body, headers);
    return client()
      .post(googleAdsSearchPath(CUSTOMER_ID), { query: "x" })
      .then(
        () => {
          throw new Error("expected the request to fail");
        },
        (error: unknown) => error,
      );
  };

  test("names the error code, its message and the request ID", async () => {
    const error = await failedSearch(dailyQuota, { "request-id": REQUEST_ID });

    expect(describeGoogleAdsError(error)).toBe(
      `RESOURCE_EXHAUSTED: The daily operation limit was reached. (request-id: ${REQUEST_ID})`,
    );
  });

  test("adds setup guidance for a Test-access Cloud project", async () => {
    const error = await failedSearch(testAccessOnly);

    expect(describeGoogleAdsError(error)).toContain(
      "CLOUD_PROJECT_NOT_APPROVED_FOR_PRODUCTION",
    );
    expect(describeGoogleAdsError(error)).toContain(
      "Apply for Explorer or Basic access",
    );
    expect(describeGoogleAdsError(error)).toContain(
      `(request-id: ${REQUEST_ID})`,
    );
  });

  test("falls back to the body's message when there is no GoogleAdsFailure", async () => {
    const error = await failedSearch({
      error: { code: 403, message: "The caller does not have permission" },
    });

    expect(describeGoogleAdsError(error)).toBe(
      "Request failed with status code 403: The caller does not have permission",
    );
  });

  test("the error hook keeps data, status and headers and replaces the message", async () => {
    const error = await failedSearch(dailyQuota, { "request-id": REQUEST_ID });
    const handled = handleGoogleAdsErrors(error) as Record<string, unknown>;

    expect(handled.status).toBe(403);
    expect(handled.data).toEqual(dailyQuota);
    expect(handled.message).toBe(describeGoogleAdsError(error));
  });

  test("reads a failure body without the outer error wrapper", async () => {
    const error = await failedSearch(dailyQuota.error);

    expect(describeGoogleAdsError(error)).toBe(
      `RESOURCE_EXHAUSTED: The daily operation limit was reached. (request-id: ${REQUEST_ID})`,
    );
  });

  test("reads a searchStream failure, which arrives wrapped in an array", async () => {
    const error = await failedSearch([dailyQuota] as never);

    expect(describeGoogleAdsError(error)).toBe(
      `RESOURCE_EXHAUSTED: The daily operation limit was reached. (request-id: ${REQUEST_ID})`,
    );
  });

  test("names the Data Manager field violations and the request ID", async () => {
    const error = await failedSearch({
      error: {
        code: 400,
        message: "There was a problem with the request.",
        status: "INVALID_ARGUMENT",
        details: [
          {
            "@type": "type.googleapis.com/google.rpc.RequestInfo",
            requestId: "t-0083d6ba",
          },
          {
            "@type": "type.googleapis.com/google.rpc.BadRequest",
            fieldViolations: [
              {
                field: "events.events[0].event_source",
                description: "Required field is missing.",
                reason: "REQUIRED_FIELD_MISSING",
              },
            ],
          },
        ],
      },
    });

    expect(describeGoogleAdsError(error)).toBe(
      "Request failed with status code 403: There was a problem with the request. events.events[0].event_source: Required field is missing. (request-id: t-0083d6ba)",
    );
  });

  test("a plain-text error body keeps the HTTP message", async () => {
    nock(GOOGLE_ADS_BASE_URL).post(SEARCH_PATH).reply(502, "Bad Gateway");
    const error = await client()
      .post(googleAdsSearchPath(CUSTOMER_ID), { query: "x" })
      .catch((caught: unknown) => caught);

    expect(describeGoogleAdsError(error)).toBe(
      "Request failed with status code 502",
    );
  });

  test("leaves a non-HTTP error untouched", () => {
    const error = new Error("boom");
    expect(handleGoogleAdsErrors(error)).toBe(error);
    expect(describeGoogleAdsError(error)).toBe("boom");
  });
});
