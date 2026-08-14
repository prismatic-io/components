import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { CAMPAIGNS_PATH } from "../../constants";
import { createCampaignExamplePayload } from "../../examplePayloads";
import { createCampaign } from "./createCampaign";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const params = {
  connection,
  campaignName: "Example Marketing Campaign",
  additionalFields: {
    campaignDescription: "Example campaign for product launch",
    campaignCode: "EXAMPLE2024",
    campaignColor: "ffc7c7",
    campaignExtraBody: { favorite: false },
  },
};
describe("createCampaign", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts the mapped campaign body and returns the created campaign", async () => {
    const scope = nock(BASE_URL)
      .post(CAMPAIGNS_PATH, {
        name: "Example Marketing Campaign",
        description: "Example campaign for product launch",
        campaignCode: "EXAMPLE2024",
        color: "ffc7c7",
        favorite: false,
      })
      .reply(201, createCampaignExamplePayload.data);
    const { result } = await invoke(createCampaign, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(createCampaignExamplePayload.data);
  });
  test("surfaces an API error when the campaign is rejected", async () => {
    nock(BASE_URL)
      .post(CAMPAIGNS_PATH)
      .reply(400, { message: "Campaign name already exists" });
    await expect(invoke(createCampaign, params)).rejects.toThrow();
  });
});
