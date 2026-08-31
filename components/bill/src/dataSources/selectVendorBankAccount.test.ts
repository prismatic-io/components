import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listVendorBankAccountsExamplePayload } from "../examplePayloads";
import { BANK_ACCOUNT_LIST_ENDPOINTS } from "../constants";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../testHelpers";
import { selectVendorBankAccount } from "./selectVendorBankAccount";
const ENDPOINT = BANK_ACCOUNT_LIST_ENDPOINTS.vendorBankAccount;
describe("selectVendorBankAccount", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("maps the list into { key, label } elements (id -> key, nameOnAcct -> label)", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(listVendorBankAccountsExamplePayload.data));
    const { result } = await invokeDataSource(selectVendorBankAccount, {
      connection: testConnection,
    });
    expect(scope.isDone()).toBe(true);
    const records = listVendorBankAccountsExamplePayload.data as {
      id: string;
      nameOnAcct: string;
    }[];
    expect(result).toEqual(
      records.map((r) => ({ key: r.id, label: r.nameOnAcct })),
    );
    for (const element of result) {
      expect(element).toHaveProperty("key");
      expect(element).toHaveProperty("label");
    }
  });
  test("returns an empty array when the list is empty", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(200, envelope([]));
    const { result } = await invokeDataSource(selectVendorBankAccount, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
