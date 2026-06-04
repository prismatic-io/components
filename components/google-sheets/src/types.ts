import type { drive_v3 } from "@googleapis/drive";
import type { ActionLogger, Connection } from "@prismatic-io/spectral";

export type DriveWatch = {
  channelId: string;
  resourceId: string;
  expiration: string;
};

export type ManageWatchParams = {
  drive: drive_v3.Drive;
  spreadsheetId: string;
  webhookAddress: string;
  newChannelId: string;
  previousWatch?: DriveWatch;
  logger: ActionLogger;
};

export type StopWatchParams = {
  drive: drive_v3.Drive;
  channelId: string;
  resourceId: string;
};

export type SpreadsheetChangeEventsInputs = {
  connection: Connection;
  spreadsheetId: string;
};
