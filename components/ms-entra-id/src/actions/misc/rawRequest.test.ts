import { invoke } from "@prismatic-io/spectral/dist/testing";
import { API_PATH, connection, mockGraph, resetNock } from "../../testHelpers";
import { rawRequest } from "./rawRequest";

describe("rawRequest", () => {
  afterEach(resetNock);

  test("forwards method, path, query, headers and returns the body untouched", async () => {
    const body = { "@odata.context": "users", value: [{ id: "u_1" }] };
    const scope = mockGraph()
      .matchHeader("x-custom", "abc")
      .get(`${API_PATH}/users`)
      .query({ $top: "1" })
      .reply(200, body);
    const { result } = await invoke(rawRequest, {
      connection,
      url: "/users",
      method: "GET",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: undefined,
      queryParams: [{ key: "$top", value: "1" }],
      headers: [{ key: "x-custom", value: "abc" }],
      responseType: "json",
      timeout: 0,
      debugRequest: false,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });
    expect(result).toEqual({ data: body });
    expect(scope.isDone()).toBe(true);
  });
});
