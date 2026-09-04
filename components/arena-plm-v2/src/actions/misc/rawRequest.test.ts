import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { arenaApiKey } from "../../connections";
import { createTestContext } from "../../tests/testContext";
import { rawRequest } from "./rawRequest";
const ARENA_HOST = "https://arena.example.com";
const API = "/v1";
type RawRequestParams = Parameters<typeof rawRequest.perform>[1];
const params = (
  overrides: Partial<RawRequestParams> = {},
): RawRequestParams => ({
  connection: createConnection(arenaApiKey, {
    baseUrl: "custom",
    customBaseUrl: ARENA_HOST,
    apiKey: "fake-api-key",
    timeout: "3000",
  }),
  endpoint: "/items",
  httpMethod: "GET",
  jsonPayload: undefined,
  formData: undefined,
  fileData: undefined,
  queryParameters: undefined,
  additionalHeaders: undefined,
  responseType: "json",
  ...overrides,
});
describe("rawRequest header forwarding", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.restore();
  });
  it("sends the builder's additional headers, and the credential, to Arena", async () => {
    let received: Record<string, string | string[] | undefined> = {};
    nock(ARENA_HOST)
      .get(`${API}/items`)
      .reply(function () {
        received = this.req.headers;
        return [200, { status: "ok" }];
      });
    await invoke(
      rawRequest,
      params({
        additionalHeaders: [
          { key: "X-Correlation-Id", value: "corr-123" },
          { key: "Accept-Language", value: "en-US" },
        ],
      }),
      createTestContext(),
    );
    expect(received["x-correlation-id"]).toBe("corr-123");
    expect(received["accept-language"]).toBe("en-US");
    expect(received.arena_session_id).toBe("fake-api-key");
  });
});
