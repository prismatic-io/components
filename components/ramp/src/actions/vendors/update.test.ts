import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getVendorResponse } from "../../examplePayloads/vendors";
import {
  apiPath,
  rampNock,
  resetNock,
  testConnection,
} from "../../testHarness";
import { updateVendor } from "./update";
const VENDOR_ID = "40218";
const PATH = apiPath(`/accounting/vendors/${VENDOR_ID}`);
const SUBSIDIARIES = ["d4fb347a-e24d-46aa-bdbd-f51ee6f3938b"];
describe("updateVendor", () => {
  afterEach(resetNock);
  test("maps the inputs onto the request body and returns the updated vendor", async () => {
    rampNock()
      .patch(PATH, {
        code: "20134",
        name: "Amazon Web Services",
        reactivate: true,
        subsidiaries: SUBSIDIARIES,
      })
      .reply(200, {
        ...getVendorResponse,
        code: "20134",
        name: "Amazon Web Services",
      });
    const { result } = await invoke(updateVendor, {
      connection: testConnection,
      vendorId: VENDOR_ID,
      code: "20134",
      name: "Amazon Web Services",
      reactivate: true,
      subsidiaries: SUBSIDIARIES,
    });
    expect(result.data).toEqual({
      ...getVendorResponse,
      code: "20134",
      name: "Amazon Web Services",
    });
  });
  test("surfaces an API failure", async () => {
    rampNock()
      .patch(PATH)
      .reply(404, { error: { message: "Vendor not found" } });
    await expect(
      invoke(updateVendor, {
        connection: testConnection,
        vendorId: VENDOR_ID,
        code: "20134",
        name: "Amazon Web Services",
        reactivate: true,
        subsidiaries: SUBSIDIARIES,
      }),
    ).rejects.toThrow();
  });
});
