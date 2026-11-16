import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections/oauth";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";

const GRAPH = "https://graph.microsoft.com";
const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJub25jZSI6InNoYXJlcG9pbnQtdGVzdCJ9";
const connection = createConnection(oauth, {}, { access_token: ACCESS_TOKEN });

beforeAll(() => {
  nock.disableNetConnect();
});

afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.enableNetConnect();
});

describe("rawRequest", () => {
  test("forwards the method, path and bearer token and returns the body untouched", async () => {
    const scope = nock(GRAPH, {
      reqheaders: { authorization: `Bearer ${ACCESS_TOKEN}` },
    })
      .get("/v1.0/sites")
      .query({ search: "" })
      .reply(200, rawRequestExamplePayload.data);

    const { result } = await invoke(rawRequest, {
      connection,
      url: "/sites",
      method: "GET",
      data: "",
      formData: [],
      fileData: [],
      fileDataFileNames: {},
      queryParams: [{ key: "search", value: "" }],
      headers: [],
      responseType: "json",
      timeout: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual({ data: rawRequestExamplePayload.data });
  });

  test("sends the request to the connection's Base URL", async () => {
    const nationalCloud = "https://graph.microsoft.us";
    const scope = nock(nationalCloud, {
      reqheaders: { authorization: `Bearer ${ACCESS_TOKEN}` },
    })
      .get("/v1.0/sites")
      .reply(200, rawRequestExamplePayload.data);

    const { result } = await invoke(rawRequest, {
      connection: createConnection(
        oauth,
        { baseUrl: nationalCloud },
        { access_token: ACCESS_TOKEN },
      ),
      url: "/sites",
      method: "GET",
      data: "",
      formData: [],
      fileData: [],
      fileDataFileNames: {},
      queryParams: [],
      headers: [],
      responseType: "json",
      timeout: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toEqual({ data: rawRequestExamplePayload.data });
  });
});
