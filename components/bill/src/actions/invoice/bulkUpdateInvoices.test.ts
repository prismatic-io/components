import { invoke } from "@prismatic-io/spectral/dist/testing";
import { bulkUpdateInvoicesExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { bulkUpdateInvoices } from "./bulkUpdateInvoices";
const ENDPOINT = "/Bulk/Crud/Update/Invoice.json";
describe("bulkUpdateInvoices", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(bulkUpdateInvoicesExamplePayload.data));
    const { result } = await invoke(bulkUpdateInvoices, {
      connection: testConnection,
      invoiceUpdateBulk: [],
    });
    expect(result.data).toEqual(bulkUpdateInvoicesExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(bulkUpdateInvoices, {
        connection: testConnection,
        invoiceUpdateBulk: [],
      }),
    ).rejects.toThrow();
  });
});
