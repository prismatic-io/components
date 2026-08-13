import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { ODATA_TYPES } from "../../constants";
import { assignDeviceCompliancePolicyExamplePayload } from "../../examplePayloads";
import { assignDeviceCompliancePolicy } from "./assignDeviceCompliancePolicy";
const HOST = "https://graph.microsoft.com";
const POLICY_ID = "4214b716-b716-4214-16b7-144216b71442";
const PATH = `/v1.0/deviceManagement/deviceCompliancePolicies/${POLICY_ID}/assign`;
const ACCESS_TOKEN = "test-access-token";
const ASSIGN_ID = "92dc3fef-3fef-92dc-ef3f-dc92ef3fdc92";
const TARGET = "microsoft.graph.configurationManagerCollectionAssignmentTarget";
const COLLECTION_ID = "Collection Id value";
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
const assignReply = assignDeviceCompliancePolicyExamplePayload.data;
const inputs = {
  connection,
  deviceCompliancePolicyId: POLICY_ID,
  assignId: ASSIGN_ID,
  target: TARGET,
  collectionId: COLLECTION_ID,
};
describe("assignDeviceCompliancePolicy", () => {
  afterEach(() => nock.cleanAll());
  test("posts the assignment envelope and returns the assignment collection", async () => {
    const scope = nock(HOST)
      .post(PATH, {
        assignments: [
          {
            "@odata.type": ODATA_TYPES.COMPLIANCE_POLICY_ASSIGNMENT,
            id: ASSIGN_ID,
            target: {
              "@odata.type": TARGET,
              collectionId: COLLECTION_ID,
            },
          },
        ],
      })
      .reply(200, assignReply);
    const { result } = await invoke(assignDeviceCompliancePolicy, inputs);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(assignReply);
  });
  test("surfaces the failure when the assignment is rejected", async () => {
    nock(HOST)
      .post(PATH)
      .reply(400, { error: { code: "BadRequest" } });
    await expect(
      invoke(assignDeviceCompliancePolicy, inputs),
    ).rejects.toThrow();
  });
});
