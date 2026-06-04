import type { oauth2Connection } from "@prismatic-io/spectral";
import type { ClientCredentialsInputComments } from "../ConnectionComments/ClientCredentialsInputComments";
import type { ConnectionParams } from "./ConnectionParams";

export interface ClientCredentialParams extends ConnectionParams {
  comments?: ClientCredentialsInputComments;
}

export type OAuth2Connection = ReturnType<typeof oauth2Connection>;
