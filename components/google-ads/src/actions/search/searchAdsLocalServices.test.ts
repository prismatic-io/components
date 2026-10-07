import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  googleAdsSearchPath,
} from "../../constants";
import { searchAdsLocalServicesExamplePayload } from "../../examplePayloads";
import { searchAdsLocalServices } from "./searchAdsLocalServices";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const CUSTOMER_ID = "1234567890";
const PATH = `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(CUSTOMER_ID)}`;
const QUERY = "SELECT campaign.id, campaign.name FROM campaign";
const responseBody = searchAdsLocalServicesExamplePayload.data as Record<
  string,
  unknown
>;
const params = {
  connection,
  customerId: CUSTOMER_ID,
  query: QUERY,
  fetchAll: false,
  pageTokenInput: "",
  managerCustomerId: "",
  returnTotalResultsCount: false,
};
describe("searchAdsLocalServices", () => {
  afterEach(() => nock.cleanAll());
  test("returns the first page of GAQL results", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, { query: QUERY })
      .reply(200, responseBody);
    const { result } = await invoke(searchAdsLocalServices, params);
    expect(result.data).toEqual(responseBody);
    expect(scope.isDone()).toBe(true);
  });
  test.each([
    [true, { returnTotalResultsCount: true }],
    [false, undefined],
  ])("sends returnTotalResultsCount=%s inside searchSettings", async (returnTotalResultsCount, searchSettings) => {
    let body: Record<string, unknown> = {};
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, (requestBody) => {
        body = requestBody;
        return true;
      })
      .reply(200, responseBody);
    await invoke(searchAdsLocalServices, {
      ...params,
      returnTotalResultsCount,
    });
    expect(scope.isDone()).toBe(true);
    expect(body).not.toHaveProperty("returnTotalResultsCount");
    expect(body.searchSettings).toEqual(searchSettings);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, { error: { code: 400, message: "Invalid GAQL query" } });
    await expect(invoke(searchAdsLocalServices, params)).rejects.toThrow();
  });
});
