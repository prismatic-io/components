import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { pdqConnection } from "../../connections";
import { SUCCESS_EMPTY_PAYLOAD } from "../../constants";
import { createDeployment } from "./createDeployment";
const BASE = "https://app.pdq.com";
const conn = createConnection(pdqConnection, { apiKey: "test-key" });
describe("createDeployment", () => {
  beforeAll(() => nock.disableNetConnect());
  afterAll(() => nock.enableNetConnect());
  afterEach(() => nock.cleanAll());
  test("happy path forwards the deployment body and returns the success constant", async () => {
    let forwardedBody: unknown;
    nock(BASE)
      .post("/v1/api/deployments", (body) => {
        forwardedBody = body;
        return true;
      })
      .matchHeader("authorization", "Bearer test-key")
      .reply(201);
    const { result } = await invoke(createDeployment, {
      connection: conn,
      packageInput: "pkg_1bced782734040a581d",
      targets: "grp_123abc,dvc_123abc",
    });
    expect(forwardedBody).toEqual({
      package: "pkg_1bced782734040a581d",
      targets: "grp_123abc,dvc_123abc",
    });
    expect(result).toEqual({ data: SUCCESS_EMPTY_PAYLOAD });
    expect(nock.pendingMocks()).toHaveLength(0);
  });
  test("error path surfaces the failed request", async () => {
    nock(BASE)
      .post("/v1/api/deployments")
      .reply(422, { error: "unknown package" });
    await expect(
      invoke(createDeployment, {
        connection: conn,
        packageInput: "pkg_missing",
        targets: "dvc_123abc",
      }),
    ).rejects.toThrow("Request failed with status code 422");
  });
});
