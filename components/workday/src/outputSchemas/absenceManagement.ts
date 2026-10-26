import {
  eventAttachmentsViewSchema,
  idDescriptorReferenceSchema,
  instanceReferenceSchema,
} from "./shared";
export const timeOffDetailsViewSchema = {
  type: "object" as const,
  properties: {
    timeOffType: idDescriptorReferenceSchema,
    status: instanceReferenceSchema,
    date: {
      type: "string",
      format: "date",
    },
    unit: instanceReferenceSchema,
    worktags: {
      type: "array",
      items: idDescriptorReferenceSchema,
    },
    worker: instanceReferenceSchema,
    timeOffEntryId: {
      type: "string",
    },
    position: instanceReferenceSchema,
    timeOffEventId: instanceReferenceSchema,
    comment: {
      type: "string",
    },
    reason: instanceReferenceSchema,
    quantity: {
      type: "number",
    },
  },
};
export const getTimeOffBalanceByIdOutputSchema = {
  type: "object" as const,
  properties: {
    category: instanceReferenceSchema,
    effectiveDate: {
      type: "string",
      format: "date",
    },
    worker: instanceReferenceSchema,
    position: idDescriptorReferenceSchema,
    unit: instanceReferenceSchema,
    absencePlan: {
      type: "object" as const,
      properties: {
        id: {
          type: "string",
        },
        timeoffs: {
          type: "string",
        },
        descriptor: {
          type: "string",
        },
        absenceTable: {
          type: "array",
          items: idDescriptorReferenceSchema,
        },
      },
    },
    quantity: {
      type: "number",
    },
    dateOfFirstAbsence: {
      type: "string",
      format: "date",
    },
  },
};
export const getTimeOffDetailsOutputSchema = {
  type: ["object", "array"],
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: timeOffDetailsViewSchema,
    },
  },
  items: timeOffDetailsViewSchema,
  required: [],
  additionalProperties: true,
};
export const postTimeOffRequestOutputSchema = {
  type: "object" as const,
  properties: {
    days: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          end: {
            type: "string",
            format: "date",
          },
          reason: instanceReferenceSchema,
          dailyQuantity: {
            type: "number",
          },
          timeOffType: idDescriptorReferenceSchema,
          comment: {
            type: "string",
          },
          start: {
            type: "string",
            format: "date",
          },
          date: {
            type: "string",
            format: "date",
          },
          position: idDescriptorReferenceSchema,
          descriptor: {
            type: "string",
          },
          id: {
            type: "string",
          },
        },
      },
    },
    businessProcessParameters: {
      type: "object" as const,
      properties: {
        warningValidations: {
          type: "string",
        },
        attachments: {
          type: "array",
          items: eventAttachmentsViewSchema,
        },
        overallStatus: {
          type: "string",
        },
        for: instanceReferenceSchema,
        criticalValidations: {
          type: "string",
        },
        comment: {
          type: "string",
        },
        action: instanceReferenceSchema,
        overallBusinessProcess: instanceReferenceSchema,
        comments: {
          type: "array",
          items: {
            type: "object" as const,
            properties: {
              person: instanceReferenceSchema,
              comment: {
                type: "string",
              },
              commentDate: {
                type: "string",
                format: "date",
              },
            },
          },
        },
        transactionStatus: instanceReferenceSchema,
      },
      required: ["action"],
    },
  },
};
