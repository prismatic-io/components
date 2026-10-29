import type { ConnectionInput } from "@prismatic-io/spectral";

export interface ConnectionDisplayOverrides {
  label?: string;
  description?: string;
}

export interface BaseConnectionParams {
  key: string;
  display?: ConnectionDisplayOverrides;
  additionalInputs?: Record<string, ConnectionInput>;
}

export interface BasicAuthConnectionParams extends BaseConnectionParams {
  comments?: Partial<{
    username: string;
    password: string;
    host: string;
  }>;
}

export interface OAuth2AuthorizationCodeConnectionParams
  extends BaseConnectionParams {
  defaultScopes?: string;
  comments?: Partial<{
    authorizeUrl: string;
    tokenUrl: string;
    scopes: string;
    clientId: string;
    clientSecret: string;
    apiSiteOverride: string;
  }>;
}

export interface OAuth2ClientCredentialsConnectionParams
  extends BaseConnectionParams {
  defaultScopes?: string;
  comments?: Partial<{
    tokenUrl: string;
    scopes: string;
    clientId: string;
    clientSecret: string;
    cloudId: string;
  }>;
}
