import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  googleAdsSearchPath,
} from "../../constants";
import { listLocalServicesLeadsExamplePayload } from "../../examplePayloads";
import { listLocalServicesLeads } from "./listLocalServicesLeads";

const connection = createConnection(
  oauth,
  {},
  { access_token: "test-access-token" },
);

const CUSTOMER_ID = "1234567890";
const PATH = `/${GOOGLE_ADS_API_VERSION}${googleAdsSearchPath(CUSTOMER_ID)}`;

const params = {
  connection,
  customerId: CUSTOMER_ID,
  managerCustomerId: "1111111111",
  startDateInput: "10-01-2026",
  endDateInput: undefined,
  fetchAll: false,
  pageTokenInput: undefined,
};

const INVALID_ARGUMENT = {
  error: {
    code: 400,
    message: "Request contains an invalid argument.",
    status: "INVALID_ARGUMENT",
  },
};

describe("listLocalServicesLeads", () => {
  afterEach(() => nock.cleanAll());

  test("searches local_services_lead with the date filter and manager header", async () => {
    let query = "";
    const scope = nock(GOOGLE_ADS_BASE_URL, {
      reqheaders: { "login-customer-id": "1111111111" },
    })
      .post(PATH, (body) => {
        query = body.query;
        return body.pageSize === undefined;
      })
      .reply(200, listLocalServicesLeadsExamplePayload.data);

    const { result } = await invoke(listLocalServicesLeads, params);

    expect(scope.isDone()).toBe(true);
    expect(query).toContain("FROM local_services_lead WHERE");
    expect(query).toContain(
      "local_services_lead.creation_date_time >= '2026-10-01 00:00:00'",
    );
    expect(result.data).toEqual(listLocalServicesLeadsExamplePayload.data);
  });

  test("follows nextPageToken when Fetch All is on", async () => {
    const lead = listLocalServicesLeadsExamplePayload.data.results[0];
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, (body) => body.pageToken === undefined)
      .reply(200, { results: [lead], nextPageToken: "next" })
      .post(PATH, (body) => body.pageToken === "next")
      .reply(200, { results: [lead] });

    const { result } = await invoke(listLocalServicesLeads, {
      ...params,
      fetchAll: true,
    });

    expect(scope.isDone()).toBe(true);
    expect((result.data as { results: unknown[] }).results).toHaveLength(2);
  });

  test("rejects when Google Ads returns 400", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, INVALID_ARGUMENT);

    await expect(invoke(listLocalServicesLeads, params)).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
