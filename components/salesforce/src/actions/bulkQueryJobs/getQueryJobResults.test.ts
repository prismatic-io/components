import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { salesforceOAuth } from "../../connections";
import { DEFAULT_SF_VERSION } from "../../constants";
import { getQueryJobResults } from "./getQueryJobResults";

const INSTANCE_URL = "https://example-dev-ed.my.salesforce.com";
const ACCESS_TOKEN = "00Dxx0000000000!fake-access-token";
const BASE_PATH = `/services/data/v${DEFAULT_SF_VERSION}`;
const JOB_ID = "750R0000000zlh9IAA";
const CSV = '"Id","Name"\n"0015e00000AbcdeAAA","Acme"\n';

const connection = createConnection(
  salesforceOAuth,
  {},
  { instance_url: INSTANCE_URL, access_token: ACCESS_TOKEN },
);

beforeAll(() => nock.disableNetConnect());
afterEach(() => nock.cleanAll());
afterAll(() => nock.enableNetConnect());

describe("getQueryJobResults", () => {
  test("requests the results as text/csv", async () => {
    const scope = nock(INSTANCE_URL, {
      reqheaders: {
        accept: "text/csv",
        authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
      .get(`${BASE_PATH}/jobs/query/${JOB_ID}/results`)
      .query({ maxRecords: "100" })
      .reply(200, CSV, { "Content-Type": "text/csv" });

    const { result } = await invoke(getQueryJobResults, {
      connection,
      version: DEFAULT_SF_VERSION,
      queryJobId: JOB_ID,
      pagination: { locator: undefined, maxRecords: 100 },
    } as never);

    expect(scope.isDone()).toBe(true);
    expect(result).toStrictEqual({ data: CSV });
  });
});
