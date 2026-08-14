import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { SMS_MESSAGES_PATH } from "../../constants";
import { sendSmsExamplePayload } from "../../examplePayloads";
import { sendSms } from "./sendSms";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const MESSAGE_KEY = "msg-abc-123";
const params = {
  connection,
  smsMessageKey: MESSAGE_KEY,
  smsDefinitionKey: "order-confirmation-sms",
  smsRecipientContactKey: "contact-abc-123",
  smsRecipientPhone: "+15551234567",
  smsRecipientAttributes: { OrderNumber: "ORD-12345" },
};
describe("sendSms", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts the recipient envelope with the phone number as the to field", async () => {
    const scope = nock(BASE_URL)
      .post(`${SMS_MESSAGES_PATH}/${MESSAGE_KEY}`, {
        definitionKey: "order-confirmation-sms",
        recipient: {
          contactKey: "contact-abc-123",
          to: "+15551234567",
          attributes: { OrderNumber: "ORD-12345" },
        },
      })
      .reply(202, sendSmsExamplePayload.data);
    const { result } = await invoke(sendSms, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(sendSmsExamplePayload.data);
  });
  test("surfaces an API error when the send is rejected", async () => {
    nock(BASE_URL)
      .post(`${SMS_MESSAGES_PATH}/${MESSAGE_KEY}`)
      .reply(400, { message: "Unknown definition key" });
    await expect(invoke(sendSms, params)).rejects.toThrow();
  });
});
