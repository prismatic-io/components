import {
  currencyAmountSchema,
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
        Country_Region_ID: {
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
        "ISO_3166-1_Alpha-3_Code": {
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
    withholdingAmount: currencyAmountSchema,
    company: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        id: {
          type: "string",
        },
        Company_Reference_ID: {
          type: "string",
        },
      },
    },
    inCollection: {
      type: "boolean",
    },
    netAmount: currencyAmountSchema,
    disputeAmount: currencyAmountSchema,
    dueAmount: currencyAmountSchema,
    invoiceType: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        Customer_Invoice_Type_ID: {
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
    taxAmount: currencyAmountSchema,
    adjustmentReason: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        Adjustment_Reason_ID: {
          type: "string",
        },
      },
    },
    disputeDate: {
      type: "string",
      format: "date",
    },
    paymentStatus: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        id: {
          type: "string",
        },
        Document_Payment_Status_ID: {
          type: "string",
        },
      },
    },
    relatedInvoice: instanceReferenceSchema,
    currency: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        Currency_ID: {
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
          Dispute_Reason_ID: {
            type: "string",
          },
        },
      },
    },
    billToCustomer: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        id: {
          type: "string",
        },
        Customer_Reference_ID: {
          type: "string",
        },
        Customer_ID: {
          type: "string",
        },
      },
    },
    dueDate: {
      type: "string",
      format: "date",
    },
    inDispute: {
      type: "boolean",
    },
    billToCustomerAddress: billToCustomerAddressSchema,
    invoiceStatus: {
      type: "object" as const,
      properties: {
        descriptor: {
          type: "string",
        },
        id: {
          type: "string",
        },
        Document_Status_ID: {
          type: "string",
        },
      },
    },
    retentionAmount: currencyAmountSchema,
    totalAmount: currencyAmountSchema,
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

export const getPaymentByIdOutputSchema = {
  type: "object" as const,
  properties: {
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
    Customer_Payment_for_Invoices_Reference_ID: {
      type: "string",
    },
  },
};

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
    amount: currencyAmountSchema,
    descriptor: {
      type: "string",
    },
    id: {
      type: "string",
    },
  },
};
