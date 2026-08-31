import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import {
  GOOGLE_LOCAL_SERVICES_API_VERSION,
  GOOGLE_LOCAL_SERVICES_BASE_URL,
} from "../../constants";
import { accountReportsExamplePayload } from "../../examplePayloads";
import { accountReports } from "./accountReports";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const MANAGER_CUSTOMER_ID = "1111111111";
const PATH = `/${GOOGLE_LOCAL_SERVICES_API_VERSION}/accountReports:search`;
const params = {
  connection,
  managerCustomerIdInput: MANAGER_CUSTOMER_ID,
  pagination: { pageSizeInput: 1000, pageTokenInput: undefined },
  customerIds: "customer_id:1234567890",
  startDateInput: "01-01-2025",
  endDateInput: "12-31-2025",
};
describe("accountReports", () => {
  afterEach(() => nock.cleanAll());
  test("splits the date range into per-component query params", async () => {
    const scope = nock(GOOGLE_LOCAL_SERVICES_BASE_URL, {
      reqheaders: {
        authorization: "Bearer test-access-token",
        "developer-token": "test-developer-token",
      },
    })
      .get(PATH)
      .query({
        query: `manager_customer_id:${MANAGER_CUSTOMER_ID};customer_id:1234567890`,
        pageSize: "1000",
        "startDate.day": "1",
        "startDate.month": "1",
        "startDate.year": "2025",
        "endDate.day": "31",
        "endDate.month": "12",
        "endDate.year": "2025",
      })
      .reply(200, accountReportsExamplePayload.data);
    const { result } = await invoke(accountReports, params);
    expect(result.data).toEqual(accountReportsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_LOCAL_SERVICES_BASE_URL)
      .get(PATH)
      .query(true)
      .reply(400, { error: { code: 400, message: "Invalid date range" } });
    await expect(invoke(accountReports, params)).rejects.toThrow();
  });
});
