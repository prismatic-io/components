import {
  currencyAmountSchema,
  idDescriptorReferenceSchema,
  instanceReferenceSchema,
} from "./shared";

export const currencySchema = {
  type: "object" as const,
  properties: {
    currencyID: {
      type: "string",
    },
    descriptor: {
      type: "string",
    },
  },
};

export const invoiceRequestSummarySchema = {
  type: "object" as const,
  properties: {
    invoiceDate: {
      type: "string",
      format: "date",
    },
    statutoryInvoiceType: instanceReferenceSchema,
    referenceNumber: {
      type: "string",
    },
    taxAmount: currencyAmountSchema,
    handlingCode: instanceReferenceSchema,
    status: instanceReferenceSchema,
    dueDate: {
      type: "string",
      format: "date",
    },
    remitToConnection: instanceReferenceSchema,
    paymentTerms: instanceReferenceSchema,
    controlTotalAmount: currencyAmountSchema,
    memo: {
      type: "string",
    },
    suppliersInvoiceNumber: {
      type: "string",
    },
    currency: currencySchema,
    freightAmount: currencyAmountSchema,
    shipToAddress: instanceReferenceSchema,
    referenceType: instanceReferenceSchema,
    invoiceReceivedDate: {
      type: "string",
      format: "date",
    },
    requestNumber: {
      type: "string",
    },
    requester: instanceReferenceSchema,
    supplier: instanceReferenceSchema,
    company: instanceReferenceSchema,
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
    Supplier_Invoice_Request_ID: {
      type: "string",
    },
    Supplier_Invoice_Request_Document_Number: {
      type: "string",
    },
  },
};

export const attachmentSummarySchema = {
  type: "object" as const,
  properties: {
    fileName: {
      type: "string",
    },
    fileLength: {
      type: "integer",
    },
    fileExtension: {
      type: "string",
    },
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};

export const getSupplierInvoiceRequestAttachmentsOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: attachmentSummarySchema,
    },
  },
  items: attachmentSummarySchema,
  required: [],
  additionalProperties: true,
};

export const getSupplierInvoiceRequestsByIdOutputSchema =
  invoiceRequestSummarySchema;

export const listSupplierInvoiceRequestsOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: invoiceRequestSummarySchema,
    },
  },
  items: invoiceRequestSummarySchema,
  required: [],
  additionalProperties: true,
};

export const postSupplierInvoiceRequestsOutputSchema = {
  type: "object" as const,
  properties: {
    company: instanceReferenceSchema,
    currency: instanceReferenceSchema,
    taxAmount: currencyAmountSchema,
    requester: instanceReferenceSchema,
    controlTotalAmount: currencyAmountSchema,
    paymentTerms: instanceReferenceSchema,
    referenceType: instanceReferenceSchema,
    lines: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          unitCost: currencyAmountSchema,
          internalMemo: {
            type: "string",
          },
          itemDescription: {
            type: "string",
          },
          worktags: {
            type: "array",
            items: idDescriptorReferenceSchema,
          },
          splits: {
            type: "array",
            items: {
              type: "object" as const,
              properties: {
                quantity: {
                  type: "number",
                },
                worktags: {
                  type: "array",
                  items: idDescriptorReferenceSchema,
                },
                amount: currencyAmountSchema,
                percent: {
                  type: "number",
                },
                billable: {
                  type: "boolean",
                },
                memo: {
                  type: "string",
                },
                descriptor: {
                  type: "string",
                },
                id: {
                  type: "string",
                },
              },
            },
          },
          order: {
            type: "string",
          },
          billable: {
            type: "boolean",
          },
          splitBy: instanceReferenceSchema,
          quantity: {
            type: "number",
          },
          extendedAmount: currencyAmountSchema,
          spendCategory: instanceReferenceSchema,
          unitOfMeasure: instanceReferenceSchema,
          memo: {
            type: "string",
          },
          serviceLine: {
            type: "boolean",
          },
          item: instanceReferenceSchema,
          descriptor: {
            type: "string",
          },
          id: {
            type: "string",
          },
        },
      },
    },
    statutoryInvoiceType: instanceReferenceSchema,
    suppliersInvoiceNumber: {
      type: "string",
    },
    referenceNumber: {
      type: "string",
    },
    invoiceReceivedDate: {
      type: "string",
      format: "date",
    },
    freightAmount: currencyAmountSchema,
    supplier: instanceReferenceSchema,
    handlingCode: instanceReferenceSchema,
    shipToAddress: instanceReferenceSchema,
    invoiceDate: {
      type: "string",
      format: "date",
    },
    memo: {
      type: "string",
    },
    remitToConnection: instanceReferenceSchema,
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
  required: ["company", "invoiceDate", "supplier"],
};

export const postSupplierInvoiceRequestsAttachmentsOutputSchema = {
  type: "object" as const,
  properties: {
    file: {
      type: "string",
      format: "binary",
    },
    fileName: {
      type: "string",
    },
    fileLength: {
      type: "integer",
    },
    contentType: instanceReferenceSchema,
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};

export const submitSupplierInvoiceRequestOutputSchema =
  idDescriptorReferenceSchema;
