import type { ActionDefinition } from "@prismatic-io/spectral";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  googleAdsSearchPath,
} from "../../constants";
import {
  getConversionActionExamplePayload,
  getCustomerExamplePayload,
} from "../../examplePayloads";
import type { customerEntityInputs } from "../../inputs";
import { customerEntityActions } from "./customerEntity";
const entityActions = customerEntityActions as Record<
  string,
  ActionDefinition<
    typeof customerEntityInputs,
    Record<string, never>,
    false,
    {
      data: unknown;
    }
  >
>;
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const CUSTOMER_ID = "1234567890";
const PATH = `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(CUSTOMER_ID)}`;
const params = {
  connection,
  customerId: CUSTOMER_ID,
  managerCustomerId: "",
  pageToken: "",
};
describe("getCustomer", () => {
  afterEach(() => nock.cleanAll());
  test("searches the customer resource and returns the row", async () => {
    let capturedQuery = "";
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, (body) => {
        capturedQuery = body.query;
        return true;
      })
      .reply(200, getCustomerExamplePayload.data);
    const { result } = await invoke(entityActions.getCustomer, params);
    expect(capturedQuery).toBe(
      "SELECT customer.id, customer.descriptive_name, customer.status, customer.test_account, customer.manager FROM customer",
    );
    expect(result.data).toEqual(getCustomerExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, { error: { code: 400, message: "Invalid customer ID" } });
    await expect(invoke(entityActions.getCustomer, params)).rejects.toThrow();
  });
});
describe("getConversionAction", () => {
  afterEach(() => nock.cleanAll());
  test("searches the conversion_action resource and returns the rows", async () => {
    let capturedQuery = "";
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, (body) => {
        capturedQuery = body.query;
        return true;
      })
      .reply(200, getConversionActionExamplePayload.data);
    const { result } = await invoke(entityActions.getConversionAction, params);
    expect(capturedQuery).toBe(
      "SELECT conversion_action.id, conversion_action.name, conversion_action.resource_name FROM conversion_action",
    );
    expect(result.data).toEqual(getConversionActionExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, { error: { code: 400, message: "Invalid query" } });
    await expect(
      invoke(entityActions.getConversionAction, params),
    ).rejects.toThrow();
  });
});
