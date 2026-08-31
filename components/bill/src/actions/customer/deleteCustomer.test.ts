import { invoke } from "@prismatic-io/spectral/dist/testing";
import { deleteCustomerExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { deleteCustomer } from "./deleteCustomer";
const ENDPOINT = "/Crud/Delete/Customer.json";
describe("deleteCustomer", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(deleteCustomerExamplePayload.data));
    const { result } = await invoke(deleteCustomer, {
      connection: testConnection,
      customerId: "0cu02EAQUAPCBNTDsmzc",
    });
    expect(result.data).toEqual(deleteCustomerExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(deleteCustomer, {
        connection: testConnection,
        customerId: "0cu02EAQUAPCBNTDsmzc",
      }),
    ).rejects.toThrow();
  });
});
