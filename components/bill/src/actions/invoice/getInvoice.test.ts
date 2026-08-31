import { invoke } from "@prismatic-io/spectral/dist/testing";
import { getInvoiceExamplePayload } from "../../examplePayloads";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../../testHelpers";
import { getInvoice } from "./getInvoice";
const ENDPOINT = "/Crud/Read/Invoice.json";
describe("getInvoice", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("happy path unwraps response_data", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(getInvoiceExamplePayload.data));
    const { result } = await invoke(getInvoice, {
      connection: testConnection,
      invoiceId: "00e02DTFJUMHHRGKh6zx",
    });
    expect(result.data).toEqual(getInvoiceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  test("error path surfaces the failure", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(400, {});
    await expect(
      invoke(getInvoice, {
        connection: testConnection,
        invoiceId: "00e02DTFJUMHHRGKh6zx",
      }),
    ).rejects.toThrow();
  });
});
