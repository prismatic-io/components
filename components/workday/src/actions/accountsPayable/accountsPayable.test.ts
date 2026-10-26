import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import {
  getSupplierInvoiceRequestAttachmentsExamplePayload,
  getSupplierInvoiceRequestsByIdExamplePayload,
  listSupplierInvoiceRequestsExamplePayload,
  postSupplierInvoiceRequestsAttachmentsExamplePayload,
  postSupplierInvoiceRequestsExamplePayload,
  submitSupplierInvoiceRequestExamplePayload,
} from "../../examplePayloads";
import {
  oauthTestConnection,
  parseJsonDataPart,
  TEST_HOST,
} from "../../testHelpers";
import { getSupplierInvoiceRequestAttachments } from "./getSupplierInvoiceRequestAttachments";
import { getSupplierInvoiceRequestsById } from "./getSupplierInvoiceRequestsById";
import { listSupplierInvoiceRequests } from "./listSupplierInvoiceRequests";
import { postSupplierInvoiceRequests } from "./postSupplierInvoiceRequests";
import { postSupplierInvoiceRequestsAttachments } from "./postSupplierInvoiceRequestsAttachments";
import { submitSupplierInvoiceRequest } from "./submitSupplierInvoiceRequest";
const SERVICE = "/ccx/accountsPayable/v1";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("getSupplierInvoiceRequestAttachments", () => {
  const params = {
    connection: oauthTestConnection(),
    supplierInvoiceRequestId: "sir-1",
    fetchAll: false,
    pagination: { limit: 10, offset: 0 },
  };
  it("returns one page of attachments", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/supplierInvoiceRequests/sir-1/attachments`)
      .query({ limit: 10, offset: 0 })
      .reply(200, getSupplierInvoiceRequestAttachmentsExamplePayload.data);
    const { result } = await invoke(
      getSupplierInvoiceRequestAttachments,
      params,
    );
    expect(result).toEqual(getSupplierInvoiceRequestAttachmentsExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/supplierInvoiceRequests/sir-1/attachments`)
      .query(true)
      .reply(404, { error: "not found" });
    await expect(
      invoke(getSupplierInvoiceRequestAttachments, params),
    ).rejects.toThrow();
  });
});
describe("getSupplierInvoiceRequestsById", () => {
  const params = {
    connection: oauthTestConnection(),
    supplierInvoiceRequestId: "sir-1",
  };
  it("returns the supplier invoice request", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/supplierInvoiceRequests/sir-1`)
      .reply(200, getSupplierInvoiceRequestsByIdExamplePayload.data);
    const { result } = await invoke(getSupplierInvoiceRequestsById, params);
    expect(result).toEqual(getSupplierInvoiceRequestsByIdExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/supplierInvoiceRequests/sir-1`)
      .reply(404, { error: "not found" });
    await expect(
      invoke(getSupplierInvoiceRequestsById, params),
    ).rejects.toThrow();
  });
});
describe("listSupplierInvoiceRequests", () => {
  const params = {
    connection: oauthTestConnection(),
    fetchAll: false,
    pagination: { limit: 10, offset: 20 },
    extraParameters: { status: "Draft" },
  };
  it("returns one page with the query parameters", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/supplierInvoiceRequests`)
      .query({ status: "Draft", limit: 10, offset: 20 })
      .reply(200, listSupplierInvoiceRequestsExamplePayload.data);
    const { result } = await invoke(listSupplierInvoiceRequests, params);
    expect(result).toEqual(listSupplierInvoiceRequestsExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .get(`${SERVICE}/supplierInvoiceRequests`)
      .query(true)
      .reply(500, { error: "server error" });
    await expect(invoke(listSupplierInvoiceRequests, params)).rejects.toThrow();
  });
});
describe("postSupplierInvoiceRequests", () => {
  const params = {
    connection: oauthTestConnection(),
    companyId: "co-1",
    supplierId: "sup-1",
    invoiceDate: new Date("2026-10-01T00:00:00.000Z"),
    amount: {
      currencyId: "USD",
      taxAmount: "10.00",
      controlTotalAmount: "110.00",
    },
    requesterId: "req-1",
    paymentTermsId: "pt-1",
    referenceTypeId: "rt-1",
    memo: "Office supplies",
    supplierInvoiceId: "si-1",
    supplierInvoiceDescriptor: "Invoice 1",
    extraBody: { referenceNumber: "PO-000456" },
  };
  it("sends the required company, supplier, and invoice date with the mapped body and Extra Body", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/supplierInvoiceRequests`, {
        supplier: { id: "sup-1" },
        invoiceDate: "2026-10-01T00:00:00.000Z",
        currency: { id: "USD" },
        company: { id: "co-1" },
        taxAmount: "10.00",
        requester: { id: "req-1" },
        controlTotalAmount: "110.00",
        paymentTerms: { id: "pt-1" },
        referenceType: { id: "rt-1" },
        memo: "Office supplies",
        id: "si-1",
        descriptor: "Invoice 1",
        referenceNumber: "PO-000456",
      })
      .reply(200, postSupplierInvoiceRequestsExamplePayload.data);
    const { result } = await invoke(postSupplierInvoiceRequests, params);
    expect(result).toEqual(postSupplierInvoiceRequestsExamplePayload);
  });
  it("does not throw when amount is not set", async () => {
    const { amount: _unset, ...withoutKey } = params;
    nock(TEST_HOST)
      .post(`${SERVICE}/supplierInvoiceRequests`)
      .reply(200, postSupplierInvoiceRequestsExamplePayload.data);
    const { result } = await invoke(
      postSupplierInvoiceRequests,
      withoutKey as typeof params,
    );
    expect(result).toEqual(postSupplierInvoiceRequestsExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/supplierInvoiceRequests`)
      .reply(400, { error: "invalid" });
    await expect(invoke(postSupplierInvoiceRequests, params)).rejects.toThrow();
  });
});
describe("postSupplierInvoiceRequestsAttachments", () => {
  const file = {
    data: Buffer.from("%PDF-1.4 invoice"),
    contentType: "application/pdf",
    suggestedExtension: "pdf",
  };
  const params = {
    connection: oauthTestConnection(),
    supplierInvoiceRequestId: "sir-1",
    file,
    attachmentDetails: {
      fileLength: 1024,
      fileName: "invoice.pdf",
      supplierInvoiceRequestAttachmentDescriptor: "Invoice PDF",
    },
    contentTypeId: "ct-1",
    supplierInvoiceRequestAttachmentId: "att-1",
  };
  it("uploads the metadata as the jsonData part and the binary as the file part", async () => {
    nock(TEST_HOST, {
      reqheaders: { "content-type": /^multipart\/form-data; boundary=/ },
    })
      .post(
        `${SERVICE}/supplierInvoiceRequests/sir-1/attachments`,
        (body: string) =>
          JSON.stringify(parseJsonDataPart(body)) ===
            JSON.stringify({
              fileName: "invoice.pdf",
              fileLength: 1024,
              contentType: { id: "ct-1" },
              descriptor: "Invoice PDF",
              id: "att-1",
            }) &&
          body.includes('name="file"; filename="invoice.pdf"') &&
          body.includes("%PDF-1.4 invoice"),
      )
      .reply(201, postSupplierInvoiceRequestsAttachmentsExamplePayload.data);
    const { result } = await invoke(
      postSupplierInvoiceRequestsAttachments,
      params,
    );
    expect(result).toEqual(
      postSupplierInvoiceRequestsAttachmentsExamplePayload,
    );
  });
  it("defaults the file name and length from the file", async () => {
    nock(TEST_HOST)
      .post(
        `${SERVICE}/supplierInvoiceRequests/sir-1/attachments`,
        (body: string) =>
          JSON.stringify(parseJsonDataPart(body)) ===
            JSON.stringify({
              fileName: "attachment.pdf",
              fileLength: file.data.length,
            }) && body.includes('filename="attachment.pdf"'),
      )
      .reply(201, postSupplierInvoiceRequestsAttachmentsExamplePayload.data);
    await invoke(postSupplierInvoiceRequestsAttachments, {
      ...params,
      attachmentDetails: {
        fileLength: undefined,
        fileName: undefined,
        supplierInvoiceRequestAttachmentDescriptor: undefined,
      },
      contentTypeId: undefined,
      supplierInvoiceRequestAttachmentId: undefined,
    });
  });
  it("does not throw when attachmentDetails is not set", async () => {
    const { attachmentDetails: _unset, ...withoutKey } = params;
    nock(TEST_HOST)
      .post(`${SERVICE}/supplierInvoiceRequests/sir-1/attachments`)
      .reply(201, postSupplierInvoiceRequestsAttachmentsExamplePayload.data);
    const { result } = await invoke(
      postSupplierInvoiceRequestsAttachments,
      withoutKey as typeof params,
    );
    expect(result).toEqual(
      postSupplierInvoiceRequestsAttachmentsExamplePayload,
    );
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/supplierInvoiceRequests/sir-1/attachments`)
      .reply(400, { error: "invalid" });
    await expect(
      invoke(postSupplierInvoiceRequestsAttachments, params),
    ).rejects.toThrow();
  });
});
describe("submitSupplierInvoiceRequest", () => {
  const params = {
    connection: oauthTestConnection(),
    supplierInvoiceRequestId: "sir-1",
    supplierInvoiceInstanceId: "inst-1",
    supplierInvoiceInstanceDescriptor: "Invoice 1",
  };
  it("submits the request and returns the result", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/supplierInvoiceRequests/sir-1/submit`, {
        id: "inst-1",
        descriptor: "Invoice 1",
      })
      .reply(200, submitSupplierInvoiceRequestExamplePayload.data);
    const { result } = await invoke(submitSupplierInvoiceRequest, params);
    expect(result).toEqual(submitSupplierInvoiceRequestExamplePayload);
  });
  it("surfaces a Workday error", async () => {
    nock(TEST_HOST)
      .post(`${SERVICE}/supplierInvoiceRequests/sir-1/submit`)
      .reply(409, { error: "conflict" });
    await expect(
      invoke(submitSupplierInvoiceRequest, params),
    ).rejects.toThrow();
  });
});
