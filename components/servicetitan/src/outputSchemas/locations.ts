import { addressSchema, listEnvelope } from "./shared";
const createdLocationSchema = {
  type: "object" as const,
  properties: {
    taxZoneId: {
      type: ["integer", "null"],
      format: "int64",
    },
    id: {
      type: "integer",
      format: "int64",
    },
    customerId: {
      type: "integer",
      format: "int64",
    },
    active: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    address: addressSchema,
    customFields: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          typeId: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: ["string", "null"],
          },
          value: {
            type: ["string", "null"],
          },
        },
        required: ["typeId"],
      },
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    createdById: {
      type: "integer",
      format: "int64",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    mergedToId: {
      type: ["integer", "null"],
      format: "int64",
    },
    zoneId: {
      type: ["integer", "null"],
      format: "int64",
    },
    taxExempt: {
      type: "boolean",
    },
    tagTypeIds: {
      type: "array",
      items: {
        type: "integer",
        format: "int64",
      },
    },
    externalData: {
      type: "array",
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
    contacts: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          type: {
            type: "string",
            enum: ["Phone", "LandlinePhone", "Email", "Fax", "MobilePhone"],
          },
          value: {
            type: "string",
          },
          memo: {
            type: ["string", "null"],
          },
        },
        required: ["id", "type", "value"],
      },
    },
  },
  required: [
    "id",
    "customerId",
    "active",
    "name",
    "address",
    "customFields",
    "createdOn",
    "createdById",
    "modifiedOn",
    "taxExempt",
    "tagTypeIds",
    "externalData",
    "contacts",
  ],
};
const locationSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    customerId: {
      type: "integer",
      format: "int64",
    },
    active: {
      type: "boolean",
    },
    name: {
      type: "string",
    },
    address: addressSchema,
    customFields: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          typeId: {
            type: "integer",
            format: "int64",
          },
          name: {
            type: ["string", "null"],
          },
          value: {
            type: ["string", "null"],
          },
        },
        required: ["typeId"],
      },
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    createdById: {
      type: "integer",
      format: "int64",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    mergedToId: {
      type: ["integer", "null"],
      format: "int64",
    },
    zoneId: {
      type: ["integer", "null"],
      format: "int64",
    },
    taxExempt: {
      type: "boolean",
    },
    tagTypeIds: {
      type: "array",
      items: {
        type: "integer",
        format: "int64",
      },
    },
    externalData: {
      type: "array",
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
    taxZoneId: {
      type: ["integer", "null"],
      format: "int64",
    },
  },
  required: [
    "id",
    "customerId",
    "active",
    "name",
    "address",
    "customFields",
    "createdOn",
    "createdById",
    "modifiedOn",
    "taxExempt",
    "tagTypeIds",
    "externalData",
  ],
};
export const createLocationOutputSchema = createdLocationSchema;
export const getLocationOutputSchema = locationSchema;
export const updateLocationOutputSchema = locationSchema;
export const listLocationsOutputSchema = listEnvelope(locationSchema);
