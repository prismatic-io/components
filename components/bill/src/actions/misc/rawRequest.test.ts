import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getBillExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  nock,
  testConnection,
} from "../../testHelpers";
import { rawRequest } from "./rawRequest";
describe("rawRequest", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("forwards the method and path and returns the unwrapped response", async () => {
    const scope = nock(SANDBOX_BASE)
      .get("/Crud/Read/Bill.json")
      .query({ id: "00n02XNWHOPPXWV9ewx0" })
      .reply(200, envelope(getBillExamplePayload.data));
    const { result } = await invoke(rawRequest, {
      connection: testConnection,
      method: "GET",
      url: "/Crud/Read/Bill.json",
      data: undefined,
      formData: [],
      fileData: [],
      fileDataFileNames: undefined,
      queryParams: [{ key: "id", value: "00n02XNWHOPPXWV9ewx0" }],
      headers: [],
      responseType: "json",
      timeout: 0,
      retryDelayMS: 0,
      retryAllErrors: false,
      maxRetries: 0,
      useExponentialBackoff: false,
    });
    expect(result.data).toEqual(getBillExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
});
