import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { createClientLink } from "./createClientLink";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const CUSTOMER_ID = "2222222222";
const MANAGER_CUSTOMER_ID = "1111111111";
const MANAGER_LINK_ID = "3333333333";
const RESOURCE_NAME = `customers/${MANAGER_CUSTOMER_ID}/customerClientLinks/${CUSTOMER_ID}~${MANAGER_LINK_ID}`;
const MUTATE_PATH = `/${GOOGLE_ADS_API_VERSION}/customers/${MANAGER_CUSTOMER_ID}/customerClientLinks:mutate`;
const SEARCH_PATH = `/${GOOGLE_ADS_API_VERSION}/customers/${MANAGER_CUSTOMER_ID}/googleAds:search`;
const params = {
  connection,
  managerCustomerId: MANAGER_CUSTOMER_ID,
  customerId: CUSTOMER_ID,
};
describe("createClientLink", () => {
  afterEach(() => nock.cleanAll());
  test("creates the pending link and resolves its manager link id", async () => {
    const mutateReply = {
      result: { resourceName: RESOURCE_NAME },
    };
    const searchReply = {
      results: [{ customerClientLink: { managerLinkId: MANAGER_LINK_ID } }],
    };
    const mutateScope = nock(GOOGLE_ADS_BASE_URL)
      .post(MUTATE_PATH, {
        operation: {
          create: {
            status: "PENDING",
            clientCustomer: `customers/${CUSTOMER_ID}`,
          },
        },
      })
      .reply(200, mutateReply);
    const searchScope = nock(GOOGLE_ADS_BASE_URL)
      .post(SEARCH_PATH, (body) => String(body.query).includes(RESOURCE_NAME))
      .reply(200, searchReply);
    const { result } = await invoke(createClientLink, params);
    expect(result.data).toEqual({
      resourceName: RESOURCE_NAME,
      managerCustomerId: MANAGER_CUSTOMER_ID,
      clientCustomerId: CUSTOMER_ID,
      managerLinkId: MANAGER_LINK_ID,
    });
    expect(mutateScope.isDone()).toBe(true);
    expect(searchScope.isDone()).toBe(true);
  });
  test("surfaces an API error response from the mutate call", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(MUTATE_PATH)
      .reply(400, { error: { code: 400, message: "Invalid client customer" } });
    await expect(invoke(createClientLink, params)).rejects.toThrow();
  });
});
