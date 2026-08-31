import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createVendorBankAccountExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { createVendorBankAccount } from "./createVendorBankAccount";
const ENDPOINT = "/Crud/Create/VendorBankAccount.json";
const params = {
  connection: testConnection,
  vendorId: "00902GLBJSUATNY25m0s",
  accountNumber: "1234567890",
  routingNumber: "021000021",
  mfaId: "!b_mfa",
  deviceId: "Device-Acme",
  additionalFields: undefined,
};
describe("createVendorBankAccount", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(createVendorBankAccountExamplePayload.data));
    const { result } = await invoke(createVendorBankAccount, params);
    expect(result.data).toEqual(createVendorBankAccountExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(invoke(createVendorBankAccount, params)).rejects.toThrow();
  });
});
