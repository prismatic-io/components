import type { Connection } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { rawRequestGETExamplePayload } from "../../examplePayloads";
import { rawRequest } from "./rawRequest";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";
const BASE = "/services/rest/record/v1";

const connection: Connection = {
  key: "oauth",
  configVarKey: "NetSuite Connection",
  fields: { tokenUrl: `${ORIGIN}/services/rest/auth/oauth2/v1/token` },
  token: { access_token: "access-token" },
};

describe("rawRequest", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());

  test("sends the request to the service base URL with the connection's token and returns the response untouched", async () => {
    nock(ORIGIN, { reqheaders: { authorization: "Bearer access-token" } })
      .get(`${BASE}/customer/12345`)
      .query({ fields: "email" })
      .reply(200, rawRequestGETExamplePayload.data.data);

    const { result } = await invoke(rawRequest, {
      connection,
      serviceType: "record",
      method: "GET",
      url: "/customer/12345",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: {},
      queryParams: [{ key: "fields", value: "email" }],
      headers: [],
      responseType: "json",
      timeout: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });

    expect(result).toMatchObject({
      data: { data: rawRequestGETExamplePayload.data.data },
    });
    expect(nock.isDone()).toBe(true);
  });
});
