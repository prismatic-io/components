import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { SERVICES, WORKDAY_API_DOCS_URL } from "../constants";
import { cleanNumberInput, cleanStringInput } from "../util";
import {
  extraBody,
  companyId,
  connection,
  memo,
  paginationQueryStringInputs,
  extraParameters,
} from "./common";

const supplierInvoiceRequestId = input({
  label: "Supplier Invoice Request ID",
  comments: "Identifies the supplier invoice request.",
  type: "string",
  placeholder: "Enter supplier invoice request ID",
  example: "b6389b0a7604433fb4e05b88251b0d07",
  required: true,
  clean: util.types.toString,
  dataSource: "selectSupplierInvoiceRequest",
});

const postSupplierInvoiceRequestsExtraBodyComments = `${extraBody.comments} See [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.accountsPayable.slice(1)}/post-/supplierInvoiceRequests) for more information.`;

const postSupplierInvoiceRequestsExtraBodyExample = JSON.stringify(
  {
    lines: [
      {
        unitCost: "250.00",
        internalMemo: "Approved by facilities manager",
        worktags: [
          {
            id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
            descriptor: "Cost Center: 41600 Facilities",
          },
        ],
        itemDescription: "Office chairs",
        splits: [
          {
            percent: "100",
            billable: true,
            memo: "Full allocation to facilities",
            quantity: "4",
            amount: "1000.00",
            worktags: [
              {
                id: "a1b2c3d4e5f60718293a4b5c6d7e8f90",
                descriptor: "Cost Center: 41600 Facilities",
              },
            ],
            id: "e3c1f2a4b5d64789a0b1c2d3e4f5a6b7",
            descriptor: "Split 1",
          },
        ],
        order: "1",
        billable: true,
        splitBy: {
          id: "9007db06140249838746074289b3ab5e",
        },
        quantity: "4",
        extendedAmount: "1000.00",
        spendCategory: {
          id: "c8934da88ef1418da4a6dc049acb3e4b",
        },
        unitOfMeasure: {
          id: "89ba1d2320c64ea490a0837459804422",
        },
        memo: "Ergonomic office chairs",
        serviceLine: false,
        item: {
          id: "724ed690753146efbf4fd0bc4a7bdc2f",
        },
        id: "7c9d8e6f5a4b43c2b1a0f9e8d7c6b5a4",
        descriptor: "Line 1",
      },
    ],
    statutoryInvoiceType: {
      id: "d13a219779454d70887556d17754f81c",
    },
    suppliersInvoiceNumber: "INV-2024-0612",
    referenceNumber: "PO-000456",
    invoiceReceivedDate: "2024-06-08T07:00:00.000Z",
    freightAmount: "100.00",
    handlingCode: {
      id: "eb95c26cb57641c9a30631c0cdfbf95b",
    },
    shipToAddress: {
      id: "1decbabeb2234113976a7275cb7b03d1",
    },
    remitToConnection: {
      id: "3bcb3df4ab164524bc39d84ffa6f870f",
    },
  },
  null,
  2,
);

const supplierId = input({
  label: "Supplier ID",
  comments: "Identifies the supplier for the supplier invoice request.",
  type: "string",
  required: true,
  example: "3c9baa38493e4dfabb829f3897598ab7",
  placeholder: "Enter supplier ID",
  clean: util.types.toString,
});

const invoiceDate = input({
  label: "Invoice Date",
  comments:
    "The date the supplier invoice request is created. Accepts an ISO 8601 date (YYYY-MM-DD) or date-time.",
  type: "string",
  required: true,
  example: "2024-06-08",
  placeholder: "Enter invoice date (YYYY-MM-DD)",
  clean: (value: unknown) => util.types.toDate(value),
});

const currencyId = input({
  label: "Currency ID",
  comments: "Identifies the currency used for the invoice.",
  type: "string",
  required: false,
  example: "Currency_ID=USD",
  placeholder: "Enter currency ID",
  clean: cleanStringInput,
});

const taxAmount = input({
  label: "Tax Amount",
  comments: "Total tax amount applied to the invoice.",
  type: "string",
  required: false,
  example: "82.50",
  placeholder: "Enter tax amount",
  clean: cleanStringInput,
});

const requesterId = input({
  label: "Requester ID",
  comments: "Identifies the worker who requested the invoice.",
  type: "string",
  required: false,
  example: "3aa5550b7fe348b98d7b5741afc65534",
  placeholder: "Enter requester ID",
  clean: cleanStringInput,
});

const controlTotalAmount = input({
  label: "Control Total Amount",
  comments: "Expected total amount used to validate invoice line totals.",
  type: "string",
  required: false,
  example: "1182.50",
  placeholder: "Enter control total amount",
  clean: cleanStringInput,
});

const paymentTermsId = input({
  label: "Payment Terms ID",
  comments: "Identifies the payment terms that apply to the invoice.",
  type: "string",
  required: false,
  example: "25ecdd7d7e2346f5842a8ef7b6d65c63",
  placeholder: "Enter payment terms ID",
  clean: cleanStringInput,
});

const referenceTypeId = input({
  label: "Reference Type ID",
  comments: "Identifies the reference type for the invoice.",
  type: "string",
  required: false,
  example: "0226117a5b894ff8be12a2d6c88ecd8a",
  placeholder: "Enter reference type ID",
  clean: cleanStringInput,
});

