import { invoke } from "@prismatic-io/spectral/dist/testing";
import { createInvoiceExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { createInvoice } from "./createInvoice";
const ENDPOINT = "/Crud/Create/Invoice.json";
const params = {
  connection: testConnection,
  customerId: "0cu02BLGFCGXROGGsnpx",
  invoiceNumber: "001",
  invoiceDate: "2024-07-22",
  dueDate: "2024-09-08",
  invoiceLineItems: [],
  additionalFields: undefined,
};
describe("createInvoice", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(createInvoiceExamplePayload.data));
    const { result } = await invoke(createInvoice, params);
    expect(result.data).toEqual(createInvoiceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(invoke(createInvoice, params)).rejects.toThrow();
  });
});
