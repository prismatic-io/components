import {
  idDescriptorReferenceSchema,
  instanceReferenceSchema,
  instanceSummaryReferenceSchema,
} from "./shared";

export const billToCustomerAddressSchema = {
  type: "object" as const,
  properties: {
    regionSubdivision1: {
      type: "string",
    },
    countryRegion: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
      },
    },
    addressLine3: {
      type: "string",
    },
    citySubdivision1: {
      type: "string",
    },
    addressLine1: {
      type: "string",
    },
    addressLine4: {
      type: "string",
    },
    city: {
      type: "string",
    },
    citySubdivision2: {
      type: "string",
    },
    country: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
      },
    },
    addressLine2: {
      type: "string",
    },
    regionSubdivision2: {
      type: "string",
    },
    postalCode: {
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

export const customerInvoiceSchema = {
  type: "object" as const,
  properties: {
    invoiceDate: {
      type: "string",
      format: "date",
    },
    transactionType: {
      type: "string",
    },
    withholdingAmount: {
      type: "object" as const,
    },
    company: idDescriptorReferenceSchema,
    inCollection: {
      type: "boolean",
    },
    netAmount: {
      type: "object" as const,
    },
    disputeAmount: {
      type: "object" as const,
    },
    dueAmount: {
      type: "object" as const,
    },
    invoiceType: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
      },
    },
    poNumber: {
      type: "string",
    },
    relatedAdjustments: {
      type: "array",
      items: instanceSummaryReferenceSchema,
    },
    taxAmount: {
      type: "object" as const,
    },
    adjustmentReason: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
      },
    },
    disputeDate: {
      type: "string",
      format: "date",
    },
    paymentStatus: idDescriptorReferenceSchema,
    relatedInvoice: instanceReferenceSchema,
    currency: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
      },
    },
    memo: {
      type: "string",
    },
    disputeReasons: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          descriptor: {
            type: "string",
          },
        },
      },
    },
    billToCustomer: idDescriptorReferenceSchema,
    dueDate: {
      type: "string",
      format: "date",
    },
    inDispute: {
      type: "boolean",
    },
    billToCustomerAddress: billToCustomerAddressSchema,
    invoiceStatus: idDescriptorReferenceSchema,
    retentionAmount: {
      type: "object" as const,
    },
    totalAmount: {
      type: "object" as const,
    },
    invoiceNumber: {
      type: "string",
    },
    descriptor: {
      type: "string",
    },
    href: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};

export const getInvoiceByIdOutputSchema = customerInvoiceSchema;

export const getPaymentByIdOutputSchema = idDescriptorReferenceSchema;

export const listInvoicesOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: customerInvoiceSchema,
    },
  },
  items: customerInvoiceSchema,
  required: [],
  additionalProperties: true,
};

export const postPaymentOutputSchema = {
  type: "object" as const,
  properties: {
    company: instanceReferenceSchema,
    date: {
      type: "string",
      format: "date",
    },
    remitFromCustomer: instanceReferenceSchema,
    memo: {
      type: "string",
    },
    reference: {
      type: "string",
    },
    transactionNumber: {
      type: "string",
    },
    readyToAutoApply: {
      type: "boolean",
    },
    type: instanceReferenceSchema,
    amount: {
      type: "object" as const,
    },
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};
