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

interface PolledCollection<T = Record<string, unknown>> {
  data: T[];
  polledNoChanges: boolean;
}

interface BoxChange<TChange extends string> {
  changeType: TChange;
  record: Record<string, unknown>;
}

export interface BoxChangesObject {
  newFiles?: PolledCollection;
  updatedFiles?: PolledCollection;
}

export type BoxRecordChange = BoxChange<"new" | "updated">;

export interface BoxFolderChangesObject {
  newFolders?: PolledCollection;
}

export type BoxFolderChange = BoxChange<"new">;

export interface BoxCommentChangesObject {
  newComments?: Omit<PolledCollection, "polledNoChanges">;
}

export type BoxCommentChange = BoxChange<"new">;
