import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { pdqConnection } from "../../connections";
import { getPackageExamplePayload } from "../../examplePayloads/packages";
import { getPackage } from "./getPackage";
const BASE = "https://app.pdq.com";
const conn = createConnection(pdqConnection, { apiKey: "test-key" });
const responseBody = getPackageExamplePayload.data;
describe("getPackage", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());
  test("happy path returns the package envelope", async () => {
    nock(BASE)
      .get("/v1/api/packages/pkg_1bced782734040a581d")
      .matchHeader("authorization", "Bearer test-key")
      .reply(200, responseBody);
    const { result } = await invoke(getPackage, {
      connection: conn,
      packageId: "pkg_1bced782734040a581d",
    });
    expect(result).toEqual(getPackageExamplePayload);
    expect(nock.pendingMocks()).toHaveLength(0);
  });
  test("error path surfaces the failed request", async () => {
    nock(BASE)
      .get("/v1/api/packages/pkg_missing")
      .reply(500, { error: "server error" });
    await expect(
      invoke(getPackage, { connection: conn, packageId: "pkg_missing" }),
    ).rejects.toThrow("Request failed with status code 500");
  });
});
