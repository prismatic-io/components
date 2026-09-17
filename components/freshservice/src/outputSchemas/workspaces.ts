import { customFieldsSchema } from "./common";
export const workspaceSchema = {
  type: "object" as const,
  properties: {
    id: { type: "number" },
    created_at: { type: "string", format: "date-time" },
    updated_at: { type: "string", format: "date-time" },
    description: { type: ["string", "null"] },
    name: { type: "string" },
    primary: { type: "boolean" },
    restricted: { type: "boolean" },
    state: { type: "string" },
    template_name: { type: "string" },
    type: { type: "string", enum: ["workspace", "client"] },
    metadata: {
      type: "object",
      properties: {
        primary_contact: {
          type: "object",
          properties: {
            first_name: { type: "string" },
            last_name: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
          },
        },
        email_domains: { type: "array", items: { type: "string" } },
        custom_fields: customFieldsSchema,
      },
    },
  },
  required: ["id"],
  additionalProperties: false,
};
export const getWorkspaceOutputSchema = {
  type: "object" as const,
  properties: {
    workspace: workspaceSchema,
  },
  required: ["workspace"],
  additionalProperties: false,
};
export const listWorkspacesOutputSchema = {
  type: "object" as const,
  properties: {
    workspaces: { type: "array", items: workspaceSchema },
  },
  required: ["workspaces"],
  additionalProperties: false,
};
