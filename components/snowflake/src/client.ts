import { type Connection, util } from "@prismatic-io/spectral";
import { createClient, type HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { snowflakeKeyPairConnection } from "./connections";
import type { HeaderProps } from "./types";
import { cleanFunctionForSnowflakeUserInputs, generateJwtAuthToken } from "./util";

export const getClient = (
  connection: Connection,
  snowflakeUrl: string,
  accountLocator: string,
  debug: boolean,
): HttpClient => {
  const contentType = "application/json";
  let headers: HeaderProps = {
    authorization: `Bearer ${connection?.token?.access_token}`,
    "X-Snowflake-Authorization-Token-Type": "OAUTH",
    "Snowflake-Account": accountLocator,
    "Content-Type": contentType,
    Accept: contentType,
  };

  if (connection.key === snowflakeKeyPairConnection.key) {
    const privateKey = util.types.toString(connection.fields.privateKey).replace(/\\n/g, "\n");
    const passphrase = util.types.toString(connection.fields.passphrase);
    const cleanAccountIdentifier = cleanFunctionForSnowflakeUserInputs(
      connection.fields.accountIdentifier,
    );

    const qualifiedUsername = `${cleanAccountIdentifier}.${connection.fields.username}`;
    const jwtToken = generateJwtAuthToken(privateKey, qualifiedUsername, passphrase);

    headers = {
      authorization: `Bearer ${jwtToken}`,
      "X-Snowflake-Authorization-Token-Type": "KEYPAIR_JWT",
      "Content-Type": contentType,
      Accept: contentType,
    };
  }

  return createClient({
    baseUrl: snowflakeUrl,
    headers,
    debug,
  });
};
