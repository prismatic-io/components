import { invoke } from "@prismatic-io/spectral/dist/testing";
import { bulkCreateVendorBankAccountsExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { bulkCreateVendorBankAccounts } from "./bulkCreateVendorBankAccounts";
const ENDPOINT = "/Bulk/Crud/Create/VendorBankAccount.json";
const params = {
  connection: testConnection,
  vendorBankAccountCreateBulk: [],
  mfaId: "!b_mfa",
  deviceId: "Device-Acme",
};
describe("bulkCreateVendorBankAccounts", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(bulkCreateVendorBankAccountsExamplePayload.data));
    const { result } = await invoke(bulkCreateVendorBankAccounts, params);
    expect(result.data).toEqual(
      bulkCreateVendorBankAccountsExamplePayload.data,
    );
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(bulkCreateVendorBankAccounts, params),
    ).rejects.toThrow();
  });
});
