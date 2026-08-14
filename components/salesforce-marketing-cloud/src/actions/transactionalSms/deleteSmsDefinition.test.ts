import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { SMS_DEFINITIONS_PATH } from "../../constants";
import { deleteSmsDefinitionExamplePayload } from "../../examplePayloads";
import { deleteSmsDefinition } from "./deleteSmsDefinition";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const DEFINITION_KEY = "example-sms-def";
const params = { connection, smsDefinitionKey: DEFINITION_KEY };
describe("deleteSmsDefinition", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("deletes the definition and returns the API response body", async () => {
    const scope = nock(BASE_URL)
      .delete(`${SMS_DEFINITIONS_PATH}/${DEFINITION_KEY}`)
      .reply(200, deleteSmsDefinitionExamplePayload.data);
    const { result } = await invoke(deleteSmsDefinition, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(deleteSmsDefinitionExamplePayload.data);
  });
  test("surfaces an API error when the definition cannot be deleted", async () => {
    nock(BASE_URL)
      .delete(`${SMS_DEFINITIONS_PATH}/${DEFINITION_KEY}`)
      .reply(404, { message: "Definition not found" });
    await expect(invoke(deleteSmsDefinition, params)).rejects.toThrow();
  });
});
