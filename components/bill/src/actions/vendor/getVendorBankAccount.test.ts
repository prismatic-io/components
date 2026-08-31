import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getVendorBankAccountExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { getVendorBankAccount } from "./getVendorBankAccount";
const ENDPOINT = "/Crud/Read/VendorBankAccount.json";
describe("getVendorBankAccount", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(getVendorBankAccountExamplePayload.data));
    const { result } = await invoke(getVendorBankAccount, {
      connection: testConnection,
      vendorBankAccountId: "vba02BSNHVJVZPN17kxr",
    });
    expect(result.data).toEqual(getVendorBankAccountExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(getVendorBankAccount, {
        connection: testConnection,
        vendorBankAccountId: "vba02BSNHVJVZPN17kxr",
      }),
    ).rejects.toThrow();
  });
});
