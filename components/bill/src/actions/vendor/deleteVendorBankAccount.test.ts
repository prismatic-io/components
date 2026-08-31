import { invoke } from "@prismatic-io/spectral/dist/testing";
import { deleteVendorBankAccountExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { deleteVendorBankAccount } from "./deleteVendorBankAccount";
const ENDPOINT = "/Crud/Delete/VendorBankAccount.json";
const params = {
  connection: testConnection,
  vendorBankAccountId: "vba02BSNHVJVZPN17kxr",
  mfaId: "!b_mfa",
  deviceId: "Device-Acme",
};
describe("deleteVendorBankAccount", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(deleteVendorBankAccountExamplePayload.data));
    const { result } = await invoke(deleteVendorBankAccount, params);
    expect(result.data).toEqual(deleteVendorBankAccountExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(invoke(deleteVendorBankAccount, params)).rejects.toThrow();
  });
});
