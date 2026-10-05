import type { Bucket } from "@aws-sdk/client-s3";
import type { ActionContext, PollingContext } from "@prismatic-io/spectral";
export interface FileListingWindow {
  windowStart: string;
  windowEnd: string;
  startAfter?: string;
}
export interface FileListingCursor
  extends FileListingWindow,
    Record<string, unknown> {
  startAfter: string;
}
export interface FileListingPage {
  keys: string[];
  startAfter?: string;
}
export interface PollingState {
  lastPolledAt?: string;
  cursor?: FileListingCursor;
}
export type PolledBucket = Omit<Bucket, "CreationDate"> & {
  CreationDate: string;
};
export type PollingCursorContext = Pick<ActionContext, "logger" | "debug"> & {
  polling: Pick<PollingContext["polling"], "getState">;
};
export interface PollingWindow {
  since: string;
  inclusive: boolean;
}
export interface PolledFileChange {
  changeType: "changed";
  record: string;
}
export interface PolledBucketChange {
  changeType: "created";
  record: PolledBucket;
}
