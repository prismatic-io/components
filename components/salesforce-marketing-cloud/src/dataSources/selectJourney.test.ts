import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import { listJourneysExamplePayload } from "../examplePayloads";
import { selectJourney } from "./selectJourney";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const JOURNEYS_PATH = "/interaction/v1/interactions";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const FETCH_ALL_QUERY = { $page: "1", $pageSize: "500" };
describe("selectJourney", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("maps the listed journeys to label and key elements", async () => {
    const body = {
      ...listJourneysExamplePayload.data,
      count: 1,
      pageSize: 500,
    };
    nock(BASE_URL).get(JOURNEYS_PATH).query(FETCH_ALL_QUERY).reply(200, body);
    const { result } = await invokeDataSource(selectJourney, { connection });
    expect(result).toEqual([
      {
        label: "Example Journey",
        key: "69dd5e94-d963-4508-861b-8f818d6da93a",
      },
    ]);
  });
  test("returns an empty array when the API reports no journeys", async () => {
    nock(BASE_URL)
      .get(JOURNEYS_PATH)
      .query(FETCH_ALL_QUERY)
      .reply(200, { count: 0, page: 1, pageSize: 500, items: [] });
    const { result } = await invokeDataSource(selectJourney, { connection });
    expect(result).toEqual([]);
  });
});
