import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { ENS_CALLBACKS_PATH } from "../../constants";
import { createCallbackExamplePayload } from "../../examplePayloads";
import { createCallback } from "./createCallback";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const params = {
  connection,
  callbackName: "My Integration Webhook",
  callbackUrl: "https://hooks.example.com/sfmc/events",
  maxBatchSize: 100,
};
describe("createCallback", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("wraps the callback registration in an array and returns the created callbacks", async () => {
    const scope = nock(BASE_URL)
      .post(ENS_CALLBACKS_PATH, [
        {
          callbackName: "My Integration Webhook",
          url: "https://hooks.example.com/sfmc/events",
          maxBatchSize: 100,
        },
      ])
      .reply(201, createCallbackExamplePayload.data);
    const { result } = await invoke(createCallback, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(createCallbackExamplePayload.data);
  });
  test("surfaces an API error when the callback registration is rejected", async () => {
    nock(BASE_URL)
      .post(ENS_CALLBACKS_PATH)
      .reply(400, { message: "Invalid callback URL" });
    await expect(invoke(createCallback, params)).rejects.toThrow();
  });
});
