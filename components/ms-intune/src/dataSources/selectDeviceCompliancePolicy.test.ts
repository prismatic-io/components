import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listDeviceCompliancePoliciesExamplePayload } from "../examplePayloads";
import { selectDeviceCompliancePolicy } from "./selectDeviceCompliancePolicy";
const HOST = "https://graph.microsoft.com";
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
describe("selectDeviceCompliancePolicy", () => {
  afterEach(() => nock.cleanAll());
  test("maps the policy list to label/key elements wrapped in result", async () => {
    nock(HOST)
      .get("/v1.0/deviceManagement/deviceCompliancePolicies")
      .reply(200, listReply);
    const { result } = await invokeDataSource(selectDeviceCompliancePolicy, {
      connection,
    });
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        label: "Display Name value",
        key: "4214b716-b716-4214-16b7-144216b71442",
      },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty result array when the API returns no policies", async () => {
    nock(HOST)
      .get("/v1.0/deviceManagement/deviceCompliancePolicies")
      .reply(200, { value: [] });
    const { result } = await invokeDataSource(selectDeviceCompliancePolicy, {
      connection,
    });
    expect(result).toEqual([]);
  });
});
