import { invoke } from "@prismatic-io/spectral/dist/testing";
import { listVendorBankAccountsExamplePayload } from "../../examplePayloads";
import { BANK_ACCOUNT_LIST_ENDPOINTS } from "../../constants";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { listVendorBankAccounts } from "./listVendorBankAccounts";
const ENDPOINT = BANK_ACCOUNT_LIST_ENDPOINTS.vendorBankAccount;
describe("listVendorBankAccounts", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(listVendorBankAccountsExamplePayload.data));
    const { result } = await invoke(listVendorBankAccounts, {
      connection: testConnection,
      filters: undefined,
      sort: undefined,
      start: 0,
      max: 999,
      nested: false,
    });
    expect(result.data).toEqual(listVendorBankAccountsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(listVendorBankAccounts, {
        connection: testConnection,
        filters: undefined,
        sort: undefined,
        start: 0,
        max: 999,
        nested: false,
      }),
    ).rejects.toThrow();
  });
});
