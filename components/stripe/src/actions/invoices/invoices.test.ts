import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { stripeConnection } from "../../connections/apiKey";
import {
  createInvoiceExamplePayload,
  deleteInvoiceExamplePayload,
  getInvoiceExamplePayload,
  listInvoicesExamplePayload,
  updateInvoiceExamplePayload,
} from "../../examplePayloads/invoices";
import { createInvoice } from "./createInvoice";
import { deleteInvoice } from "./deleteInvoice";
import { getInvoice } from "./getInvoice";
import { listInvoices } from "./listInvoices";
import { updateInvoice } from "./updateInvoice";
const BASE = "https://api.stripe.com";
const conn = createConnection(stripeConnection, { apiKey: "sk_test_123" });
const params = (values: Record<string, unknown>) => values as never;
const INVOICE_ID = "in_1MtHbELkdIwHu7ixl4OzzPMv";
afterEach(() => nock.cleanAll());
describe("createInvoice", () => {
  it("creates the invoice and returns it", async () => {
    const scope = nock(BASE)
      .post("/v1/invoices")
      .reply(200, createInvoiceExamplePayload.data);
    const { result } = await invoke(
      createInvoice,
      params({
        customerId: "cus_NffrFeUfNV2Hib",
        collectionMethod: "charge_automatically",
        description: "Monthly subscription",
        metadata: {},
        fieldValues: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(createInvoiceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/invoices")
      .reply(400, {
        error: { type: "invalid_request_error", message: "No such customer" },
      });
    await expect(
      invoke(
        createInvoice,
        params({
          customerId: "cus_missing",
          metadata: {},
          fieldValues: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such customer");
  });
});
describe("getInvoice", () => {
  it("returns the invoice for the supplied ID", async () => {
    const scope = nock(BASE)
      .get(`/v1/invoices/${INVOICE_ID}`)
      .reply(200, getInvoiceExamplePayload.data);
    const { result } = await invoke(
      getInvoice,
      params({ invoiceId: INVOICE_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(getInvoiceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/invoices/in_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such invoice" },
      });
    await expect(
      invoke(
        getInvoice,
        params({ invoiceId: "in_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("No such invoice");
  });
});
describe("listInvoices", () => {
  it("returns the invoice list", async () => {
    const scope = nock(BASE)
      .get("/v1/invoices")
      .query({ limit: "10" })
      .reply(200, listInvoicesExamplePayload.data);
    const { result } = await invoke(
      listInvoices,
      params({ pagination: { limit: 10 }, stripeConnection: conn }),
    );
    expect(result.data).toEqual(listInvoicesExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .get("/v1/invoices")
      .query(true)
      .reply(400, {
        error: { type: "invalid_request_error", message: "Invalid limit" },
      });
    await expect(
      invoke(listInvoices, params({ pagination: {}, stripeConnection: conn })),
    ).rejects.toThrow("Invalid limit");
  });
});
describe("updateInvoice", () => {
  it("updates the invoice and returns it", async () => {
    const scope = nock(BASE)
      .post(`/v1/invoices/${INVOICE_ID}`)
      .reply(200, updateInvoiceExamplePayload.data);
    const { result } = await invoke(
      updateInvoice,
      params({
        invoiceId: INVOICE_ID,
        description: "Updated description",
        metadata: {},
        fieldValues: {},
        additionalFields: {},
        stripeConnection: conn,
      }),
    );
    expect(result.data).toEqual(updateInvoiceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .post("/v1/invoices/in_missing")
      .reply(404, {
        error: { type: "invalid_request_error", message: "No such invoice" },
      });
    await expect(
      invoke(
        updateInvoice,
        params({
          invoiceId: "in_missing",
          metadata: {},
          fieldValues: {},
          additionalFields: {},
          stripeConnection: conn,
        }),
      ),
    ).rejects.toThrow("No such invoice");
  });
});
describe("deleteInvoice", () => {
  it("deletes the invoice and returns the deletion confirmation", async () => {
    const scope = nock(BASE)
      .delete(`/v1/invoices/${INVOICE_ID}`)
      .reply(200, deleteInvoiceExamplePayload.data);
    const { result } = await invoke(
      deleteInvoice,
      params({ invoiceId: INVOICE_ID, stripeConnection: conn }),
    );
    expect(result.data).toEqual(deleteInvoiceExamplePayload.data);
    expect(scope.isDone()).toBe(true);
  });
  it("surfaces a Stripe error response", async () => {
    nock(BASE)
      .delete("/v1/invoices/in_missing")
      .reply(400, {
        error: {
          type: "invalid_request_error",
          message: "You can only delete draft invoices",
        },
      });
    await expect(
      invoke(
        deleteInvoice,
        params({ invoiceId: "in_missing", stripeConnection: conn }),
      ),
    ).rejects.toThrow("only delete draft invoices");
  });
});
