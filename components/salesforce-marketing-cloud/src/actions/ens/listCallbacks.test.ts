import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { ENS_CALLBACKS_PATH } from "../../constants";
import { listCallbacksExamplePayload } from "../../examplePayloads";
import { listCallbacks } from "./listCallbacks";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("listCallbacks", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("issues an unparameterized GET and returns the bare callback array", async () => {
    const scope = nock(BASE_URL)
      .get(ENS_CALLBACKS_PATH)
      .reply(200, listCallbacksExamplePayload.data);
    const { result } = await invoke(listCallbacks, { connection });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(listCallbacksExamplePayload.data);
  });
  test("surfaces an API error when the callback list request fails", async () => {
    nock(BASE_URL)
      .get(ENS_CALLBACKS_PATH)
      .reply(500, { message: "Server Error" });
    await expect(invoke(listCallbacks, { connection })).rejects.toThrow();
  });
});
