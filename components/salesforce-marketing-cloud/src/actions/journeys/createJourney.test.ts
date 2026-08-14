import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { JOURNEYS_PATH } from "../../constants";
import { createJourneyExamplePayload } from "../../examplePayloads";
import { createJourney } from "./createJourney";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const params = {
  connection,
  journeyKey: "281ba2ad-c597-4740-54f6-3cc41f629caa",
  journeyName: "Welcome Series Journey",
  journeyDescription: "Onboarding journey for new customers",
  workflowApiVersion: 1,
  journeyExtraBody: { definitionType: "Multistep" },
};
describe("createJourney", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts the mapped journey body with the extra body spread in", async () => {
    const scope = nock(BASE_URL)
      .post(JOURNEYS_PATH, {
        key: "281ba2ad-c597-4740-54f6-3cc41f629caa",
        name: "Welcome Series Journey",
        description: "Onboarding journey for new customers",
        workflowApiVersion: 1,
        definitionType: "Multistep",
      })
      .reply(201, createJourneyExamplePayload.data);
    const { result } = await invoke(createJourney, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(createJourneyExamplePayload.data);
  });
  test("surfaces an API error when the journey is rejected", async () => {
    nock(BASE_URL)
      .post(JOURNEYS_PATH)
      .reply(400, { message: "Journey key already in use" });
    await expect(invoke(createJourney, params)).rejects.toThrow();
  });
});
