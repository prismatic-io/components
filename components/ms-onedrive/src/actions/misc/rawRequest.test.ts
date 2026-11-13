import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { BASE_URL } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";

const ACCESS_TOKEN = "eyJ0eXAiOiJKV1QiLCJub25jZSI6Im9uZWRyaXZlLXRlc3QifQ";
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
    const scope = nock(BASE_URL, {
      reqheaders: { authorization: `Bearer ${ACCESS_TOKEN}` },
    })
      .get("/me/drive")
      .reply(200, rawRequestExamplePayload.data);

    const { result } = await invoke(rawRequest, {
      connection,
      url: "/me/drive",
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
