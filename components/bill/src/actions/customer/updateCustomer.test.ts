import { invoke } from "@prismatic-io/spectral/dist/testing";
import { updateCustomerExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { updateCustomer } from "./updateCustomer";
const ENDPOINT = "/Crud/Update/Customer.json";
const params = {
  connection: testConnection,
  customerName: "John",
  customerId: "0cu02EAQUAPCBNTDsmzc",
  additionalFields: undefined,
};
describe("updateCustomer", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(updateCustomerExamplePayload.data));
    const { result } = await invoke(updateCustomer, params);
    expect(result.data).toEqual(updateCustomerExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(invoke(updateCustomer, params)).rejects.toThrow();
  });
});
