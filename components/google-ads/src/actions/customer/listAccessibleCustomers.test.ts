import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { listAccessibleCustomersExamplePayload } from "../../examplePayloads";
import { listAccessibleCustomers } from "./listAccessibleCustomers";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const PATH = `/${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers`;
describe("listAccessibleCustomers action", () => {
  afterEach(() => nock.cleanAll());
  test("returns the accessible customer resource names", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL, {
      reqheaders: {
        authorization: "Bearer test-access-token",
        "developer-token": "test-developer-token",
      },
    })
      .get(PATH)
      .reply(200, listAccessibleCustomersExamplePayload.data);
    const { result } = await invoke(listAccessibleCustomers, { connection });
    expect(result.data).toEqual(listAccessibleCustomersExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .get(PATH)
      .reply(403, {
        error: { code: 403, message: "The caller does not have permission" },
      });
    await expect(
      invoke(listAccessibleCustomers, { connection }),
    ).rejects.toThrow();
  });
});
