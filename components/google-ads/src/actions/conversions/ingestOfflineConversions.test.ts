import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import {
  GOOGLE_DATA_MANAGER_API_VERSION,
  GOOGLE_DATA_MANAGER_BASE_URL,
} from "../../constants";
import { ingestOfflineConversionsExamplePayload } from "../../examplePayloads";
import { ingestOfflineConversions } from "./ingestOfflineConversions";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const PATH = `/${GOOGLE_DATA_MANAGER_API_VERSION}/events:ingest`;
const params = {
  connection,
  events: [
    {
      eventTimestamp: "2026-05-15T12:30:00Z",
      transactionId: "ORDER-2026-00123",
      conversionValue: 149.99,
      currency: "USD",
    },
  ],
  destinations: [
    {
      operatingAccount: { accountType: "GOOGLE_ADS", accountId: "1234567890" },
      productDestinationId: "987654321",
    },
  ],
  encoding: "HEX",
  validateOnly: false,
};
describe("ingestOfflineConversions", () => {
  afterEach(() => nock.cleanAll());
  test("posts events to the Data Manager host and returns the request id", async () => {
    const scope = nock(GOOGLE_DATA_MANAGER_BASE_URL, {
      reqheaders: { authorization: "Bearer test-access-token" },
    })
      .post(PATH, {
        destinations: params.destinations,
        events: params.events,
        validateOnly: false,
        encoding: "HEX",
      })
      .reply(200, ingestOfflineConversionsExamplePayload.data);
    const { result } = await invoke(ingestOfflineConversions, params);
    expect(result.data).toEqual(ingestOfflineConversionsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_DATA_MANAGER_BASE_URL)
      .post(PATH)
      .reply(400, { error: { code: 400, message: "Invalid event" } });
    await expect(invoke(ingestOfflineConversions, params)).rejects.toThrow();
  });
});
