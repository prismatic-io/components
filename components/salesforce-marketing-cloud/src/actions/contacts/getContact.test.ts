import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { CONTACTS_ESTABLISH_PATH } from "../../constants";
import { getContactExamplePayload } from "../../examplePayloads";
import { getContact } from "./getContact";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const CONTACT_KEY = "user@example.com";
const ESTABLISH_RESPONSE = {
  items: [{ value: { contactReference: getContactExamplePayload.data } }],
};
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("getContact", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts the contact key to the establish endpoint and unwraps the contact", async () => {
    const scope = nock(BASE_URL)
      .post(CONTACTS_ESTABLISH_PATH, { contactKeys: [CONTACT_KEY] })
      .reply(200, ESTABLISH_RESPONSE);
    const { result } = await invoke(getContact, {
      connection,
      contactKey: CONTACT_KEY,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getContactExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    const scope = nock(BASE_URL)
      .post(CONTACTS_ESTABLISH_PATH)
      .reply(500, { message: "Internal Server Error" });
    await expect(
      invoke(getContact, { connection, contactKey: CONTACT_KEY }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
