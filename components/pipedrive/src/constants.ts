import type { PollResourceConfig } from "./types";

export const PAGINATION_LIMIT = 500;

export const BASE_URL = "https://api.pipedrive.com";

export enum TriggerBranches {
  Notification = "Notification",
  URLValidation = "URL Validation",
}

export enum WebhookVersion {
  V1 = "v1",
  V2 = "v2",
}





export const POLL_RESOURCE_CONFIG: Record<string, PollResourceConfig> = {
  activity: { createdAtField: "add_time", updatedAtField: "update_time" },
  activityType: { createdAtField: "add_time", updatedAtField: "update_time" },
  deal: { createdAtField: "add_time", updatedAtField: "update_time" },
  file: { createdAtField: "add_time", updatedAtField: "update_time" },
  filter: { createdAtField: "add_time", updatedAtField: "update_time" },
  note: { createdAtField: "add_time", updatedAtField: "update_time" },
  organization: { createdAtField: "add_time", updatedAtField: "update_time" },
  person: { createdAtField: "add_time", updatedAtField: "update_time" },
  pipeline: { createdAtField: "add_time", updatedAtField: "update_time" },
  product: { createdAtField: "add_time", updatedAtField: "update_time" },
  stage: { createdAtField: "add_time", updatedAtField: "update_time" },
  user: { createdAtField: "created", updatedAtField: "modified" },
};
