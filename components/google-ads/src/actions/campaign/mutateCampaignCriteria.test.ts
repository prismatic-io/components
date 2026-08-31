import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { mutateCampaignCriteriaExamplePayload } from "../../examplePayloads";
import { mutateCampaignCriteria } from "./mutateCampaignCriteria";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const CUSTOMER_ID = "1234567890";
const PATH = `/${GOOGLE_ADS_API_VERSION}/customers/${CUSTOMER_ID}/campaignCriteria:mutate`;
const params = {
  connection,
  customerId: CUSTOMER_ID,
  managerCustomerId: "",
  operations: [
    {
      create: {
        campaign: `customers/${CUSTOMER_ID}/campaigns/9876543210`,
        location: { geoTargetConstant: "geoTargetConstants/1023191" },
      },
    },
  ],
  partialFailure: true,
  validateOnly: false,
};
describe("mutateCampaignCriteria", () => {
  afterEach(() => nock.cleanAll());
  test("posts the criteria operations and returns the mutate results", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, {
        operations: params.operations,
        partialFailure: true,
        validateOnly: false,
      })
      .reply(200, mutateCampaignCriteriaExamplePayload.data);
    const { result } = await invoke(mutateCampaignCriteria, params);
    expect(result.data).toEqual(mutateCampaignCriteriaExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, { error: { code: 400, message: "Invalid criterion" } });
    await expect(invoke(mutateCampaignCriteria, params)).rejects.toThrow();
  });
});
