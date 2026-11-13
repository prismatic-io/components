import type { Message } from "@microsoft/microsoft-graph-types";

export interface PollingState extends Record<string, unknown> {
  lastPolledAt?: string;
  watermark?: string;
  boundaryIds?: string[];
  classifySince?: string;
  backfillActive?: boolean;
  folderId?: string;
}

interface WatermarkPosition {
  watermark: string;
  boundaryIds: string[];
}

export interface PollingCursor extends WatermarkPosition, Record<string, unknown> {
  classifySince: string;
  folderId?: string;
}

export interface MessageChangesObject {
  created: Message[];
  updated: Message[];
}

export interface MessageChange {
  changeType: "created" | "updated";
  record: Message;
}

export interface MessagesWindowParams {
  position: WatermarkPosition;
  horizonISO: string;
  pageSize: number;
  maxPages: number;
  folderId?: string;
}

export interface PollingWindowRequest {
  position: WatermarkPosition;
  skipFetch: boolean;
  batching: boolean;
  debug: boolean;
  now: Date;
  folderId?: string;
}

export interface MessagesWindow {
  messages: Message[];
  position: WatermarkPosition;
  drained: boolean;
}

export interface PollingStream {
  position: WatermarkPosition;
  classifySince: string;
}
