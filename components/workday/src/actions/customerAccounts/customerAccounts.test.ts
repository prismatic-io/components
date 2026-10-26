import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getInvoiceByIdExamplePayload,
  getInvoicePdfExamplePayload,
  getPaymentByIdExamplePayload,
  listInvoicesExamplePayload,
  postPaymentExamplePayload,
} from "../../examplePayloads";
import { oauthTestConnection, TEST_HOST } from "../../testHelpers";
import { getInvoiceById } from "./getInvoiceById";
import { getInvoicePdf } from "./getInvoicePdf";
import { getPaymentById } from "./getPaymentById";
import { listInvoices } from "./listInvoices";
import { postPayment } from "./postPayment";
const SERVICE = "/ccx/customerAccounts/v1";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("getInvoiceById", () => {
  const params = { connection: oauthTestConnection(), invoiceId: "inv-1" };
  it("returns the invoice", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/invoices/inv-1`)
      .reply(200, getInvoiceByIdExamplePayload.data);
    const { result } = await invoke(getInvoiceById, params);
    expect(result).toEqual(getInvoiceByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/invoices/inv-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(getInvoiceById, params)).rejects.toThrow();
  });
});
describe("getInvoicePdf", () => {
  const params = { connection: oauthTestConnection(), invoicePdfId: "pdf-1" };
  it("returns the binary reply as a PDF Buffer", async () => {
    const pdfBytes = Buffer.from(getInvoicePdfExamplePayload.data);
    nock(TEST_HOST, { reqheaders: { accept: "*/*" } })
      .get(`${SERVICE}/invoicePDFs/pdf-1`)
      .reply(200, pdfBytes, { "Content-Type": "application/octet-stream" });
    const { result } = await invoke(getInvoicePdf, params);
    expect(Buffer.isBuffer(result?.data)).toBe(true);
    expect((result?.data as Buffer).equals(pdfBytes)).toBe(true);
    expect(result).toMatchObject({ contentType: "application/pdf" });
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/invoicePDFs/pdf-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(getInvoicePdf, params)).rejects.toThrow();
  });
});
describe("getPaymentById", () => {
  const params = { connection: oauthTestConnection(), paymentId: "pay-1" };
  it("returns the payment", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/payments/pay-1`)
      .reply(200, getPaymentByIdExamplePayload.data);
    const { result } = await invoke(getPaymentById, params);
    expect(result).toEqual(getPaymentByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/payments/pay-1`)
      .reply(404, { error: "not found" });
    await expect(invoke(getPaymentById, params)).rejects.toThrow();
  });
});
describe("listInvoices", () => {
  const params = {
    connection: oauthTestConnection(),
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { company: "co-1" },
  };
  it("returns invoices with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/invoices`)
      .query({ company: "co-1", limit: 10, offset: 20 })
      .reply(200, listInvoicesExamplePayload.data);
    const { result } = await invoke(listInvoices, params);
    expect(result).toEqual(listInvoicesExamplePayload);
  });
  it("reads every page with Fetch All", async () => {
    const [row] = listInvoicesExamplePayload.data.data;
    nock(TEST_HOST)
      .get(`${SERVICE}/invoices`)
      .query({ company: "co-1", limit: 1, offset: 0 })
      .reply(200, { total: 2, data: [row] })
      .get(`${SERVICE}/invoices`)
      .query({ company: "co-1", limit: 1, offset: 1 })
      .reply(200, { total: 2, data: [row] });
    const { result } = await invoke(listInvoices, {
      ...params,
      fetchAll: true,
      pagination: { limit: 1, offset: undefined },
    });
    expect(result).toEqual({ data: [row, row] });
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/invoices`)
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(listInvoices, params)).rejects.toThrow();
  });
});
describe("postPayment", () => {
  const params = {
    connection: oauthTestConnection(),
    remitFromCustomerId: "cu-1",
    amount: "250.00",
    typeId: "pt-1",
    date: new Date("2026-10-01T00:00:00.000Z"),
    companyId: "co-1",
    paymentId: "pay-1",
    additionalFields: {
      readyToAutoApply: true,
      reference: "ref-1",
      transactionNumber: "txn-1",
      memo: "October payment",
      paymentDescriptor: "Payment 1",
    },
  };
  it("sends the mapped body and returns the payment", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/payments`, {
        memo: "October payment",
        remitFromCustomer: { id: "cu-1" },
        readyToAutoApply: true,
        reference: "ref-1",
        transactionNumber: "txn-1",
        amount: "250.00",
        type: { id: "pt-1" },
        date: "2026-10-01T00:00:00.000Z",
        company: { id: "co-1" },
        descriptor: "Payment 1",
        id: "pay-1",
      })
      .reply(200, postPaymentExamplePayload.data);
    const { result } = await invoke(postPayment, params);
    expect(result).toEqual(postPaymentExamplePayload);
  });
  it("does not throw when additionalFields is not set", async () => {
    const { additionalFields: _unset, ...withoutKey } = params;
    nock(TEST_HOST)
      .post(`${SERVICE}/payments`)
      .reply(200, postPaymentExamplePayload.data);
    const { result } = await invoke(postPayment, withoutKey as typeof params);
    expect(result).toEqual(postPaymentExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/payments`)
      .reply(400, { error: "invalid" });
    await expect(invoke(postPayment, params)).rejects.toThrow();
  });
});
