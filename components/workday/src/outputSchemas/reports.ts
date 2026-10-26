import { idDescriptorReferenceSchema } from "./shared";
export const runWqlQueryOutputSchema = {
  type: "object" as const,
  properties: {
    total: {
      type: "integer",
      format: "int64",
    },
    data: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          descriptor: {
            type: "string",
          },
          href: {
            type: "string",
          },
          id: {
            type: "string",
          },
          worker: idDescriptorReferenceSchema,
          fullName: {
            type: "string",
          },
        },
        required: [],
        additionalProperties: true,
      },
    },
  },
};
export const getRaasReportOutputSchema = {
  type: ["object", "string"],
  properties: {
    Report_Entry: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {},
        required: [],
        additionalProperties: true,
      },
    },
  },
  required: [],
  additionalProperties: true,
};
