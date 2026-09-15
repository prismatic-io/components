import { listEnvelope } from "./shared";
const invoiceSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    syncStatus: {
      type: ["string", "null"],
    },
    budgetCodeId: {
      type: ["integer", "null"],
      format: "int64",
    },
    referenceNumber: {
      type: ["string", "null"],
    },
    invoiceDate: {
      type: ["string", "null"],
      format: "date-time",
    },
    dueDate: {
      type: ["string", "null"],
      format: "date-time",
    },
    subTotal: {
      type: ["string", "null"],
    },
    salesTax: {
      type: ["string", "null"],
    },
    salesTaxCode: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: ["string", "null"],
        },
        taxRate: {
          type: "number",
          format: "decimal",
        },
      },
      required: ["id", "taxRate"],
    },
    taxZoneId: {
      type: ["integer", "null"],
      format: "int64",
    },
    total: {
      type: ["string", "null"],
    },
    balance: {
      type: ["string", "null"],
    },
    invoiceType: {
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
    customerAddress: {
      type: ["object", "null"],
      properties: {
        street: {
          type: ["string", "null"],
        },
        unit: {
          type: ["string", "null"],
        },
        city: {
          type: ["string", "null"],
        },
        state: {
          type: ["string", "null"],
        },
        zip: {
          type: ["string", "null"],
        },
        country: {
          type: ["string", "null"],
        },
      },
    },
    location: {
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
    locationAddress: {
      type: ["object", "null"],
      properties: {
        street: {
          type: ["string", "null"],
        },
        unit: {
          type: ["string", "null"],
        },
        city: {
          type: ["string", "null"],
        },
        state: {
          type: ["string", "null"],
        },
        zip: {
          type: ["string", "null"],
        },
        country: {
          type: ["string", "null"],
        },
      },
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
    termName: {
      type: ["string", "null"],
    },
    createdBy: {
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
    depositedOn: {
      type: ["string", "null"],
      format: "date-time",
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    modifiedOn: {
      type: ["string", "null"],
      format: "date-time",
    },
    adjustmentToId: {
      type: ["integer", "null"],
      format: "int64",
    },
    job: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        number: {
          type: ["string", "null"],
        },
        type: {
          type: ["string", "null"],
        },
      },
      required: ["id"],
    },
    projectId: {
      type: ["integer", "null"],
      format: "int64",
    },
    royalty: {
      type: ["object", "null"],
      properties: {
        status: {
          type: ["string", "null"],
        },
        date: {
          type: ["string", "null"],
          format: "date-time",
        },
        sentOn: {
          type: ["string", "null"],
          format: "date-time",
        },
        memo: {
          type: ["string", "null"],
        },
      },
    },
    employeeInfo: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: ["string", "null"],
        },
        modifiedOn: {
          type: "string",
          format: "date-time",
        },
      },
      required: ["id", "modifiedOn"],
    },
    commissionEligibilityDate: {
      type: ["string", "null"],
    },
    sentStatus: {
      type: "string",
      enum: ["NotSent", "Sent", "Opened"],
    },
    reviewStatus: {
      type: "string",
      enum: [
        "NeedsReview",
        "OnHold",
        "Reviewed",
        "PendingApproval",
        "Rejected",
        "ReadyForBilling",
        "Invoiced",
      ],
    },
    assignedTo: {
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
    summary: {
      type: ["string", "null"],
      format: "html",
    },
    items: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          description: {
            type: ["string", "null"],
            format: "html",
          },
          quantity: {
            type: ["string", "null"],
          },
          cost: {
            type: ["string", "null"],
          },
          totalCost: {
            type: ["string", "null"],
          },
          budgetCodeId: {
            type: ["integer", "null"],
            format: "int64",
          },
          inventoryLocationId: {
            type: ["integer", "null"],
            format: "int64",
          },
          inventoryLocation: {
            type: ["string", "null"],
          },
          price: {
            type: ["string", "null"],
          },
          type: {
            type: "string",
            enum: [
              "Service",
              "Material",
              "Equipment",
              "PriceModifier",
              "Unspecified",
            ],
          },
          skuName: {
            type: ["string", "null"],
          },
          skuId: {
            type: "integer",
            format: "int64",
          },
          total: {
            type: ["string", "null"],
          },
          inventory: {
            type: "boolean",
          },
          taxable: {
            type: "boolean",
          },
          isChargeable: {
            type: "boolean",
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
          costOfSaleAccount: {
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
          assetAccount: {
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
          membershipTypeId: {
            type: "integer",
            format: "int64",
          },
          itemGroup: {
            type: ["object", "null"],
            properties: {
              rootId: {
                type: "integer",
                format: "int64",
              },
              name: {
                type: ["string", "null"],
              },
            },
            required: ["rootId"],
          },
          displayName: {
            type: ["string", "null"],
          },
          soldHours: {
            type: ["number", "null"],
            format: "decimal",
          },
          createdOn: {
            type: "string",
            format: "date-time",
          },
          modifiedOn: {
            type: "string",
            format: "date-time",
          },
          serviceDate: {
            type: ["string", "null"],
            format: "date-time",
          },
          order: {
            type: "integer",
            format: "int32",
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
          createdById: {
            type: ["integer", "null"],
            format: "int64",
          },
          displayInAmount: {
            type: ["boolean", "null"],
          },
          importId: {
            type: ["string", "null"],
          },
          exportId: {
            type: ["string", "null"],
          },
          inventoryStatus: {
            type: ["string", "null"],
          },
          addOn: {
            type: "boolean",
          },
          memberPrice: {
            type: ["string", "null"],
          },
          technicianId: {
            type: ["integer", "null"],
            format: "int64",
          },
          installedEquipmentId: {
            type: ["integer", "null"],
            format: "int64",
          },
          estimateItemId: {
            type: ["integer", "null"],
            format: "int64",
          },
        },
        required: [
          "id",
          "type",
          "skuId",
          "inventory",
          "taxable",
          "isChargeable",
          "membershipTypeId",
          "createdOn",
          "modifiedOn",
          "order",
          "addOn",
        ],
      },
    },
    customFields: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          name: {
            type: ["string", "null"],
          },
          value: {
            type: ["string", "null"],
          },
        },
      },
    },
    active: {
      type: "boolean",
    },
    discountTotal: {
      type: ["string", "null"],
    },
    importId: {
      type: ["string", "null"],
    },
    exportId: {
      type: ["string", "null"],
    },
    materialSkuId: {
      type: ["integer", "null"],
      format: "int64",
    },
    membershipId: {
      type: ["integer", "null"],
      format: "int64",
    },
    paidOn: {
      type: ["string", "null"],
      format: "date-time",
    },
    invoiceConfiguration: {
      type: "string",
      enum: [
        "JobInvoice",
        "ProjectInvoice",
        "CounterSales",
        "MembershipInvoice",
        "InterestChargeInvoice",
        "ARImportInvoice",
      ],
    },
    rateSheetId: {
      type: ["integer", "null"],
      format: "int64",
    },
  },
  required: [
    "id",
    "createdOn",
    "sentStatus",
    "reviewStatus",
    "active",
    "invoiceConfiguration",
  ],
};
export const listInvoicesOutputSchema = listEnvelope(invoiceSchema);
export const createInvoicesOutputSchema = {
  type: "integer",
  format: "int64",
};
