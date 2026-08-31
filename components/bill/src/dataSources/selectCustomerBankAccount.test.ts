import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listCustomerBankAccountExamplePayload } from "../examplePayloads";
import { BANK_ACCOUNT_LIST_ENDPOINTS } from "../constants";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../testHelpers";
import { selectCustomerBankAccount } from "./selectCustomerBankAccount";
const ENDPOINT = BANK_ACCOUNT_LIST_ENDPOINTS.customerBankAccount;
describe("selectCustomerBankAccount", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("maps the list into { key, label } elements (id -> key, nameOnAccount -> label)", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(listCustomerBankAccountExamplePayload.data));
    const { result } = await invokeDataSource(selectCustomerBankAccount, {
      connection: testConnection,
    });
    expect(scope.isDone()).toBe(true);
    const records = listCustomerBankAccountExamplePayload.data as {
      id: string;
      nameOnAccount: string;
    }[];
    expect(result).toEqual(
      records.map((r) => ({ key: r.id, label: r.nameOnAccount })),
    );
    for (const element of result) {
      expect(element).toHaveProperty("key");
      expect(element).toHaveProperty("label");
    }
  });
  test("returns an empty array when the list is empty", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(200, envelope([]));
    const { result } = await invokeDataSource(selectCustomerBankAccount, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
