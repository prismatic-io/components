import type { oauth2Connection } from "@prismatic-io/spectral";
import type { AuthorizationCodeInputComments } from "../ConnectionComments/AuthorizationCodeInputComments";
import type { ConnectionParams } from "./ConnectionParams";

export interface AuthorizationCodeParams extends ConnectionParams {
  comments?: AuthorizationCodeInputComments;
}

export type OAuth2Connection = ReturnType<typeof oauth2Connection>;
