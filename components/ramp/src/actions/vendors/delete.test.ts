import { invoke } from "@prismatic-io/spectral/dist/testing";
import { GENERIC_DELETE_RESPONSE } from "../../constants";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { deleteVendor } from "./delete";
const VENDOR_ID = "40218";
const PATH = apiPath(`/accounting/vendors/${VENDOR_ID}`);
describe("deleteVendor", () => {
  afterEach(resetNock);
  test("returns the generic delete constant rather than the API response body", async () => {
    rampNock().delete(PATH).reply(200, { id: VENDOR_ID, deleted: true });
    const { result } = await invoke(deleteVendor, {
      connection: testConnection,
      vendorId: VENDOR_ID,
    });
    expect(result.data).toBe(GENERIC_DELETE_RESPONSE);
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .delete(PATH)
      .reply(404, { error: { message: "Vendor not found" } });
    await expect(
      invoke(deleteVendor, {
        connection: testConnection,
        vendorId: VENDOR_ID,
      }),
    ).rejects.toThrow();
  });
});
