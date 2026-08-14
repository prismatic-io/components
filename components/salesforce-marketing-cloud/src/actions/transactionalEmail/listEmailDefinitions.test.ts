import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { EMAIL_DEFINITIONS_PATH } from "../../constants";
import { listEmailDefinitionsExamplePayload } from "../../examplePayloads";
import { listEmailDefinitions } from "./listEmailDefinitions";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const params = {
  connection,
  fetchAll: false,
  pagination: { page: 1, pageSize: 25 },
};
describe("listEmailDefinitions", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("requests a single page and returns the envelope keyed by definitions", async () => {
    const scope = nock(BASE_URL)
      .get(EMAIL_DEFINITIONS_PATH)
      .query({ $pageSize: "25", $page: "1" })
      .reply(200, listEmailDefinitionsExamplePayload.data);
    const { result } = await invoke(listEmailDefinitions, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listEmailDefinitionsExamplePayload.data);
    const envelope = result.data as {
      definitions?: unknown;
      items?: unknown;
    };
    expect(envelope.definitions).toEqual(
      listEmailDefinitionsExamplePayload.data.definitions,
    );
    expect(envelope.items).toBeUndefined();
  });
  test("surfaces an API error when the definition list request fails", async () => {
    nock(BASE_URL)
      .get(EMAIL_DEFINITIONS_PATH)
      .query(true)
      .reply(500, { message: "Server Error" });
    await expect(invoke(listEmailDefinitions, params)).rejects.toThrow();
  });
});
