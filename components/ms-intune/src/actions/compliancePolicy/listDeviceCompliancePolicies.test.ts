import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { listDeviceCompliancePoliciesExamplePayload } from "../../examplePayloads";
import { listDeviceCompliancePolicies } from "./listDeviceCompliancePolicies";
const HOST = "https://graph.microsoft.com";
const PATH = "/v1.0/deviceManagement/deviceCompliancePolicies";
const ACCESS_TOKEN = "test-access-token";
const connection = createConnection(
  msIntuneOAuth2,
  {
    authorizeUrl:
      "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
    clientId: "test-client-id",
    clientSecret: "test-client-secret",
  },
  { access_token: ACCESS_TOKEN },
);
const listReply = listDeviceCompliancePoliciesExamplePayload.data;
describe("listDeviceCompliancePolicies", () => {
  afterEach(() => nock.cleanAll());
  test("returns the single page of device compliance policies the API replies with", async () => {
    const scope = nock(HOST).get(PATH).reply(200, listReply);
    const { result } = await invoke(listDeviceCompliancePolicies, {
      connection,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listReply);
  });
  test("surfaces the failure when the API rejects the request", async () => {
    nock(HOST)
      .get(PATH)
      .reply(403, { error: { code: "Authorization_RequestDenied" } });
    await expect(
      invoke(listDeviceCompliancePolicies, { connection }),
    ).rejects.toThrow();
  });
});
