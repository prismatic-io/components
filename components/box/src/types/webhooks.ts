import type { CreateWebhookRequestBody } from "box-node-sdk/lib/managers/webhooks";
export type CreateWebhookBody = CreateWebhookRequestBody;
export const WEBHOOK_TRIGGER_TYPES = [
  "FILE.UPLOADED",
  "FILE.PREVIEWED",
  "FILE.DOWNLOADED",
  "FILE.TRASHED",
  "FILE.DELETED",
  "FILE.RESTORED",
  "FILE.COPIED",
  "FILE.MOVED",
  "FILE.LOCKED",
  "FILE.UNLOCKED",
  "FILE.RENAMED",
  "COMMENT.CREATED",
  "COMMENT.UPDATED",
  "COMMENT.DELETED",
  "TASK_ASSIGNMENT.CREATED",
  "TASK_ASSIGNMENT.UPDATED",
  "METADATA_INSTANCE.CREATED",
  "METADATA_INSTANCE.UPDATED",
  "METADATA_INSTANCE.DELETED",
  "FOLDER.CREATED",
  "FOLDER.DOWNLOADED",
  "FOLDER.RESTORED",
  "FOLDER.DELETED",
  "FOLDER.COPIED",
  "FOLDER.MOVED",
  "FOLDER.TRASHED",
  "FOLDER.RENAMED",
  "WEBHOOK.DELETED",
  "COLLABORATION.CREATED",
  "COLLABORATION.ACCEPTED",
  "COLLABORATION.REJECTED",
  "COLLABORATION.REMOVED",
  "COLLABORATION.UPDATED",
  "SHARED_LINK.DELETED",
  "SHARED_LINK.CREATED",
  "SHARED_LINK.UPDATED",
  "SIGN_REQUEST.COMPLETED",
  "SIGN_REQUEST.DECLINED",
  "SIGN_REQUEST.EXPIRED",
] as const;
export type WebhookTriggerType = (typeof WEBHOOK_TRIGGER_TYPES)[number];
export type BoxTargetType = "file" | "folder";
export interface StoreState {
  primarySignatureKey: string;
  secondarySignatureKey: string;
  previousTargetId: string;
  previousTargetType: BoxTargetType;
  previousTriggerTypes: WebhookTriggerType[];
  existingWebhookId?: string;
}
