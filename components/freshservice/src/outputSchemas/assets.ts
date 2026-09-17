import { attachmentSchema } from "./common";
const assetBaseProperties = {
  id: { type: "number" },
  workspace_id: { type: "number" },
  display_id: { type: "number" },
  name: { type: "string" },
  description: { type: ["string", "null"] },
  asset_type_id: { type: "number" },
  asset_tag: { type: "string" },
  impact: { type: "string", enum: ["low", "medium", "high"] },
  author_type: { type: "string" },
  usage_type: { type: "string", enum: ["permanent", "loaner"] },
  user_id: { type: ["number", "null"] },
  location_id: { type: ["number", "null"] },
  department_id: { type: ["number", "null"] },
  agent_id: { type: ["number", "null"] },
  group_id: { type: ["number", "null"] },
  assigned_on: { type: ["string", "null"], format: "date-time" },
  created_at: { type: "string", format: "date-time" },
  updated_at: { type: "string", format: "date-time" },
  type_fields: { type: "object" },
};
export const assetOutputSchema = {
  type: "object" as const,
  properties: {
    asset: {
      type: "object",
      properties: { ...assetBaseProperties },
      required: ["id"],
    },
  },
  required: ["asset"],
};
export const assetsListOutputSchema = {
  type: "object" as const,
  properties: {
    assets: {
      type: "array",
      items: {
        type: "object",
        properties: {
          ...assetBaseProperties,
          created_by_source: { type: "string" },
          last_updated_by_source: { type: "string" },
          created_by_user: {},
          last_updated_by_user: {},
          sources: { type: "array", items: { type: "string" } },
        },
        required: ["id"],
      },
    },
  },
  required: ["assets"],
};
export const moveAssetOutputSchema = {
  type: "object" as const,
  properties: {
    asset: {
      type: "object",
      properties: {
        ...assetBaseProperties,
        attachments: { type: "array", items: attachmentSchema },
        cloud_files: { type: "array" },
        end_of_life: { type: ["string", "null"] },
        discovery_enabled: { type: "boolean" },
      },
      required: ["id"],
    },
  },
  required: ["asset"],
};
