import type { connection } from "@prismatic-io/spectral";
import type { CertificateCredentialsInputComments } from "../ConnectionComments/CertificateCredentialsInputComments";
import type { ConnectionParams } from "./ConnectionParams";

export interface CertificateCredentialParams extends ConnectionParams {
  comments?: CertificateCredentialsInputComments;
}

export type ConnectionAuth = ReturnType<typeof connection>;
