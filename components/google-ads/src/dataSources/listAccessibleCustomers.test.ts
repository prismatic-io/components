import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../connections";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  googleAdsSearchPath,
} from "../constants";
import {
  getCustomerExamplePayload,
  listAccessibleCustomersExamplePayload,
} from "../examplePayloads";
import { listAccessibleCustomers } from "./listAccessibleCustomers";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const LIST_PATH = `/${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers`;
const searchPath = (customerId: string) =>
  `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(customerId)}`;
describe("listAccessibleCustomers data source", () => {
  afterEach(() => nock.cleanAll());
  test("returns label/key picklist elements", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .get(LIST_PATH)
      .reply(200, listAccessibleCustomersExamplePayload.data)
      .post(searchPath("1234567890"))
      .reply(200, getCustomerExamplePayload.data)
      .post(searchPath("5555555555"))
      .reply(200, getCustomerExamplePayload.data);
    const { result } = await invokeDataSource(listAccessibleCustomers, {
      connection,
    });
    expect(result).toEqual([
      { label: "Example Customer Account - 123-456-7890", key: "1234567890" },
      { label: "Example Customer Account - 555-555-5555", key: "5555555555" },
    ]);
    for (const element of result) {
      expect(element).toHaveProperty("label");
      expect(element).toHaveProperty("key");
    }
    expect(scope.isDone()).toBe(true);
  });
  test("returns an empty picklist when no customers are accessible", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .get(LIST_PATH)
      .reply(200, { resourceNames: [] });
    const { result } = await invokeDataSource(listAccessibleCustomers, {
      connection,
    });
    expect(result).toEqual([]);
    expect(scope.isDone()).toBe(true);
  });
});
