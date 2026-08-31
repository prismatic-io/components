import { invoke } from "@prismatic-io/spectral/dist/testing";
import { bulkUpdateBillsExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { bulkUpdateBills } from "./bulkUpdateBills";
const ENDPOINT = "/Bulk/Crud/Update/Bill.json";
describe("bulkUpdateBills", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(bulkUpdateBillsExamplePayload.data));
    const { result } = await invoke(bulkUpdateBills, {
      connection: testConnection,
      billsUpdateBulk: [],
    });
    expect(result.data).toEqual(bulkUpdateBillsExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(bulkUpdateBills, {
        connection: testConnection,
        billsUpdateBulk: [],
      }),
    ).rejects.toThrow();
  });
});
