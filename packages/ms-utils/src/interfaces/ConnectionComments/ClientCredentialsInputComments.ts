import type { InputComments } from "./InputComments";

export interface ClientCredentialsInputComments extends InputComments {
  clientId?: string;
  clientSecret?: string;
  tenantId?: string;
}
