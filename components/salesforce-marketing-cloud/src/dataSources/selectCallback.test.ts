import {
  createConnection,
  invokeDataSource,
} from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../connections/sfmcOAuth2ClientCredentials";
import { listCallbacksExamplePayload } from "../examplePayloads";
import { selectCallback } from "./selectCallback";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const ENS_CALLBACKS_PATH = "/platform/v1/ens-callbacks";
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("selectCallback", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("maps the listed callbacks to label and key elements", async () => {
    nock(BASE_URL)
      .get(ENS_CALLBACKS_PATH)
      .reply(200, listCallbacksExamplePayload.data);
    const { result } = await invokeDataSource(selectCallback, { connection });
    expect(result).toEqual([
      {
        label: "Example Callback",
        key: "14e2ee5b-8c01-4f9d-916d-29e329945619",
      },
    ]);
  });
  test("returns an empty array when the API reports no callbacks", async () => {
    nock(BASE_URL).get(ENS_CALLBACKS_PATH).reply(200, []);
    const { result } = await invokeDataSource(selectCallback, { connection });
    expect(result).toEqual([]);
  });
});
