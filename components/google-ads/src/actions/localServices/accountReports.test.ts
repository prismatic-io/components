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
      reqheaders: { authorization: "Bearer test-access-token" },
      badheaders: ["developer-token"],
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
  test("omits the developer-token header when no Developer Token is saved", async () => {
    const scope = nock(GOOGLE_LOCAL_SERVICES_BASE_URL, {
      reqheaders: { authorization: "Bearer test-access-token" },
      badheaders: ["developer-token"],
    })
      .get(PATH)
      .query(true)
      .reply(200, accountReportsExamplePayload.data);
    const { result } = await invoke(accountReports, {
      ...params,
      connection: createConnection(
        oauth,
        {},
        { access_token: "test-access-token" },
      ),
    });
    expect(result.data).toEqual(accountReportsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("omits the date params when no date range is given", async () => {
    let requestPath = "";
    const scope = nock(GOOGLE_LOCAL_SERVICES_BASE_URL)
      .get(PATH)
      .query((query) => {
        requestPath = new URLSearchParams(
          query as Record<string, string>,
        ).toString();
        return true;
      })
      .reply(200, accountReportsExamplePayload.data);
    await invoke(accountReports, {
      ...params,
      startDateInput: undefined,
      endDateInput: undefined,
    });
    expect(scope.isDone()).toBe(true);
    expect(requestPath).not.toContain("NaN");
    expect(requestPath).not.toMatch(/startDate\.|endDate\./);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_LOCAL_SERVICES_BASE_URL)
      .get(PATH)
      .query(true)
      .reply(400, { error: { code: 400, message: "Invalid date range" } });
    await expect(invoke(accountReports, params)).rejects.toThrow();
  });
});
