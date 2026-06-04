export const DEFAULT_SCOPES =
  "asset:read asset:write collection:read collection:write current.user:read current.profile:read workflow.campaign:read workflow.campaign:write workflow.job:read workflow.job:write brandstore.order:read brandstore.order:write meta.assetbank:read meta.assetbank:write admin.profile:read admin.user:read admin.user:write workflow.preset:read offline";

export const ORDER_STATUSES = [
  "IN_PROGRESS",
  "CANCELED",
  "FAILED",
  "WAITING_FOR_PAYMENT",
  "FOR_ORDER",
  "IN_PRODUCTION",
  "PRODUCTION_SUSPENDED",
  "OUT_FOR_DELIVERY",
  "FINISHED",
];

export const METAPROPERTY_TYPES = ["image", "document", "audio", "video", "3d"];

import type { PollResourceConfig } from "./types/triggers";

export const POLL_RESOURCE_CONFIG: Record<string, PollResourceConfig> = {
  assets: {
    label: "Assets",
    clientType: "v4",
    createdAtField: "dateCreated",
    updatedAtField: "dateModified",
  },
  collections: {
    label: "Collections",
    clientType: "v4",
    createdAtField: "dateCreated",
    updatedAtField: "dateModified",
  },
  campaigns: {
    label: "Campaigns",
    clientType: "workflow",
    createdAtField: "dateCreated",
    updatedAtField: "dateModified",
  },
  jobs: {
    label: "Jobs",
    clientType: "workflow",
    createdAtField: "dateCreated",
    updatedAtField: "dateModified",
  },
  orders: {
    label: "Orders",
    clientType: "api",
    createdAtField: "date_created",
    updatedAtField: null,
  },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
