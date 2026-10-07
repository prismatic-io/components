import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getSpaceExamplePayload } from "../../examplePayloads";
import { ACCESS_TOKEN, BASE, connection, useNock } from "../../testHelpers";
import { rawRequest } from "./rawRequest";
describe("rawRequest", () => {
  useNock();
  test("forwards GET /spaces/{id} with the Bearer token and returns the body untouched", async () => {
    let sentHeaders: Record<string, unknown> = {};
    const scope = nock(BASE)
      .get("/spaces/yadj1kx9rmg0")
      .reply(200, function () {
        sentHeaders = this.req.headers;
        return getSpaceExamplePayload.data;
      });
    const { result } = await invoke(rawRequest, {
      connection,
      url: "/spaces/yadj1kx9rmg0",
      method: "GET",
      data: undefined,
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
    } as never);
    expect(scope.isDone()).toBe(true);
    expect(sentHeaders.authorization).toBe(`Bearer ${ACCESS_TOKEN}`);
    expect(result).toStrictEqual({ data: getSpaceExamplePayload.data });
  });
});
