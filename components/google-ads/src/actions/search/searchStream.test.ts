import { createConnection, invoke } from "@prismatic-io/spectral/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { searchStream } from "./searchStream";

const connection = createConnection(
  oauth,
  {},
  { access_token: "test-access-token" },
);

const PATH = `/${GOOGLE_ADS_API_VERSION}/customers/1234567890/googleAds:searchStream`;
const row = (id: string) => ({ campaign: { id } });

const INVALID_ARGUMENT = {
  error: {
    code: 400,
    message: "Request contains an invalid argument.",
    status: "INVALID_ARGUMENT",
  },
};

describe("searchStream", () => {
  afterEach(() => nock.cleanAll());

  test("merges every batch into one result list", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, { query: "SELECT campaign.id FROM campaign" })
      .reply(200, [
        {
          results: [row("1"), row("2")],
          fieldMask: "campaign.id",
          requestId: "req-1",
        },
        { results: [row("3")], fieldMask: "campaign.id", requestId: "req-1" },
        { fieldMask: "campaign.id", requestId: "req-1" },
      ]);

    const { result } = await invoke(searchStream, {
      connection,
      customerId: "1234567890",
      query: "SELECT campaign.id FROM campaign",
      managerCustomerId: undefined,
      linkedCustomerId: undefined,
    });

    expect(scope.isDone()).toBe(true);
    expect(result.data).toEqual({
      results: [row("1"), row("2"), row("3")],
      fieldMask: "campaign.id",
      requestId: "req-1",
    });
  });

  test("returns an empty list when the query matches nothing", async () => {
    nock(GOOGLE_ADS_BASE_URL).post(PATH).reply(200, []);

    const { result } = await invoke(searchStream, {
      connection,
      customerId: "1234567890",
      query: "SELECT campaign.id FROM campaign",
      managerCustomerId: undefined,
      linkedCustomerId: undefined,
    });

    expect(result.data).toEqual({
      results: [],
      fieldMask: undefined,
      requestId: undefined,
    });
  });

  test("rejects when Google Ads returns 400", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, INVALID_ARGUMENT);

    await expect(
      invoke(searchStream, {
        connection,
        customerId: "1234567890",
        query: "SELECT campaign.id FROM campaign",
        managerCustomerId: undefined,
        linkedCustomerId: undefined,
      }),
    ).rejects.toThrow();
    expect(scope.isDone()).toBe(true);
  });
});
