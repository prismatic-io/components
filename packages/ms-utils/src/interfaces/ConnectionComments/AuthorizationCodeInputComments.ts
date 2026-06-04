import type { InputComments } from "./InputComments";

export interface AuthorizationCodeInputComments extends InputComments {
  authorizeUrl?: string;
  clientId?: string;
  clientSecret?: string;
  baseUrl?: string;
  tenantUrl?: string;
  extraParameters?: string;
}
