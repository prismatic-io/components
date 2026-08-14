import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { CONTACTS_EMAIL_SEARCH_PATH } from "../../constants";
import { searchContactsByEmailExamplePayload } from "../../examplePayloads";
import { searchContactsByEmail } from "./searchContactsByEmail";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const EMAIL_ADDRESS = "dangelo.cunningham@example.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("searchContactsByEmail", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts the email address and returns the matching contact keys", async () => {
    const scope = nock(BASE_URL)
      .post(CONTACTS_EMAIL_SEARCH_PATH, { email: EMAIL_ADDRESS })
      .reply(200, searchContactsByEmailExamplePayload.data);
    const { result } = await invoke(searchContactsByEmail, {
      connection,
      emailAddress: EMAIL_ADDRESS,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(searchContactsByEmailExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    const scope = nock(BASE_URL)
      .post(CONTACTS_EMAIL_SEARCH_PATH)
      .reply(401, { message: "Unauthorized" });
    await expect(
      invoke(searchContactsByEmail, {
        connection,
        emailAddress: EMAIL_ADDRESS,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
