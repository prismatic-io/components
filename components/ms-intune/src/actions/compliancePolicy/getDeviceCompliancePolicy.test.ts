import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getDeviceCompliancePolicyExamplePayload } from "../../examplePayloads";
import { getDeviceCompliancePolicy } from "./getDeviceCompliancePolicy";
const HOST = "https://graph.microsoft.com";
const POLICY_ID = "4214b716-b716-4214-16b7-144216b71442";
const PATH = `/v1.0/deviceManagement/deviceCompliancePolicies/${POLICY_ID}`;
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
const policyReply = getDeviceCompliancePolicyExamplePayload.data;
describe("getDeviceCompliancePolicy", () => {
  afterEach(() => nock.cleanAll());
  test("returns the device compliance policy for the requested ID", async () => {
    const scope = nock(HOST).get(PATH).reply(200, policyReply);
    const { result } = await invoke(getDeviceCompliancePolicy, {
      connection,
      deviceCompliancePolicyId: POLICY_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(policyReply);
  });
  test("surfaces the failure when the policy does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(getDeviceCompliancePolicy, {
        connection,
        deviceCompliancePolicyId: POLICY_ID,
      }),
    ).rejects.toThrow();
  });
});
