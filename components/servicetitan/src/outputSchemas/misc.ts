import { listEnvelope } from "./shared";
const businessUnitSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    active: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    officialName: {
      type: ["string", "null"],
    },
    email: {
      type: ["string", "null"],
      format: "email",
    },
    currency: {
      type: ["string", "null"],
    },
    phoneNumber: {
      type: ["string", "null"],
      format: "phone",
    },
    invoiceHeader: {
      type: ["string", "null"],
      format: "html",
    },
    invoiceMessage: {
      type: ["string", "null"],
      format: "html",
    },
    defaultTaxRate: {
      type: ["number", "null"],
      format: "decimal",
    },
    authorizationParagraph: {
      type: ["string", "null"],
      format: "html",
    },
    acknowledgementParagraph: {
      type: ["string", "null"],
      format: "html",
    },
    address: {
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
        latitude: {
          type: ["number", "null"],
          format: "double",
        },
        longitude: {
          type: ["number", "null"],
          format: "double",
        },
        isManualCoordinates: {
          type: "boolean",
        },
        isMilitary: {
          type: "boolean",
        },
      },
      required: ["isManualCoordinates", "isMilitary"],
    },
    materialSku: {
      type: ["string", "null"],
    },
    quickbooksClass: {
      type: ["string", "null"],
    },
    accountCode: {
      type: ["string", "null"],
    },
    franchiseId: {
      type: ["string", "null"],
    },
    conceptCode: {
      type: ["string", "null"],
    },
    corporateContractNumber: {
      type: ["string", "null"],
    },
    trade: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: "string",
        },
      },
      required: ["id", "name"],
    },
    division: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: "string",
        },
      },
      required: ["id", "name"],
    },
    tagTypeIds: {
      type: ["array", "null"],
      items: {
        type: "integer",
        format: "int64",
      },
    },
    tenant: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        name: {
          type: "string",
        },
        accountCode: {
          type: ["string", "null"],
        },
        franchiseId: {
          type: ["string", "null"],
        },
        conceptCode: {
          type: ["string", "null"],
        },
        modifiedOn: {
          type: "string",
          format: "date-time",
        },
      },
      required: ["id", "name", "modifiedOn"],
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    externalData: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          key: {
            type: "string",
          },
          value: {
            type: "string",
          },
        },
        required: ["key", "value"],
      },
    },
    certifiedSentriconSpecialistCode: {
      type: ["string", "null"],
    },
  },
  required: ["id", "active", "name", "createdOn", "modifiedOn"],
};
const userRoleSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    active: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    employeeType: {
      type: "string",
      enum: ["Employee", "Technician"],
    },
    roleSource: {
      type: "string",
      enum: ["ServiceTitan", "EnterpriseHub", "Gum"],
    },
  },
  required: ["id", "active", "name", "createdOn", "employeeType", "roleSource"],
};
export const listBusinessUnitsOutputSchema = listEnvelope(businessUnitSchema);
export const listUserRolesOutputSchema = listEnvelope(userRoleSchema);
