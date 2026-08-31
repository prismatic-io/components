import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createCustomerExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { createCustomer } from "./createCustomer";
const ENDPOINT = "/Crud/Create/Customer.json";
describe("createCustomer", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(createCustomerExamplePayload.data));
    const { result } = await invoke(createCustomer, {
      connection: testConnection,
      customerName: "John",
      additionalFields: undefined,
    });
    expect(result.data).toEqual(createCustomerExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(createCustomer, {
        connection: testConnection,
        customerName: "John",
        additionalFields: undefined,
      }),
    ).rejects.toThrow();
  });
});
