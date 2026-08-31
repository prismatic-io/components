import { invoke } from "@prismatic-io/spectral/dist/testing";
import { bulkUpdateVendorsExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { bulkUpdateVendors } from "./bulkUpdateVendors";
const ENDPOINT = "/Bulk/Crud/Update/Vendor.json";
describe("bulkUpdateVendors", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(bulkUpdateVendorsExamplePayload.data));
    const { result } = await invoke(bulkUpdateVendors, {
      connection: testConnection,
      vendorUpdateBulk: [],
    });
    expect(result.data).toEqual(bulkUpdateVendorsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(bulkUpdateVendors, {
        connection: testConnection,
        vendorUpdateBulk: [],
      }),
    ).rejects.toThrow();
  });
});
