import { listEnvelope } from "./shared";
const installedEquipmentDetailedSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    active: {
      type: "boolean",
    },
    equipmentId: {
      type: ["integer", "null"],
      format: "int64",
    },
    locationId: {
      type: "integer",
      format: "int64",
    },
    customerId: {
      type: "integer",
      format: "int64",
    },
    parent: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        type: {
          type: "string",
          enum: ["None", "Equipment", "System"],
        },
      },
      required: ["id", "type"],
    },
    systemId: {
      type: ["integer", "null"],
      format: "int64",
    },
    invoiceItemId: {
      type: ["integer", "null"],
      format: "int64",
    },
    name: {
      type: "string",
    },
    type: {
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
    installedOn: {
      type: ["string", "null"],
      format: "date-time",
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    serialNumber: {
      type: "string",
    },
    barcodeId: {
      type: ["string", "null"],
    },
    memo: {
      type: "string",
    },
    manufacturer: {
      type: "string",
    },
    model: {
      type: "string",
    },
    cost: {
      type: "number",
      format: "decimal",
    },
    status: {
      type: "string",
      enum: ["Installed", "Replaced"],
    },
    manufacturerWarrantyStart: {
      type: ["string", "null"],
      format: "date-time",
    },
    manufacturerWarrantyEnd: {
      type: ["string", "null"],
      format: "date-time",
    },
    serviceProviderWarrantyStart: {
      type: ["string", "null"],
      format: "date-time",
    },
    serviceProviderWarrantyEnd: {
      type: ["string", "null"],
      format: "date-time",
    },
    tags: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          ownerId: {
            type: "integer",
            format: "int64",
          },
          typeId: {
            type: "integer",
            format: "int64",
          },
          typeName: {
            type: ["string", "null"],
          },
          memo: {
            type: ["string", "null"],
          },
          color: {
            type: ["string", "null"],
          },
          textColor: {
            type: ["string", "null"],
          },
          code: {
            type: ["string", "null"],
          },
        },
        required: ["id", "ownerId", "typeId"],
      },
    },
    actualReplacementDate: {
      type: ["string", "null"],
      format: "date",
    },
    manufacturedOn: {
      type: ["string", "null"],
      format: "date",
    },
    predictedReplacementMonths: {
      type: ["integer", "null"],
      format: "int32",
    },
    predictedReplacementDate: {
      type: ["string", "null"],
      format: "date",
    },
    customFields: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
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
        required: ["id", "typeId"],
      },
    },
    attachments: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          alias: {
            type: ["string", "null"],
          },
          fileName: {
            type: ["string", "null"],
          },
          type: {
            type: "string",
            enum: ["Other", "Image", "VideoFile", "VideoLink", "Document"],
          },
          url: {
            type: "string",
          },
        },
        required: ["type", "url"],
      },
    },
  },
  required: [
    "id",
    "active",
    "locationId",
    "customerId",
    "name",
    "createdOn",
    "modifiedOn",
    "serialNumber",
    "memo",
    "manufacturer",
    "model",
    "cost",
    "status",
  ],
};
const installedEquipmentSchema = {
  type: "object" as const,
  properties: {
    id: {
      type: "integer",
      format: "int64",
    },
    active: {
      type: "boolean",
    },
    equipmentId: {
      type: ["integer", "null"],
      format: "int64",
    },
    locationId: {
      type: "integer",
      format: "int64",
    },
    customerId: {
      type: "integer",
      format: "int64",
    },
    parent: {
      type: ["object", "null"],
      properties: {
        id: {
          type: "integer",
          format: "int64",
        },
        type: {
          type: "string",
          enum: ["None", "Equipment", "System"],
        },
      },
      required: ["id", "type"],
    },
    systemId: {
      type: ["integer", "null"],
      format: "int64",
    },
    invoiceItemId: {
      type: ["integer", "null"],
      format: "int64",
    },
    name: {
      type: "string",
    },
    type: {
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
    installedOn: {
      type: ["string", "null"],
      format: "date-time",
    },
    createdOn: {
      type: "string",
      format: "date-time",
    },
    modifiedOn: {
      type: "string",
      format: "date-time",
    },
    serialNumber: {
      type: "string",
    },
    barcodeId: {
      type: ["string", "null"],
    },
    memo: {
      type: "string",
    },
    manufacturer: {
      type: "string",
    },
    model: {
      type: "string",
    },
    cost: {
      type: "number",
      format: "decimal",
    },
    status: {
      type: "string",
      enum: ["Installed", "Replaced"],
    },
    manufacturerWarrantyStart: {
      type: ["string", "null"],
      format: "date-time",
    },
    manufacturerWarrantyEnd: {
      type: ["string", "null"],
      format: "date-time",
    },
    serviceProviderWarrantyStart: {
      type: ["string", "null"],
      format: "date-time",
    },
    serviceProviderWarrantyEnd: {
      type: ["string", "null"],
      format: "date-time",
    },
    tags: {
      type: ["array", "null"],
      items: {
        type: "object" as const,
        properties: {
          id: {
            type: "integer",
            format: "int64",
          },
          ownerId: {
            type: "integer",
            format: "int64",
          },
          typeId: {
            type: "integer",
            format: "int64",
          },
          typeName: {
            type: ["string", "null"],
          },
          memo: {
            type: ["string", "null"],
          },
          color: {
            type: ["string", "null"],
          },
          textColor: {
            type: ["string", "null"],
          },
          code: {
            type: ["string", "null"],
          },
        },
        required: ["id", "ownerId", "typeId"],
      },
    },
    actualReplacementDate: {
      type: ["string", "null"],
      format: "date",
    },
    manufacturedOn: {
      type: ["string", "null"],
      format: "date",
    },
    predictedReplacementMonths: {
      type: ["integer", "null"],
      format: "int32",
    },
    predictedReplacementDate: {
      type: ["string", "null"],
      format: "date",
    },
  },
  required: [
    "id",
    "active",
    "locationId",
    "customerId",
    "name",
    "createdOn",
    "modifiedOn",
    "serialNumber",
    "memo",
    "manufacturer",
    "model",
    "cost",
    "status",
  ],
};
const attachmentUploadSchema = {
  type: "object" as const,
  properties: {
    path: {
      type: "string",
    },
  },
  required: ["path"],
};
export const createInstalledEquipmentOutputSchema =
  installedEquipmentDetailedSchema;
export const getInstalledEquipmentOutputSchema =
  installedEquipmentDetailedSchema;
export const updateInstalledEquipmentOutputSchema =
  installedEquipmentDetailedSchema;
export const listInstalledEquipmentOutputSchema = listEnvelope(
  installedEquipmentSchema,
);
export const createInstalledEquipmentAttachmentOutputSchema =
  attachmentUploadSchema;
