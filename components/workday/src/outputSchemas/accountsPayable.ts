import { idDescriptorReferenceSchema, instanceReferenceSchema } from "./shared";

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
    taxAmount: {
      type: "object" as const,
    },
    handlingCode: instanceReferenceSchema,
    status: instanceReferenceSchema,
    dueDate: {
      type: "string",
      format: "date",
    },
    remitToConnection: instanceReferenceSchema,
    paymentTerms: instanceReferenceSchema,
    controlTotalAmount: {
      type: "object" as const,
    },
    memo: {
      type: "string",
    },
    suppliersInvoiceNumber: {
      type: "string",
    },
    currency: currencySchema,
    freightAmount: {
      type: "object" as const,
    },
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
    taxAmount: {
      type: "object" as const,
    },
    requester: instanceReferenceSchema,
    controlTotalAmount: {
      type: "object" as const,
    },
    paymentTerms: instanceReferenceSchema,
    referenceType: instanceReferenceSchema,
    lines: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          unitCost: {
            type: "object" as const,
          },
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
                amount: {
                  type: "object" as const,
                },
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
          extendedAmount: {
            type: "object" as const,
          },
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
    freightAmount: {
      type: "object" as const,
    },
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
