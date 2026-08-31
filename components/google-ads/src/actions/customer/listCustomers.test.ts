import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  googleAdsSearchPath,
} from "../../constants";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listCustomers } from "./listCustomers";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const MANAGER_CUSTOMER_ID = "1234567890";
const PATH = `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(MANAGER_CUSTOMER_ID)}`;
const responseBody = listCustomersExamplePayload.data as Record<
  string,
  unknown
>;
const params = {
  connection,
  managerCustomerId: MANAGER_CUSTOMER_ID,
  fetchAll: false,
  pageToken: "",
};
describe("listCustomers", () => {
  afterEach(() => nock.cleanAll());
  test("returns the first page of customer clients under the manager", async () => {
    let capturedQuery = "";
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, (body) => {
        capturedQuery = body.query;
        return true;
      })
      .reply(200, responseBody);
    const { result } = await invoke(listCustomers, params);
    expect(capturedQuery).toContain("FROM customer_client");
    expect(result.data).toEqual(responseBody);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, { error: { code: 400, message: "Invalid customer ID" } });
    await expect(invoke(listCustomers, params)).rejects.toThrow();
  });
});
