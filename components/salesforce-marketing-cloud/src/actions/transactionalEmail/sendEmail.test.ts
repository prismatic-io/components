import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { EMAIL_MESSAGES_PATH } from "../../constants";
import { sendEmailExamplePayload } from "../../examplePayloads";
import { sendEmail } from "./sendEmail";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const MESSAGE_KEY = "msg-abc-123";
const params = {
  connection,
  messageKey: MESSAGE_KEY,
  emailDefinitionKey: "welcome-email-def",
  recipientContactKey: "contact-abc-123",
  recipientEmail: "john.doe@example.com",
  recipientAttributes: undefined as unknown as object,
};
describe("sendEmail", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts the recipient envelope to the message key path and defaults attributes to an empty object", async () => {
    const scope = nock(BASE_URL)
      .post(`${EMAIL_MESSAGES_PATH}/${MESSAGE_KEY}`, {
        definitionKey: "welcome-email-def",
        recipient: {
          contactKey: "contact-abc-123",
          to: "john.doe@example.com",
          attributes: {},
        },
      })
      .reply(202, sendEmailExamplePayload.data);
    const { result } = await invoke(sendEmail, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(sendEmailExamplePayload.data);
  });
  test("surfaces an API error when the send is rejected", async () => {
    nock(BASE_URL)
      .post(`${EMAIL_MESSAGES_PATH}/${MESSAGE_KEY}`)
      .reply(400, { message: "Unknown definition key" });
    await expect(invoke(sendEmail, params)).rejects.toThrow();
  });
});
