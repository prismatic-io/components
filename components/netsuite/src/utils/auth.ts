import * as crypto from "node:crypto";
import { URL } from "node:url";
import { type Connection, util } from "@prismatic-io/spectral";
import * as jwt from "jsonwebtoken";
import NodeRSA from "node-rsa";

export const createDynamicJWTToken = (connection: Connection) => {
  const privateKeyData = util.types
    .toString(connection.fields.privateKey)
    .replace(/\\n/g, "\n");

  let isRsaKey = false;
  try {
    new NodeRSA(privateKeyData);
    isRsaKey = true;
  } catch {
    
  }

  const privateKey = crypto.createPrivateKey(privateKeyData);

  const clientId = connection.fields.clientId;
  const tokenUrl = util.types.toString(connection.fields.tokenUrl);
  const baseUrl = new URL(tokenUrl).origin;

  const payload = {
    iss: clientId,
    aud: `${baseUrl}/services/rest/auth/oauth2/v1/token`,
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
    iat: Math.floor(Date.now() / 1000),
    scope: "restlets, rest_webservices, suite_analytics",
  };

  const keyId = util.types.toString(connection.fields.keyId);

  const token = jwt.sign(payload, privateKey, {
    algorithm: isRsaKey ? "PS256" : "ES256",
    header: { kid: keyId, typ: "JWT", alg: isRsaKey ? "PS256" : "ES256" },
  });

  return token;
};
