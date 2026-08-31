import type { ActionLogger, Connection } from "@prismatic-io/spectral";
export interface CreateClientProps {
  connection: Connection;
  debugEnabled: boolean;
  logger: ActionLogger;
  loginCustomerId?: string;
}
export interface CreateDataManagerClientProps {
  connection: Connection;
  debugEnabled: boolean;
  logger: ActionLogger;
}
export interface CreateLocalServicesClientProps {
  connection: Connection;
  debugEnabled: boolean;
  loginCustomerId?: string;
}
