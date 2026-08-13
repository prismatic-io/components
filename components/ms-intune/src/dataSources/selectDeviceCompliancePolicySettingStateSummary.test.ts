import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { msIntuneOAuth2 } from "../connections";
import { listDeviceCompliancePolicySettingStateSummariesExamplePayload } from "../examplePayloads";
import { selectDeviceCompliancePolicySettingStateSummary } from "./selectDeviceCompliancePolicySettingStateSummary";
const HOST = "https://graph.microsoft.com";
const ACCESS_TOKEN = "test-access-token";
const PATH =
  "/v1.0/deviceManagement/deviceCompliancePolicySettingStateSummaries";
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
const listReply =
  listDeviceCompliancePolicySettingStateSummariesExamplePayload.data;
describe("selectDeviceCompliancePolicySettingStateSummary", () => {
  afterEach(() => nock.cleanAll());
  test("maps the summary list to label/key elements wrapped in result", async () => {
    nock(HOST).get(PATH).reply(200, listReply);
    const { result } = await invokeDataSource(
      selectDeviceCompliancePolicySettingStateSummary,
      { connection },
    );
    expect(Array.isArray(result)).toBe(true);
    expect(result).toEqual([
      {
        label: "Setting Name value",
        key: "7474d6d5-d6d5-7474-d5d6-7474d5d67474",
      },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
  });
  test("returns an empty result array when the API returns no summaries", async () => {
    nock(HOST).get(PATH).reply(200, { value: [] });
    const { result } = await invokeDataSource(
      selectDeviceCompliancePolicySettingStateSummary,
      { connection },
    );
    expect(result).toEqual([]);
  });
});
