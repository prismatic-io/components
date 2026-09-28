import crypto from "node:crypto";
import type { Connection } from "@prismatic-io/spectral";
import { adobeCommerceApiKey } from "./connections/adobeCommerceApiKey";
import { adobeCommerceOauth1 } from "./connections/adobeCommerceOauth1";
import { sandboxUrl } from "./constants";
export const STORE_HOST = "https://store.example.com";
export const MARKETPLACE_HOST = sandboxUrl;
export const MARKETPLACE_SESSION_TOKEN = "test-session-token";
export const STORE_CREDENTIALS = {
  consumerKey: "test-consumer-key",
  consumerSecret: "test-consumer-secret",
  accessToken: "test-access-token",
  accessTokenSecret: "test-access-token-secret",
};
export const storeConnection = (
  fields: Record<string, unknown> = {},
): Connection => ({
  key: adobeCommerceOauth1.key,
  configVarKey: "Adobe Commerce Connection",
  fields: {
    storeUrl: STORE_HOST,
    ...STORE_CREDENTIALS,
    storeCode: "default",
    ...fields,
  },
});
export const marketplaceConnection = (
  fields: Record<string, unknown> = {},
): Connection => ({
  key: adobeCommerceApiKey.key,
  configVarKey: "Adobe Commerce Connection",
  fields: {
    applicationId: "AQ17NZ49WC",
    applicationSecret: "8820c99614d65f923df7660276f20e029d73e2ca",
    productionEnvironment: false,
    ...fields,
  },
});
export const isOauth1Header = (value: string): boolean =>
  value.startsWith("OAuth ") &&
  value.includes(`oauth_consumer_key="${STORE_CREDENTIALS.consumerKey}"`) &&
  value.includes(`oauth_token="${STORE_CREDENTIALS.accessToken}"`) &&
  value.includes('oauth_signature_method="HMAC-SHA256"') &&
  /oauth_signature="[^"]+"/.test(value);
const UNRESERVED =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
const encodeRfc3986 = (value: string): string =>
  Array.from(Buffer.from(value, "utf8"))
    .map((byte) => {
      const character = String.fromCharCode(byte);
      return UNRESERVED.includes(character)
        ? character
        : `%${byte.toString(16).toUpperCase().padStart(2, "0")}`;
    })
    .join("");
const parseAuthorizationHeader = (header: string): Map<string, string> => {
  const parameters = new Map<string, string>();
  for (const part of header.replace(/^OAuth /, "").split(", ")) {
    const separator = part.indexOf("=");
    const name = part.slice(0, separator);
    const value = part.slice(separator + 1).replace(/^"|"$/g, "");
    parameters.set(decodeURIComponent(name), decodeURIComponent(value));
  }
  return parameters;
};
export interface ObservedRequest {
  method: string;
  url: string;
  authorization: string;
}
export const verifyOauth1Signature = (
  request: ObservedRequest,
  credentials: typeof STORE_CREDENTIALS = STORE_CREDENTIALS,
): boolean => {
  const headerParameters = parseAuthorizationHeader(request.authorization);
  const url = new URL(request.url);
  const signed: Array<[string, string]> = [];
  url.searchParams.forEach((value, name) => {
    signed.push([name, value]);
  });
  for (const [name, value] of headerParameters) {
    if (name !== "oauth_signature") {
      signed.push([name, value]);
    }
  }
  const normalizedParameters = signed
    .map(([name, value]): [string, string] => [
      encodeRfc3986(name),
      encodeRfc3986(value),
    ])
    .sort(([nameA, valueA], [nameB, valueB]) =>
      nameA === nameB ? (valueA < valueB ? -1 : 1) : nameA < nameB ? -1 : 1,
    )
    .map(([name, value]) => `${name}=${value}`)
    .join("&");
  const baseString = [
    request.method.toUpperCase(),
    encodeRfc3986(`${url.protocol}//${url.host}${url.pathname}`),
    encodeRfc3986(normalizedParameters),
  ].join("&");
  const signingKey = `${encodeRfc3986(credentials.consumerSecret)}&${encodeRfc3986(credentials.accessTokenSecret)}`;
  const expected = crypto
    .createHmac("sha256", signingKey)
    .update(baseString)
    .digest("base64");
  return expected === headerParameters.get("oauth_signature");
};