const supplierInvoiceId = input({
  label: "Supplier Invoice ID",
  comments: "Identifies the supplier invoice.",
  type: "string",
  required: false,
  example: "767ca0bfbd6e46e29b7621524748aa04",
  placeholder: "Enter supplier invoice ID",
  clean: cleanStringInput,
});

const supplierInvoiceDescriptor = input({
  label: "Supplier Invoice Descriptor",
  comments: "Human-readable descriptor for the supplier invoice.",
  type: "string",
  required: false,
  example: "Supplier Invoice: SI-000123",
  placeholder: "Enter supplier invoice descriptor",
  clean: cleanStringInput,
});

const amount = structuredObjectInput({
  label: "Amounts",
  required: false,
  comments: "Currency, tax amount, and control total amount.",
  inputs: { currencyId, taxAmount, controlTotalAmount },
});

const attachmentFile = input({
  label: "File",
  comments:
    "The file to attach to the supplier invoice request. Binary data generated from a previous step.",
  type: "data",
  required: true,
  example: Buffer.from("example").toString("base64"),
  placeholder: "Output data from previous step",
  clean: util.types.toData,
});

const fileLength = input({
  label: "File Length",
  comments:
    "Size of the attached file in bytes. Defaults to the size of the File input.",
  type: "string",
  placeholder: "Enter file length",
  example: "1307948067",
  required: false,
  clean: cleanNumberInput,
});

const contentTypeId = input({
  label: "Content Type ID",
  comments: "Identifies the MIME content type of the attachment.",
  type: "string",
  placeholder: "Enter content type ID",
  example: "c8a3e5f1d2b44a6e9f0b7c1d2e3f4a5b",
  required: false,
  clean: cleanStringInput,
});

const fileName = input({
  label: "File Name",
  comments: `Display name of the attached file. Defaults to "attachment" with the file's suggested extension.`,
  type: "string",
  placeholder: "Enter file name",
  example: "invoice-SI-000123.pdf",
  required: false,
  clean: cleanStringInput,
});

const supplierInvoiceRequestAttachmentDescriptor = input({
  label: "Descriptor",
  comments: "Human-readable descriptor for the attachment.",
  type: "string",
  placeholder: "Enter supplier invoice request attachment descriptor",
  example: "invoice-SI-000123.pdf",
  required: false,
  clean: cleanStringInput,
});

const supplierInvoiceRequestAttachmentId = input({
  label: "Supplier Invoice Request Attachment ID",
  comments: "Identifies the attachment on the supplier invoice request.",
  type: "string",
  placeholder: "Enter supplier invoice request attachment ID",
  example: "389a01b915e14595be3c3ec2822089e8",
  required: false,
  clean: cleanStringInput,
});

const supplierInvoiceInstanceId = input({
  label: "Supplier Invoice Instance ID",
  comments: "Identifies the supplier invoice instance to submit for approval.",
  type: "string",
  required: true,
  example: "53f807ae49df49389687cabd4ba24d14",
  placeholder: "Enter supplier invoice instance ID",
  clean: util.types.toString,
});

const supplierInvoiceInstanceDescriptor = input({
  label: "Supplier Invoice Instance Descriptor",
  comments:
    "Human-readable descriptor for the supplier invoice instance being submitted.",
  type: "string",
  required: true,
  example: "Supplier Invoice Request: SIR-000123",
  placeholder: "Enter supplier invoice instance descriptor",
  clean: util.types.toString,
});

export const getSupplierInvoiceRequestAttachmentsInputs = {
  connection,
  supplierInvoiceRequestId,
  ...paginationQueryStringInputs,
};

export const getSupplierInvoiceRequestsByIdInputs = {
  connection,
  supplierInvoiceRequestId,
};

export const listSupplierInvoiceRequestsInputs = {
  connection,
  ...paginationQueryStringInputs,
  extraParameters: {
    ...extraParameters,
    comments: `${extraParameters.comments} See optional (QUERY-STRING PARAMETERS) in the [Workday API documentation](${WORKDAY_API_DOCS_URL}#${SERVICES.accountsPayable.slice(1)}/get-/supplierInvoiceRequests).`,
  },
};

export const postSupplierInvoiceRequestsInputs = {
  connection,
  companyId: {
    ...companyId,
    comments:
      "Identifies the Workday company for the supplier invoice request.",
    required: true,
    clean: util.types.toString,
  },
  supplierId,
  invoiceDate,
  amount,
  requesterId,
  paymentTermsId,
  referenceTypeId,
  memo,
  supplierInvoiceId,
  supplierInvoiceDescriptor,
  extraBody: {
    ...extraBody,
    example: postSupplierInvoiceRequestsExtraBodyExample,
    comments: postSupplierInvoiceRequestsExtraBodyComments,
  },
};

const attachmentDetails = structuredObjectInput({
  label: "Attachment Details",
  required: false,
  comments: "File length, file name, and descriptor for the attachment.",
  inputs: { fileLength, fileName, supplierInvoiceRequestAttachmentDescriptor },
});

export const postSupplierInvoiceRequestsAttachmentsInputs = {
  connection,
  supplierInvoiceRequestId,
  file: attachmentFile,
  attachmentDetails,
  contentTypeId,
  supplierInvoiceRequestAttachmentId,
};

export const submitSupplierInvoiceRequestInputs = {
  connection,
  supplierInvoiceRequestId,
  supplierInvoiceInstanceId,
  supplierInvoiceInstanceDescriptor,
};
