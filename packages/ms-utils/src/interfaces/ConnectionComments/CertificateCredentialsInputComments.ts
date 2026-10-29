import type { InputComments } from "./InputComments";

export interface CertificateCredentialsInputComments extends InputComments {
  clientId?: string;
  tenantId?: string;
}
