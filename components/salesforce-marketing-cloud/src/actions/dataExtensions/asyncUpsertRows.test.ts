import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { sfmcOAuth2ClientCredentials } from "../../connections/sfmcOAuth2ClientCredentials";
import { ASYNC_DATA_EXTENSIONS_PATH } from "../../constants";
import { asyncUpsertRowsExamplePayload } from "../../examplePayloads";
import { asyncUpsertRows } from "./asyncUpsertRows";
const BASE_URL = "https://mc-test.rest.marketingcloudapis.com";
const DATA_EXTENSION_KEY = "my-data-extension-key";
const ROWS_PATH = `${ASYNC_DATA_EXTENSIONS_PATH}/key:${encodeURIComponent(DATA_EXTENSION_KEY)}/rows`;
const BATCH_ROWS = [
  {
    SubscriberKey: "contact-abc-123",
    EmailAddress: "john.doe@example.com",
    FirstName: "John",
  },
  {
    SubscriberKey: "contact-def-456",
    EmailAddress: "jane.smith@example.com",
    FirstName: "Jane",
  },
];
const connection = createConnection(
  sfmcOAuth2ClientCredentials,
  {},
  { access_token: "test-access-token", rest_instance_url: BASE_URL },
);
describe("asyncUpsertRows", () => {
  afterEach(() => {
    nock.cleanAll();
  });
  test("puts the batch rows to the keyed async rows path and returns the request id", async () => {
    const scope = nock(BASE_URL)
      .put(ROWS_PATH, { items: BATCH_ROWS })
      .reply(202, asyncUpsertRowsExamplePayload.data);
    const { result } = await invoke(asyncUpsertRows, {
      connection,
      dataExtensionKey: DATA_EXTENSION_KEY,
      batchRows: BATCH_ROWS,
    });
    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual(asyncUpsertRowsExamplePayload.data);
  });
  test("surfaces an API error", async () => {
    const scope = nock(BASE_URL)
      .put(ROWS_PATH)
      .reply(400, { message: "Bad Request" });
    await expect(
      invoke(asyncUpsertRows, {
        connection,
        dataExtensionKey: DATA_EXTENSION_KEY,
        batchRows: BATCH_ROWS,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
