import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  CANNY_HOST,
  captureBody,
  ROOT,
  testConnection,
} from "../../testHelpers";
import { rawRequest } from "./rawRequest";
describe("rawRequest", () => {
  afterEach(() => nock.cleanAll());
  test("forwards the request, injects the API key, and forces a JSON content type", async () => {
    const { captured, matcher } = captureBody();
    let sentHeaders: Record<string, string> = {};
    const scope = nock(CANNY_HOST)
      .post(`${ROOT}/v1/posts/list`, matcher)
      .query({ pretty: "true" })
      .reply(200, function () {
        sentHeaders = this.req.headers as unknown as Record<string, string>;
        return { posts: [], hasMore: false };
      });
    const { result } = await invoke(rawRequest, {
      connection: testConnection,
      url: "/v1/posts/list",
      method: "POST",
      data: JSON.stringify({ boardID: "553c3ef8b8cdcd1501ba1234" }),
      formData: [],
      fileData: [],
      fileDataFileNames: {},
      queryParams: [{ key: "pretty", value: "true" }],
      headers: [{ key: "Content-Type", value: "text/plain" }],
      responseType: "json",
      timeout: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });
    expect(scope.isDone()).toBe(true);
    expect(captured.body).toStrictEqual({
      apiKey: "test-api-key",
      boardID: "553c3ef8b8cdcd1501ba1234",
    });
    expect(sentHeaders["content-type"]).toBe("application/json");
    expect(result.data).toStrictEqual({ posts: [], hasMore: false });
  });
});
