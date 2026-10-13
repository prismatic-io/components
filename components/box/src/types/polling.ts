import type { TriggerPayload } from "@prismatic-io/spectral";
export interface PollingState {
  lastPolledAt?: string;
}
export interface PollingResult {
  payload: TriggerPayload;
  polledNoChanges: boolean;
}
export interface NewOrUpdatedFilesResult<T> {
  [key: string]: {
    data: T;
    polledNoChanges: boolean;
  };
}
export interface BoxChangesObject {
  newFiles?: {
    data: Record<string, unknown>[];
    polledNoChanges: boolean;
  };
  updatedFiles?: {
    data: Record<string, unknown>[];
    polledNoChanges: boolean;
  };
}
export interface BoxRecordChange {
  changeType: "new" | "updated";
  record: Record<string, unknown>;
}
export interface BoxFolderChangesObject {
  newFolders?: {
    data: Record<string, unknown>[];
    polledNoChanges: boolean;
  };
}
export interface BoxFolderChange {
  changeType: "new";
  record: Record<string, unknown>;
}
export interface BoxCommentChangesObject {
  newComments?: {
    data: Record<string, unknown>[];
  };
}
export interface BoxCommentChange {
  changeType: "new";
  record: Record<string, unknown>;
}
