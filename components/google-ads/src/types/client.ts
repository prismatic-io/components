import type { ActionLogger, Connection } from "@prismatic-io/spectral";

export interface CreateClientProps {
  connection: Connection;
  debugEnabled: boolean;
  logger: ActionLogger;
  loginCustomerId?: string;
  linkedCustomerId?: string;
}

export interface CreateDataManagerClientProps {
  connection: Connection;
  debugEnabled: boolean;
  logger: ActionLogger;
  loginCustomerId?: string;
}

export interface CreateLocalServicesClientProps {
  connection: Connection;
  debugEnabled: boolean;
  loginCustomerId?: string;
}

export interface GoogleServiceAccountKey {
  client_email: string;
  private_key: string;
  private_key_id?: string;
  token_uri?: string;
}

export interface ServiceAccountTokenResponse {
  access_token: string;
  expires_in: number;
}
