import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getVendorResponse } from "../../examplePayloads/vendors";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { getVendor } from "./get";
const VENDOR_ID = "40218";
const PATH = apiPath(`/accounting/vendors/${VENDOR_ID}`);
describe("getVendor", () => {
  afterEach(resetNock);
  test("returns the vendor the API replies with", async () => {
    rampNock().get(PATH).reply(200, getVendorResponse);
    const { result } = await invoke(getVendor, {
      connection: testConnection,
      vendorId: VENDOR_ID,
    });
    expect(result.data).toEqual(getVendorResponse);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .get(PATH)
      .reply(404, { error: { message: "Vendor not found" } });
    await expect(
      invoke(getVendor, {
        connection: testConnection,
        vendorId: VENDOR_ID,
      }),
    ).rejects.toThrow();
  });
});
