import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { DATA_EXTENSIONS_PATH } from "../../constants";
import { getDataExtensionFieldsExamplePayload } from "../../examplePayloads";
import { getDataExtensionFields } from "./getDataExtensionFields";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const DATA_EXTENSION_ID = "f9e59b85-f353-ee11-ba4e-d4f5ef3d54c9";
const FIELDS_PATH = `${DATA_EXTENSIONS_PATH}/${encodeURIComponent(DATA_EXTENSION_ID)}/fields`;
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("getDataExtensionFields", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("gets the fields for the data extension", async () => {
    const scope = nock(BASE_URL)
      .get(FIELDS_PATH)
      .reply(200, getDataExtensionFieldsExamplePayload.data);
    const { result } = await invoke(getDataExtensionFields, {
      connection,
      dataExtensionId: DATA_EXTENSION_ID,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(getDataExtensionFieldsExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    const scope = nock(BASE_URL)
      .get(FIELDS_PATH)
      .reply(404, { message: "Not Found" });
    await expect(
      invoke(getDataExtensionFields, {
        connection,
        dataExtensionId: DATA_EXTENSION_ID,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
