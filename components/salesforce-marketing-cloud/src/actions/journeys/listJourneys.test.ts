import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { JOURNEYS_PATH } from "../../constants";
import { listJourneysExamplePayload } from "../../examplePayloads";
import { listJourneys } from "./listJourneys";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const params = {
  connection,
  journeyStatus: "Published",
  journeyNameFilter: "Welcome",
  fetchAll: false,
  pagination: { page: 1, pageSize: 25 },
};
describe("listJourneys", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("requests a single page with the caller's filters and returns it verbatim", async () => {
    const scope = nock(BASE_URL)
      .get(JOURNEYS_PATH)
      .query({
        $pageSize: "25",
        $page: "1",
        status: "Published",
        nameSearch: "Welcome",
      })
      .reply(200, listJourneysExamplePayload.data);
    const { result } = await invoke(listJourneys, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listJourneysExamplePayload.data);
  });
  test("surfaces an API error when the journey list request fails", async () => {
    nock(BASE_URL)
      .get(JOURNEYS_PATH)
      .query(true)
      .reply(500, { message: "Server Error" });
    await expect(invoke(listJourneys, params)).rejects.toThrow();
  });
});
