import { invoke } from "@prismatic-io/spectral/dist/testing";
import { updateVendorExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { updateVendor } from "./updateVendor";
const ENDPOINT = "/Crud/Update/Vendor.json";
const params = {
  connection: testConnection,
  vendorId: "00902YSABCAKZHY25m0r",
  name: "Acme Vendor",
  additionalFields: undefined,
};
describe("updateVendor", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(updateVendorExamplePayload.data));
    const { result } = await invoke(updateVendor, params);
    expect(result.data).toEqual(updateVendorExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(invoke(updateVendor, params)).rejects.toThrow();
  });
});
