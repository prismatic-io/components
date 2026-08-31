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
