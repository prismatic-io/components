import { invoke } from "@prismatic-io/spectral/dist/testing";
import { bulkCreateInvoicesExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { bulkCreateInvoices } from "./bulkCreateInvoices";
const ENDPOINT = "/Bulk/Crud/Create/Invoice.json";
describe("bulkCreateInvoices", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(bulkCreateInvoicesExamplePayload.data));
    const { result } = await invoke(bulkCreateInvoices, {
      connection: testConnection,
      invoiceCreateBulk: [],
    });
    expect(result.data).toEqual(bulkCreateInvoicesExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(bulkCreateInvoices, {
        connection: testConnection,
        invoiceCreateBulk: [],
      }),
    ).rejects.toThrow();
  });
});
