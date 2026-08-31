import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { confirmClientLinkExamplePayload } from "../../examplePayloads";
import { confirmClientLink } from "./confirmClientLink";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const CUSTOMER_ID = "2222222222";
const MANAGER_CUSTOMER_ID = "1111111111";
const MANAGER_LINK_ID = "3333333333";
const PATH = `/${GOOGLE_ADS_API_VERSION}/customers/${CUSTOMER_ID}/customerManagerLinks:mutate`;
const params = {
  connection,
  managerCustomerId: MANAGER_CUSTOMER_ID,
  customerId: CUSTOMER_ID,
  managerLinkId: MANAGER_LINK_ID,
};
describe("confirmClientLink", () => {
  afterEach(() => nock.cleanAll());
  test("activates the pending manager link", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, {
        operations: [
          {
            updateMask: "status",
            update: {
              status: "ACTIVE",
              resourceName: `customers/${CUSTOMER_ID}/customerManagerLinks/${MANAGER_CUSTOMER_ID}~${MANAGER_LINK_ID}`,
            },
          },
        ],
      })
      .reply(200, confirmClientLinkExamplePayload.data);
    const { result } = await invoke(confirmClientLink, params);
    expect(result.data).toEqual(confirmClientLinkExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, { error: { code: 400, message: "Link is not pending" } });
    await expect(invoke(confirmClientLink, params)).rejects.toThrow();
  });
});
