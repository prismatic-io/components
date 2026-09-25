import { nextPageSchema, workspaceCompactSchema } from "./shared";
export const workspaceResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        name: { type: "string" },
        email_domains: { type: "array", items: { type: "string" } },
        is_organization: { type: "boolean" },
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listWorkspacesOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: workspaceCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const findWorkspaceByNameOutputSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
