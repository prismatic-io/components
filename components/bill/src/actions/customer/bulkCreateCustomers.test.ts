import { invoke } from "@prismatic-io/spectral/dist/testing";
import { bulkCreateCustomersExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { bulkCreateCustomers } from "./bulkCreateCustomers";
const ENDPOINT = "/Bulk/Crud/Create/Customer.json";
describe("bulkCreateCustomers", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(bulkCreateCustomersExamplePayload.data));
    const { result } = await invoke(bulkCreateCustomers, {
      connection: testConnection,
      customersCreateBulk: [],
    });
    expect(result.data).toEqual(bulkCreateCustomersExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(bulkCreateCustomers, {
        connection: testConnection,
        customersCreateBulk: [],
      }),
    ).rejects.toThrow();
  });
});
