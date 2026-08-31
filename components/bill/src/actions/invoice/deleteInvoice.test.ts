import { invoke } from "@prismatic-io/spectral/dist/testing";
import { deleteInvoiceExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { deleteInvoice } from "./deleteInvoice";
const ENDPOINT = "/Crud/Delete/Invoice.json";
describe("deleteInvoice", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(deleteInvoiceExamplePayload.data));
    const { result } = await invoke(deleteInvoice, {
      connection: testConnection,
      invoiceId: "00e02DTFJUMHHRGKh6zx",
    });
    expect(result.data).toEqual(deleteInvoiceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(deleteInvoice, {
        connection: testConnection,
        invoiceId: "00e02DTFJUMHHRGKh6zx",
      }),
    ).rejects.toThrow();
  });
});
