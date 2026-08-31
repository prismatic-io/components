import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { mutateCampaignExamplePayload } from "../../examplePayloads";
import { mutateCampaign } from "./mutateCampaign";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const CUSTOMER_ID = "1234567890";
const MANAGER_CUSTOMER_ID = "1111111111";
const PATH = `/${GOOGLE_ADS_API_VERSION}/customers/${CUSTOMER_ID}/campaigns:mutate`;
const params = {
  connection,
  customerId: CUSTOMER_ID,
  managerCustomerId: MANAGER_CUSTOMER_ID,
  operations: [{ create: { name: "Example Campaign", status: "PAUSED" } }],
  partialFailure: true,
  validateOnly: false,
};
describe("mutateCampaign", () => {
  afterEach(() => nock.cleanAll());
  test("posts the operations and returns the mutate results", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL, {
      reqheaders: {
        authorization: "Bearer test-access-token",
        "developer-token": "test-developer-token",
        "login-customer-id": MANAGER_CUSTOMER_ID,
      },
    })
      .post(PATH, {
        operations: params.operations,
        partialFailure: true,
        validateOnly: false,
      })
      .reply(200, mutateCampaignExamplePayload.data);
    const { result } = await invoke(mutateCampaign, params);
    expect(result.data).toEqual(mutateCampaignExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, { error: { code: 400, message: "Invalid operation" } });
    await expect(invoke(mutateCampaign, params)).rejects.toThrow();
  });
});
