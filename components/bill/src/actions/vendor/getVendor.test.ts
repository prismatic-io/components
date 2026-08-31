import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getVendorExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { getVendor } from "./getVendor";
const ENDPOINT = "/Crud/Read/Vendor.json";
describe("getVendor", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(getVendorExamplePayload.data));
    const { result } = await invoke(getVendor, {
      connection: testConnection,
      vendorId: "00902YSABCAKZHY25m0r",
    });
    expect(result.data).toEqual(getVendorExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(getVendor, {
        connection: testConnection,
        vendorId: "00902YSABCAKZHY25m0r",
      }),
    ).rejects.toThrow();
  });
});
