import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { CAMPAIGNS_PATH } from "../../constants";
import { deleteCampaign } from "./deleteCampaign";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const CAMPAIGN_ID = "145";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("deleteCampaign", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("deletes the campaign and returns the empty response body", async () => {
    const scope = nock(BASE_URL)
      .delete(`${CAMPAIGNS_PATH}/${CAMPAIGN_ID}`)
      .reply(204);
    const { result } = await invoke(deleteCampaign, {
      connection,
      campaignId: CAMPAIGN_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toBe("");
  });
  test("surfaces an API error when the campaign is not found", async () => {
    nock(BASE_URL)
      .delete(`${CAMPAIGNS_PATH}/${CAMPAIGN_ID}`)
      .reply(404, { message: "Campaign not found" });
    await expect(
      invoke(deleteCampaign, { connection, campaignId: CAMPAIGN_ID }),
    ).rejects.toThrow();
  });
});
