import { invoke } from "@prismatic-io/spectral/dist/testing";
import { deleteVendorExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { deleteVendor } from "./deleteVendor";
const ENDPOINT = "/Crud/Delete/Vendor.json";
describe("deleteVendor", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(deleteVendorExamplePayload.data));
    const { result } = await invoke(deleteVendor, {
      connection: testConnection,
      vendorId: "00902YSABCAKZHY25m0r",
    });
    expect(result.data).toEqual(deleteVendorExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(deleteVendor, {
        connection: testConnection,
        vendorId: "00902YSABCAKZHY25m0r",
      }),
    ).rejects.toThrow();
  });
});
