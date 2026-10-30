import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { basicConnection, jiraApi } from "../../testHelpers";
import { rawRequest } from "./rawRequest";

beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => nock.cleanAll());

describe("rawRequest", () => {
  test("forwards the method, path and Basic credentials; returns the response nested", async () => {
    const reply = [{ id: "10000", key: "PROJ", name: "Example Project" }];
    let headers: Record<string, unknown> | undefined;
    const scope = jiraApi()
      .get("/rest/api/3/project/recent")
      .reply(200, function () {
        headers = this.req.headers;
        return reply;
      });

    const { result } = await invoke(rawRequest, {
      connection: basicConnection(),
      url: "/rest/api/3/project/recent",
      method: "GET",
      data: undefined,
      formData: undefined,
      fileData: undefined,
      fileDataFileNames: undefined,
      queryParams: undefined,
      headers: undefined,
      responseType: "json",
      timeout: undefined,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });

    expect(scope.isDone()).toBe(true);
    expect(headers?.authorization).toBe(
      `Basic ${Buffer.from("user@example.com:api-token").toString("base64")}`,
    );
    expect(result).toEqual({ data: { data: reply } });
  });
});
