import { type Connection, util } from "@prismatic-io/spectral";
import crypto from "node:crypto";

export const getApiKey = (connection: Connection): string => {
  
  if (connection.fields?.apiKey) {
    return util.types.toString(connection.fields.apiKey);
  }

  
  if (connection.fields?.clientId) {
    return util.types.toString(connection.fields.clientId);
  }

  throw new Error("No API key found for webhook signature verification.");
};

export const getApiSecret = (connection: Connection): string => {
  
  if (connection.fields?.apiSecret) {
    return util.types.toString(connection.fields.apiSecret);
  }

  
  if (connection.fields?.clientSecret) {
    return util.types.toString(connection.fields.clientSecret);
  }

  throw new Error("No API secret found for webhook signature verification.");
};















export const verifySignature = (
  rawBody: string,
  signature: string,
  apiKey: string,
  apiSecret: string,
): boolean => {
  
  const signingKey = `${apiKey}&${apiSecret}`;

  const computedSignature = crypto
    .createHmac("sha1", signingKey)
    .update(rawBody, "utf8")
    .digest("base64");

  return signature === computedSignature;
};
