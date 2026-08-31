import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getCustomerExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { getCustomer } from "./getCustomer";
const ENDPOINT = "/Crud/Read/Customer.json";
describe("getCustomer", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(getCustomerExamplePayload.data));
    const { result } = await invoke(getCustomer, {
      connection: testConnection,
      customerId: "0cu02EAQUAPCBNTDsmzc",
    });
    expect(result.data).toEqual(getCustomerExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(getCustomer, {
        connection: testConnection,
        customerId: "0cu02EAQUAPCBNTDsmzc",
      }),
    ).rejects.toThrow();
  });
});
