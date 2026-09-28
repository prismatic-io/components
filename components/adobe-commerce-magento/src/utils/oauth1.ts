import crypto from "node:crypto";
import { OAUTH1_SIGNATURE_METHOD, OAUTH1_VERSION } from "../constants";
import type { Oauth1Request } from "../types";
export const percentEncode = (value: string): string =>
  encodeURIComponent(value).replace(
    /[!'()*]/g,
    (character) => `%${character.charCodeAt(0).toString(16).toUpperCase()}`,
  );
export const normalizeRequestUrl = (url: string): string => {
  const parsed = new URL(url);
  return `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
};
export const buildSignatureBaseString = (
  method: string,
  url: string,
  params: Array<[string, string]>,
): string => {
  const normalizedParams = params
    .map(([name, value]): [string, string] => [
      percentEncode(name),
      percentEncode(value),
    ])
    .sort(([nameA, valueA], [nameB, valueB]) => {
      if (nameA !== nameB) {
        return nameA < nameB ? -1 : 1;
      }
      if (valueA !== valueB) {
        return valueA < valueB ? -1 : 1;
      }
      return 0;
    })
    .map(([name, value]) => `${name}=${value}`)
    .join("&");
  return [
    method.toUpperCase(),
    percentEncode(normalizeRequestUrl(url)),
    percentEncode(normalizedParams),
  ].join("&");
};
export const buildAuthorizationHeader = ({
  method,
  url,
  params,
  credentials,
  nonce = crypto.randomBytes(16).toString("hex"),
  timestamp = Math.floor(Date.now() / 1000).toString(),
}: Oauth1Request): string => {
  const oauthParams: Array<[string, string]> = [
    ["oauth_consumer_key", credentials.consumerKey],
    ["oauth_nonce", nonce],
    ["oauth_signature_method", OAUTH1_SIGNATURE_METHOD],
    ["oauth_timestamp", timestamp],
    ["oauth_token", credentials.accessToken],
    ["oauth_version", OAUTH1_VERSION],
  ];
  const baseString = buildSignatureBaseString(method, url, [
    ...oauthParams,
    ...params,
  ]);
  const signingKey = `${percentEncode(credentials.consumerSecret)}&${percentEncode(credentials.accessTokenSecret)}`;
  const signature = crypto
    .createHmac("sha256", signingKey)
    .update(baseString)
    .digest("base64");
  const headerParams: Array<[string, string]> = [
    ...oauthParams,
    ["oauth_signature", signature],
  ];
  return `OAuth ${headerParams
    .map(([name, value]) => `${percentEncode(name)}="${percentEncode(value)}"`)
    .join(", ")}`;
};
