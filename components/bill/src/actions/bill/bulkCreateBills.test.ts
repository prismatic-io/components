import { invoke } from "@prismatic-io/spectral/dist/testing";
import { bulkCreateBillsExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { bulkCreateBills } from "./bulkCreateBills";
const ENDPOINT = "/Bulk/Crud/Create/Bill.json";
describe("bulkCreateBills", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(bulkCreateBillsExamplePayload.data));
    const { result } = await invoke(bulkCreateBills, {
      connection: testConnection,
      billsCreateBulk: [],
    });
    expect(result.data).toEqual(bulkCreateBillsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(bulkCreateBills, {
        connection: testConnection,
        billsCreateBulk: [],
      }),
    ).rejects.toThrow();
  });
});
