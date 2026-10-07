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
import { listAccessibleSubAccounts } from "./listAccessibleSubAccounts";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const CUSTOMER_ID = "1111111111";
const PATH = `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(CUSTOMER_ID)}`;
describe("listAccessibleSubAccounts data source", () => {
  afterEach(() => nock.cleanAll());
  test("returns label/key picklist elements", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(200, {
        results: [
          {
            customerClient: {
              descriptiveName: "Example Sub Account",
              id: "1234567890",
            },
          },
        ],
      });
    const { result } = await invokeDataSource(listAccessibleSubAccounts, {
      connection,
      customerId: CUSTOMER_ID,
      customerClientLevel: "1",
    });
    expect(result).toEqual([
      { label: "Example Sub Account - 123-456-7890", key: "1234567890" },
    ]);
    expect(scope.isDone()).toBe(true);
  });
  test("falls back to the default level when none is set", async () => {
    let query = "";
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, (body) => {
        query = body.query;
        return true;
      })
      .reply(200, { results: [] });
    await invokeDataSource(listAccessibleSubAccounts, {
      connection,
      customerId: CUSTOMER_ID,
      customerClientLevel: undefined,
    });
    expect(scope.isDone()).toBe(true);
    expect(query).not.toContain("undefined");
    expect(query).toMatch(/customer_client\.level <= 1$/);
  });
});
