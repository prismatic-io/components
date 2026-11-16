import { ConnectionKeys, getMicrosoftCertificateCredentialsConnection } from "ms-utils";

export const certificateCredentials = getMicrosoftCertificateCredentialsConnection({
  key: ConnectionKeys.CertificateCredentials,
});
