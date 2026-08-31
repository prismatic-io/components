import { invokeDataSource } from "@prismatic-io/spectral/dist/testing";
import { listInvoiceExamplePayload } from "../examplePayloads";
import { RESOURCE_CONFIG } from "../constants";
import {
  SANDBOX_BASE,
  envelope,
  mockLogin,
  nock,
  testConnection,
} from "../testHelpers";
import { selectInvoice } from "./selectInvoice";
const ENDPOINT = RESOURCE_CONFIG.invoices.endpoint;
describe("selectInvoice", () => {
  beforeAll(() => nock.disableNetConnect());
  afterEach(() => nock.cleanAll());
  afterAll(() => nock.enableNetConnect());
  test("maps the list into { key, label } elements (id -> key, invoiceNumber -> label)", async () => {
    mockLogin();
    const scope = nock(SANDBOX_BASE)
      .post(ENDPOINT)
      .reply(200, envelope(listInvoiceExamplePayload.data));
    const { result } = await invokeDataSource(selectInvoice, {
      connection: testConnection,
    });
    expect(scope.isDone()).toBe(true);
    const records = listInvoiceExamplePayload.data as {
      id: string;
      invoiceNumber: string;
    }[];
    expect(result).toEqual(
      records.map((r) => ({ key: r.id, label: r.invoiceNumber })),
    );
    for (const element of result) {
      expect(element).toHaveProperty("key");
      expect(element).toHaveProperty("label");
    }
  });
  test("returns an empty array when the list is empty", async () => {
    mockLogin();
    nock(SANDBOX_BASE).post(ENDPOINT).reply(200, envelope([]));
    const { result } = await invokeDataSource(selectInvoice, {
      connection: testConnection,
    });
    expect(result).toEqual([]);
  });
});
