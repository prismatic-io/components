import { invoke } from "@prismatic-io/spectral/dist/testing";
import { bulkUpdateCustomersExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { bulkUpdateCustomers } from "./bulkUpdateCustomers";
const ENDPOINT = "/Bulk/Crud/Update/Customer.json";
describe("bulkUpdateCustomers", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(bulkUpdateCustomersExamplePayload.data));
    const { result } = await invoke(bulkUpdateCustomers, {
      connection: testConnection,
      customersUpdateBulk: [],
    });
    expect(result.data).toEqual(bulkUpdateCustomersExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(bulkUpdateCustomers, {
        connection: testConnection,
        customersUpdateBulk: [],
      }),
    ).rejects.toThrow();
  });
});
