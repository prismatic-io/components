import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { CONTACTS_PATH } from "../../constants";
import { createContactExamplePayload } from "../../examplePayloads";
import { createContact } from "./createContact";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const CONTACT_KEY = "acruz@example.com";
const ATTRIBUTE_SETS = [
  {
    name: "Email Addresses",
    items: [
      {
        values: [
          { name: "Email Address", value: "acruz@example.com" },
          { name: "HTML Enabled", value: "true" },
        ],
      },
    ],
  },
];
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("createContact", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts the contact key and attribute sets and returns the created contact", async () => {
    const scope = nock(BASE_URL)
      .post(CONTACTS_PATH, {
        contactKey: CONTACT_KEY,
        attributeSets: ATTRIBUTE_SETS,
      })
      .reply(201, createContactExamplePayload.data);
    const { result } = await invoke(createContact, {
      connection,
      contactKey: CONTACT_KEY,
      attributeSets: ATTRIBUTE_SETS,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(createContactExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    const scope = nock(BASE_URL)
      .post(CONTACTS_PATH)
      .reply(400, { message: "Bad Request" });
    await expect(
      invoke(createContact, {
        connection,
        contactKey: CONTACT_KEY,
        attributeSets: ATTRIBUTE_SETS,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
