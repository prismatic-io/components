import nock from "nock";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { connection as connectionDefinition } from "../../connections";
import rawRequest from "./rawRequest";
const connection = createConnection(
  connectionDefinition,
  {},
  { access_token: "test-token" },
);
const DRIVE = "https://www.googleapis.com";
describe("rawRequest", () => {
  afterEach(() => nock.cleanAll());
  test("sends a raw request and forwards the auth token", async () => {
    nock(DRIVE, { reqheaders: { Authorization: "Bearer test-token" } })
      .get("/drive/v3/files")
      .reply(200, { kind: "drive#fileList" });
    const { result } = await invoke(rawRequest, {
      connection,
      url: "/files",
      method: "GET",
      data: undefined,
      formData: undefined,
      fileData: undefined,
      fileDataFileNames: undefined,
      queryParams: undefined,
      headers: undefined,
      responseType: "json",
      timeout: undefined,
      retryDelayMS: undefined,
      retryAllErrors: undefined,
      maxRetries: undefined,
      useExponentialBackoff: undefined,
    });
    expect(result.data).toEqual({ kind: "drive#fileList" });
  });
});
