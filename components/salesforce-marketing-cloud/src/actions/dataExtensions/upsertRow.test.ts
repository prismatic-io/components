import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { DATA_EVENTS_PATH } from "../../constants";
import { upsertRowExamplePayload } from "../../examplePayloads";
import { upsertRow } from "./upsertRow";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const DATA_EXTENSION_KEY = "my-data-extension-key";
const ROWSET_PATH = `${DATA_EVENTS_PATH}/key:${encodeURIComponent(DATA_EXTENSION_KEY)}/rowset`;
const PRIMARY_KEYS = { key: "425" };
const ROW_DATA = { name: "Example Name" };
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("upsertRow", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("posts a single-element rowset array and returns the upserted rows", async () => {
    const scope = nock(BASE_URL)
      .post(ROWSET_PATH, [{ keys: PRIMARY_KEYS, values: ROW_DATA }])
      .reply(200, upsertRowExamplePayload.data);
    const { result } = await invoke(upsertRow, {
      connection,
      dataExtensionKey: DATA_EXTENSION_KEY,
      primaryKeys: PRIMARY_KEYS,
      rowData: ROW_DATA,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(upsertRowExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    const scope = nock(BASE_URL)
      .post(ROWSET_PATH)
      .reply(400, { message: "Bad Request" });
    await expect(
      invoke(upsertRow, {
        connection,
        dataExtensionKey: DATA_EXTENSION_KEY,
        primaryKeys: PRIMARY_KEYS,
        rowData: ROW_DATA,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
