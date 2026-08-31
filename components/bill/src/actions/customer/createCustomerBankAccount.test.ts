import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createCustomerBankAccountExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { createCustomerBankAccount } from "./createCustomerBankAccount";
const ENDPOINT = "/Crud/Create/CustomerBankAccount.json";
const params = {
  connection: testConnection,
  customerId: "0cu02BLGFCGXROGGsnpx",
  nameOnAccount: "Test",
  routingNumber: "011401533",
  accountNumber: "1234567890",
  additionalFields: undefined,
  agreedWithTOS: true,
};
describe("createCustomerBankAccount", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(createCustomerBankAccountExamplePayload.data));
    const { result } = await invoke(createCustomerBankAccount, params);
    expect(result.data).toEqual(createCustomerBankAccountExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(invoke(createCustomerBankAccount, params)).rejects.toThrow();
  });
});
