import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listDepartmentsResponse } from "../../examplePayloads/departments";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { rawRequest } from "./rawRequest";
const PATH = apiPath("/departments");
describe("rawRequest", () => {
  afterEach(resetNock);
  test("forwards the method, path, auth and caller headers, and returns the response untouched", async () => {
    rampNock()
      .matchHeader("x-request-source", "unit-test")
      .get(PATH)
      .query({ page_size: "10" })
      .reply(200, listDepartmentsResponse);
    const { result } = await invoke(rawRequest, {
      connection: testConnection,
      method: "GET",
      url: "/departments",
      responseType: "json",
      headers: [{ key: "x-request-source", value: "unit-test" }],
      queryParams: [{ key: "page_size", value: "10" }],
      data: "",
      formData: [],
      fileData: [],
      fileDataFileNames: {},
      timeout: 0,
      maxRetries: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      useExponentialBackoff: false,
    });
    expect(result.data).toEqual(listDepartmentsResponse);
  });
});
