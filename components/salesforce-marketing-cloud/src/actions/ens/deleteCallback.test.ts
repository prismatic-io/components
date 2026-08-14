import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { ENS_CALLBACKS_PATH } from "../../constants";
import { deleteCallback } from "./deleteCallback";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
const CALLBACK_ID = "c3d4e5f6-a7b8-9012-cdef-234567890123";
const params = { connection, callbackId: CALLBACK_ID };
describe("deleteCallback", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("deletes the callback and returns a synthesized success result", async () => {
    const scope = nock(BASE_URL)
      .delete(`${ENS_CALLBACKS_PATH}/${CALLBACK_ID}`)
      .reply(200, { unrelated: "the perform never reads this" });
    const { result } = await invoke(deleteCallback, params);
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual({
      success: true,
      callbackId: CALLBACK_ID,
      message: "Callback deleted successfully",
    });
  });
  test("surfaces an API error when the callback cannot be deleted", async () => {
    nock(BASE_URL)
      .delete(`${ENS_CALLBACKS_PATH}/${CALLBACK_ID}`)
      .reply(404, { message: "Callback not found" });
    await expect(invoke(deleteCallback, params)).rejects.toThrow();
  });
});
