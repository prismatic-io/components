import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createVendorExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { createVendor } from "./createVendor";
const ENDPOINT = "/Crud/Create/Vendor.json";
const params = {
  connection: testConnection,
  name: "Acme Vendor",
  companyName: "Acme",
  email: "example@email.com",
  additionalFields: undefined,
};
describe("createVendor", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(createVendorExamplePayload.data));
    const { result } = await invoke(createVendor, params);
    expect(result.data).toEqual(createVendorExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(invoke(createVendor, params)).rejects.toThrow();
  });
});
