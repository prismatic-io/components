import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getCustomerBankAccountExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { getCustomerBankAccount } from "./getCustomerBankAccount";
const ENDPOINT = "/Crud/Read/CustomerBankAccount.json";
describe("getCustomerBankAccount", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(getCustomerBankAccountExamplePayload.data));
    const { result } = await invoke(getCustomerBankAccount, {
      connection: testConnection,
      customerBankAccountId: "cba02ILJVKOLFVLB6gqr",
    });
    expect(result.data).toEqual(getCustomerBankAccountExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(getCustomerBankAccount, {
        connection: testConnection,
        customerBankAccountId: "cba02ILJVKOLFVLB6gqr",
      }),
    ).rejects.toThrow();
  });
});
