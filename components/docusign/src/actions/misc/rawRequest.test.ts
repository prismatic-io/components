import { invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { listFoldersExamplePayload } from "../../examplePayloads";
import {
  ACCESS_TOKEN,
  ACCOUNT_ID,
  ACCOUNTS_PATH,
  BASE_URI,
  connection,
  mockUserInfo,
  useNock,
} from "../../testHelpers";
import { rawRequest } from "./rawRequest";

describe("rawRequest", () => {
  useNock();

  it("forwards GET with the Bearer token and returns the body untouched", async () => {
    mockUserInfo();
    const scope = nock(BASE_URI)
      .matchHeader("authorization", `Bearer ${ACCESS_TOKEN}`)
      .get(`${ACCOUNTS_PATH}/${ACCOUNT_ID}/folders`)
      .reply(200, listFoldersExamplePayload.data);

    const { result } = await invoke(rawRequest, {
      connection,
      url: `/${ACCOUNT_ID}/folders`,
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
      debugRequest: false,
    });

    expect(scope.isDone()).toBe(true);
    expect(result).toStrictEqual({ data: listFoldersExamplePayload.data });
  });
});
