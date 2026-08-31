import { invoke } from "@prismatic-io/spectral/dist/testing";
import { updateInvoiceExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { updateInvoice } from "./updateInvoice";
const ENDPOINT = "/Crud/Update/Invoice.json";
const params = {
  connection: testConnection,
  invoiceId: "00e02DTFJUMHHRGKh6zx",
  customerId: "0cu02BLGFCGXROGGsnpx",
  invoiceNumber: "001",
  invoiceDate: "2024-07-22",
  dueDate: "2024-09-08",
  invoiceLineItems: [],
  additionalFields: undefined,
};
describe("updateInvoice", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(updateInvoiceExamplePayload.data));
    const { result } = await invoke(updateInvoice, params);
    expect(result.data).toEqual(updateInvoiceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(invoke(updateInvoice, params)).rejects.toThrow();
  });
});
