import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { oauth } from "../../connections";
import { GOOGLE_ADS_API_VERSION, GOOGLE_ADS_BASE_URL } from "../../constants";
import { uploadClickConversionsExamplePayload } from "../../examplePayloads";
import { uploadClickConversions } from "./uploadClickConversions";
const connection = createConnection(
  oauth,
  { developerToken: "test-developer-token" },
  { access_token: "test-access-token" },
);
const CUSTOMER_ID = "1234567890";
const PATH = `/${GOOGLE_ADS_API_VERSION}/customers/${CUSTOMER_ID}:uploadClickConversions`;
const params = {
  connection,
  customerId: CUSTOMER_ID,
  managerCustomerId: "",
  conversions: [
    {
      gclid: "TeSter123.gClIdString_xYz",
      conversionAction: `customers/${CUSTOMER_ID}/conversionActions/987654321`,
      conversionDateTime: "2026-01-15 10:30:00-05:00",
    },
  ],
  validateOnly: false,
};
describe("uploadClickConversions", () => {
  afterEach(() => nock.cleanAll());
  test("posts the conversions and returns the upload results", async () => {
    const scope = nock(GOOGLE_ADS_BASE_URL)
      .post(PATH, {
        conversions: params.conversions,
        partialFailure: true,
        validateOnly: false,
      })
      .reply(200, uploadClickConversionsExamplePayload.data);
    const { result } = await invoke(uploadClickConversions, params);
    expect(result.data).toEqual(uploadClickConversionsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("surfaces an API error response", async () => {
    nock(GOOGLE_ADS_BASE_URL)
      .post(PATH)
      .reply(400, { error: { code: 400, message: "Invalid conversion" } });
    await expect(invoke(uploadClickConversions, params)).rejects.toThrow();
  });
});
