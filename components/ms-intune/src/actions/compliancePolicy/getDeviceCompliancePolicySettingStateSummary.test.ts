import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../../connections";
import { getDeviceCompliancePolicySettingStateSummaryExamplePayload } from "../../examplePayloads";
import { getDeviceCompliancePolicySettingStateSummary } from "./getDeviceCompliancePolicySettingStateSummary";
const HOST = "https://graph.microsoft.com";
const SUMMARY_ID = "7474d6d5-d6d5-7474-d5d6-7474d5d67474";
const PATH = `/v1.0/deviceManagement/deviceCompliancePolicySettingStateSummaries/${SUMMARY_ID}`;
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
const summaryReply =
  getDeviceCompliancePolicySettingStateSummaryExamplePayload.data;
describe("getDeviceCompliancePolicySettingStateSummary", () => {
  afterEach(() => nock.cleanAll());
  test("returns the setting state summary for the requested ID", async () => {
    const scope = nock(HOST).get(PATH).reply(200, summaryReply);
    const { result } = await invoke(
      getDeviceCompliancePolicySettingStateSummary,
      {
        connection,
        deviceCompliancePolicySettingStateSummaryId: SUMMARY_ID,
      },
    );
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(summaryReply);
  });
  test("surfaces the failure when the summary does not exist", async () => {
    nock(HOST)
      .get(PATH)
      .reply(404, { error: { code: "ResourceNotFound" } });
    await expect(
      invoke(getDeviceCompliancePolicySettingStateSummary, {
        connection,
        deviceCompliancePolicySettingStateSummaryId: SUMMARY_ID,
      }),
    ).rejects.toThrow();
  });
});
