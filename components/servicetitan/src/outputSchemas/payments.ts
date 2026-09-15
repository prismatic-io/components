import { listEnvelope } from "./shared";
const detailedPaymentSchema = {
  type: "object" as const,
  properties: {
    active: {
      type: "boolean",
    },
    appliedTo: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          appliedAmount: {
            type: ["string", "null"],
          },
          appliedBy: {
            type: ["string", "null"],
          },
          appliedId: {
            type: "integer",
            format: "int64",
          },
          appliedOn: {
            type: ["string", "null"],
            format: "date-time",
          },
          appliedTo: {
            type: "integer",
            format: "int64",
          },
          appliedToReferenceNumber: {
            type: ["string", "null"],
          },
        },
        required: ["appliedId", "appliedTo"],
      },
    },
    authCode: {
      type: ["string", "null"],
    },
    batch: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        number: {
          type: ["string", "null"],
        },
        name: {
          type: ["string", "null"],
        },
      },
      required: ["id"],
    },
    businessUnit: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: ["string", "null"],
        },
      },
      required: ["id"],
    },
    checkNumber: {
      type: ["string", "null"],
    },
    createdBy: {
      type: ["string", "null"],
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    customer: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: ["string", "null"],
        },
      },
      required: ["id"],
    },
    customFields: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          name: {
            type: "string",
          },
          value: {
            type: "string",
          },
        },
        required: ["name", "value"],
      },
    },
    date: {
      type: ["string", "null"],
      format: "date-time",
    },
    deposit: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: ["string", "null"],
        },
      },
      required: ["id"],
    },
    generalLedgerAccount: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: ["string", "null"],
        },
        number: {
          type: ["string", "null"],
        },
        type: {
          type: ["string", "null"],
        },
        detailType: {
          type: ["string", "null"],
        },
      },
      required: ["id"],
    },
    id: {
      type: "integer",
      format: "int64",
    },
    memo: {
      type: ["string", "null"],
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    referenceNumber: {
      type: ["string", "null"],
    },
    refundedPaymentId: {
      type: ["integer", "null"],
      format: "int64",
    },
    syncStatus: {
      type: ["string", "null"],
    },
    total: {
      type: ["string", "null"],
    },
    type: {
      type: ["string", "null"],
    },
    typeId: {
      type: ["string", "null"],
    },
    unappliedAmount: {
      type: ["string", "null"],
    },
  },
  required: ["active", "createdOn", "id", "modifiedOn"],
};
const paymentSchema = {
  type: "object" as const,
  properties: {
    active: {
      type: ["boolean", "null"],
    },
    authCode: {
      type: ["string", "null"],
    },
    checkNumber: {
      type: ["string", "null"],
    },
    customerId: {
      type: ["integer", "null"],
      format: "int64",
    },
    exportId: {
      type: ["string", "null"],
    },
    id: {
      type: "integer",
      format: "int64",
    },
    memo: {
      type: ["string", "null"],
    },
    paidOn: {
      type: ["string", "null"],
      format: "date-time",
    },
    splits: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          amount: {
            type: ["number", "null"],
            format: "decimal",
          },
          invoiceId: {
            type: ["integer", "null"],
            format: "int64",
          },
          invoiceNumber: {
            type: ["string", "null"],
          },
        },
      },
    },
    status: {
      type: ["string", "null"],
      enum: ["Pending", "Posted", "Exported"],
    },
    transactionStatus: {
      type: ["string", "null"],
      enum: ["Success", "Fail", "Pending", "Rejected"],
    },
    typeId: {
      type: "integer",
      format: "int64",
    },
  },
  required: ["id", "splits", "typeId"],
};
export const listPaymentsOutputSchema = listEnvelope(detailedPaymentSchema);
export const updatePaymentOutputSchema = paymentSchema;
