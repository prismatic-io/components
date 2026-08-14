import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { JOURNEY_EVENTS_PATH } from "../../constants";
import { fireEntryEventExamplePayload } from "../../examplePayloads";
import { fireEntryEvent } from "./fireEntryEvent";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const params = {
  connection,
  eventDefinitionKey: "APIEvent-abc123-def456",
  eventContactKey: "contact-abc-123",
  eventData: { EmailAddress: "john.doe@example.com", FirstName: "John" },
};
describe("fireEntryEvent", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts the entry event with Pascal-case body keys", async () => {
    const scope = nock(BASE_URL)
      .post(JOURNEY_EVENTS_PATH, {
        ContactKey: "contact-abc-123",
        EventDefinitionKey: "APIEvent-abc123-def456",
        Data: { EmailAddress: "john.doe@example.com", FirstName: "John" },
      })
      .reply(201, fireEntryEventExamplePayload.data);
    const { result } = await invoke(fireEntryEvent, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(fireEntryEventExamplePayload.data);
  });
  test("surfaces an API error when the entry event is rejected", async () => {
    nock(BASE_URL)
      .post(JOURNEY_EVENTS_PATH)
      .reply(400, { message: "Unknown event definition key" });
    await expect(invoke(fireEntryEvent, params)).rejects.toThrow();
  });
});
