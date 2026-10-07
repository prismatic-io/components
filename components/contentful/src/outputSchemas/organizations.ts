import { linkSchema } from "./shared";
const versionSchema = { type: ["string", "number"] };
const organizationSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    sys: {
      type: "object" as const,
      properties: {
        accessPolicy: {
          type: "object" as const,
          properties: {
            sso: { type: "string" },
          },
        },
        createdAt: { type: "string", format: "date-time" },
        id: { type: "string" },
        type: { type: "string" },
        updatedAt: { type: "string", format: "date-time" },
        version: versionSchema,
      },
    },
  },
};
export const listOrganizationsOutputSchema = {
  type: "array" as const,
  items: organizationSchema,
};
export const getOrganizationOutputSchema = organizationSchema;
export const updateOrganizationOutputSchema = {
  type: "object" as const,
  properties: {
    email: { type: "string" },
    sys: {
      type: "object" as const,
      properties: {
        createdAt: { type: "string", format: "date-time" },
        createdBy: linkSchema,
        id: { type: "string" },
        organization: linkSchema,
        type: { type: "string" },
        updatedAt: { type: "string", format: "date-time" },
        updatedBy: linkSchema,
        version: versionSchema,
      },
    },
  },
};
