import type { TriggerPayload } from "@prismatic-io/spectral";

export enum WebhookTriggerType {
  FILE_UPLOADED = "FILE.UPLOADED",
  FILE_PREVIEWED = "FILE.PREVIEWED",
  FILE_DOWNLOADED = "FILE.DOWNLOADED",
  FILE_TRASHED = "FILE.TRASHED",
  FILE_DELETED = "FILE.DELETED",
  FILE_RESTORED = "FILE.RESTORED",
  FILE_COPIED = "FILE.COPIED",
  FILE_MOVED = "FILE.MOVED",
  FILE_LOCKED = "FILE.LOCKED",
  FILE_UNLOCKED = "FILE.UNLOCKED",
  FILE_RENAMED = "FILE.RENAMED",
  COMMENT_CREATED = "COMMENT.CREATED",
  COMMENT_UPDATED = "COMMENT.UPDATED",
  COMMENT_DELETED = "COMMENT.DELETED",
  TASK_ASSIGNMENT_CREATED = "TASK_ASSIGNMENT.CREATED",
  TASK_ASSIGNMENT_UPDATED = "TASK_ASSIGNMENT.UPDATED",
  METADATA_INSTANCE_CREATED = "METADATA_INSTANCE.CREATED",
  METADATA_INSTANCE_UPDATED = "METADATA_INSTANCE.UPDATED",
  METADATA_INSTANCE_DELETED = "METADATA_INSTANCE.DELETED",
  FOLDER_CREATED = "FOLDER.CREATED",
  FOLDER_DOWNLOADED = "FOLDER.DOWNLOADED",
  FOLDER_RESTORED = "FOLDER.RESTORED",
  FOLDER_DELETED = "FOLDER.DELETED",
  FOLDER_COPIED = "FOLDER.COPIED",
  FOLDER_MOVED = "FOLDER.MOVED",
  FOLDER_TRASHED = "FOLDER.TRASHED",
  FOLDER_RENAMED = "FOLDER.RENAMED",
  WEBHOOK_DELETED = "WEBHOOK.DELETED",
  COLLABORATION_CREATED = "COLLABORATION.CREATED",
  COLLABORATION_ACCEPTED = "COLLABORATION.ACCEPTED",
  COLLABORATION_REJECTED = "COLLABORATION.REJECTED",
  COLLABORATION_REMOVED = "COLLABORATION.REMOVED",
  COLLABORATION_UPDATED = "COLLABORATION.UPDATED",
  SHARED_LINK_DELETED = "SHARED_LINK.DELETED",
  SHARED_LINK_CREATED = "SHARED_LINK.CREATED",
  SHARED_LINK_UPDATED = "SHARED_LINK.UPDATED",
  SIGN_REQUEST_COMPLETED = "SIGN_REQUEST.COMPLETED",
  SIGN_REQUEST_DECLINED = "SIGN_REQUEST.DECLINED",
  SIGN_REQUEST_EXPIRED = "SIGN_REQUEST.EXPIRED",
}

export interface Webhook {
  id: string;
  type: string;
  address: string;
  created_at: string;
  created_by: {
    id: string;
    type: string;
    login: string;
    name: string;
  };
  target: {
    id: string;
    type: string;
  };
  triggers: WebhookTriggerType[];
}

export interface StoreState {
  existingWebhookId?: string;
  primarySignatureKey: string;
  secondarySignatureKey: string;
}

export interface PollingState {
  lastPolledAt?: string;
}
export interface FolderEntry {
  id: string;
  name: string;
  created_at: string;
  modified_at: string;
}
export interface PollingResult<T> {
  payload: TriggerPayload;
}
export interface NewOrUpdatedFilesResult<T> {
  [key: string]: {
    data: T;
    polledNoChanges: boolean;
  };
}
