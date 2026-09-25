import {
  nextPageSchema,
  projectCompactSchema,
  sectionCompactSchema,
} from "./shared";
export const sectionResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        name: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        project: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
            resource_subtype: {
              type: "string",
              enum: ["default_project", "custom"],
            },
          },
          additionalProperties: true,
        },
        projects: {
          type: ["array", "null"],
          items: projectCompactSchema,
        },
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listSectionsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: sectionCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
