import type { Connection } from "@prismatic-io/spectral";
import { authorizationHeaders } from "./client";


const CLIENT_ID = "your-client-id";
const CLIENT_SECRET = "your-client-secret";
const TOKEN_URL =
  "https://6340330-sb1.suitetalk.api.netsuite.com/services/rest/auth/oauth2/v1/token";





const rsaConnection: Connection = {
  key: "oauthClientCredentials",
  configVarKey: "My Config Var",
  fields: {
    privateKey: `-----BEGIN PRIVATE KEY-----
REPLACE ME WITH YOUR PRIVATE KEY
-----END PRIVATE KEY-----`,
    keyId: "7QHE-Cyot06SkVdTvNCVhqRLhcuW7SAZUAUgB5yAwHE",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    tokenUrl: TOKEN_URL,
  },
};




const ecConnection: Connection = {
  key: "oauthClientCredentials",
  configVarKey: "My Config Var",
  fields: {
    privateKey: `-----BEGIN PRIVATE KEY-----
REPLACE ME WITH YOUR PRIVATE KEY
-----END PRIVATE KEY-----`,
    keyId: "vWFhMk1_dc8nOlCefLpjyKy1Q1__tujTK_oIOWmLJHI",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    tokenUrl: TOKEN_URL,
  },
};

describe("Test authorizationHeaders", () => {
  test("Test RSA key", async () => {
    const result = await authorizationHeaders(rsaConnection);
    console.log(result);
  });
  test("Test EC key", async () => {
    const result = await authorizationHeaders(ecConnection);
    console.log(result);
  });
});
