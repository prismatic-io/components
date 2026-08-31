import { invoke } from "@prismatic-io/spectral/dist/testing";
import { bulkCreateVendorExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { bulkCreateVendor } from "./bulkCreateVendor";
const ENDPOINT = "/Bulk/Crud/Create/Vendor.json";
describe("bulkCreateVendor", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(bulkCreateVendorExamplePayload.data));
    const { result } = await invoke(bulkCreateVendor, {
      connection: testConnection,
      vendorCreateBulk: [],
    });
    expect(result.data).toEqual(bulkCreateVendorExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(bulkCreateVendor, {
        connection: testConnection,
        vendorCreateBulk: [],
      }),
    ).rejects.toThrow();
  });
});
