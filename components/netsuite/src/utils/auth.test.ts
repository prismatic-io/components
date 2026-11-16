import { generateKeyPairSync } from "node:crypto";
import type { Connection } from "@prismatic-io/spectral";
import * as jwt from "jsonwebtoken";
import nock from "nock";
import { authorizationHeaders, createClient } from "../client";
import { accountOrigin } from "./auth";

const ORIGIN = "https://1234567.suitetalk.api.netsuite.com";
const TOKEN_PATH = "/services/rest/auth/oauth2/v1/token";

const pem = (
  type: "rsa" | "ec" | "ed25519",
  options: Record<string, unknown> = {},
): string =>
  // biome-ignore lint/suspicious/noExplicitAny: generateKeyPairSync overloads are keyed by literal type
  (generateKeyPairSync as any)(type, {
    ...options,
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
  }).privateKey;

const rsaKey = pem("rsa", { modulusLength: 2048 });
const p256Key = pem("ec", { namedCurve: "P-256" });

let connectionCount = 0;
const clientCredentialsConnection = (
  fields: Record<string, unknown> = {},
): Connection => ({
  key: "oauthClientCredentials",
  configVarKey: "NetSuite Connection",
  fields: {
    tokenUrl: `${ORIGIN}${TOKEN_PATH}`,
    clientId: `client-${++connectionCount}`,
    keyId: "key-id",
    privateKey: p256Key,
    scopes: "rest_webservices",
    ...fields,
  },
});

const assertionSentFor = async (connection: Connection) => {
  let assertion = "";
  nock(ORIGIN)
    .post(TOKEN_PATH, (body) => {
      assertion = body.client_assertion;
      return true;
    })
    .reply(200, { access_token: "access-token", expires_in: 3600 });
  await authorizationHeaders(connection);
  const decoded = jwt.decode(assertion, { complete: true });
  if (!decoded) {
    throw new Error("No JWT assertion was sent.");
  }
  return {
    header: decoded.header,
    payload: decoded.payload as jwt.JwtPayload,
  };
};

beforeAll(() => nock.disableNetConnect());
afterEach(() => {
  nock.cleanAll();
  vi.useRealTimers();
});
afterAll(() => nock.enableNetConnect());

describe("accountOrigin", () => {
  test("returns the SuiteTalk origin of a production account", () => {
    expect(accountOrigin(`${ORIGIN}${TOKEN_PATH}`)).toBe(ORIGIN);
  });

  test("normalizes a sandbox account ID copied from Company Information", () => {
    expect(
      accountOrigin(
        `https://123456_SB1.suitetalk.api.netsuite.com${TOKEN_PATH}`,
      ),
    ).toBe("https://123456-sb1.suitetalk.api.netsuite.com");
  });

  test("leaves an already normalized sandbox account ID unchanged", () => {
    expect(
      accountOrigin(
        `https://123456-sb1.suitetalk.api.netsuite.com${TOKEN_PATH}`,
      ),
    ).toBe("https://123456-sb1.suitetalk.api.netsuite.com");
  });

  test("throws when the Token URL carries no account ID", () => {
    expect(() => accountOrigin(`https://example.com${TOKEN_PATH}`)).toThrow(
      "Unable to extract account ID from the Token URL.",
    );
  });
});

describe("client credentials JWT assertion", () => {
  test.each([
    ["an RSA key", "PS256", rsaKey],
    ["a P-256 EC key", "ES256", p256Key],
    ["a P-384 EC key", "ES384", pem("ec", { namedCurve: "P-384" })],
    ["a P-521 EC key", "ES512", pem("ec", { namedCurve: "P-521" })],
  ])("signs %s with %s", async (_label, expected, privateKey) => {
    const { header } = await assertionSentFor(
      clientCredentialsConnection({ privateKey }),
    );
    expect(header).toMatchObject({ alg: expected, kid: "key-id", typ: "JWT" });
  });

  test("rejects a key type NetSuite does not accept", async () => {
    await expect(
      authorizationHeaders(
        clientCredentialsConnection({ privateKey: pem("ed25519") }),
      ),
    ).rejects.toThrow(/Unsupported private key type: ed25519/);
  });

  test("accepts a private key whose line breaks arrive escaped", async () => {
    const { header } = await assertionSentFor(
      clientCredentialsConnection({ privateKey: rsaKey.replace(/\n/g, "\\n") }),
    );
    expect(header.alg).toBe("PS256");
  });

  test.each([
    ["rest_webservices", "rest_webservices"],
    ["restlets rest_webservices", "restlets, rest_webservices"],
    ["restlets,rest_webservices", "restlets, rest_webservices"],
    [" restlets ,  suite_analytics ", "restlets, suite_analytics"],
    ["", "rest_webservices"],
  ])("requests the configured scopes %j as %j", async (scopes, expected) => {
    const { payload } = await assertionSentFor(
      clientCredentialsConnection({ scopes }),
    );
    expect(payload).toMatchObject({
      aud: `${ORIGIN}${TOKEN_PATH}`,
      scope: expected,
    });
  });

  test("keeps the assertion lifetime under NetSuite's 60-minute limit", async () => {
    const { payload } = await assertionSentFor(clientCredentialsConnection());
    expect((payload.exp ?? 0) - (payload.iat ?? 0)).toBe(300);
  });
});

describe("client credentials access token cache", () => {
  test("reuses the access token until it is about to expire", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    const connection = clientCredentialsConnection();
    nock(ORIGIN)
      .post(TOKEN_PATH)
      .reply(200, { access_token: "first", expires_in: 3600 })
      .post(TOKEN_PATH)
      .reply(200, { access_token: "second", expires_in: 3600 });

    expect(await authorizationHeaders(connection)).toEqual({
      Authorization: "Bearer first",
    });
    vi.advanceTimersByTime(3539 * 1000);
    expect(await authorizationHeaders(connection)).toEqual({
      Authorization: "Bearer first",
    });
    vi.advanceTimersByTime(2 * 1000);
    expect(await authorizationHeaders(connection)).toEqual({
      Authorization: "Bearer second",
    });
    expect(nock.isDone()).toBe(true);
  });

  test("does not share a cached token between different credentials", async () => {
    nock(ORIGIN)
      .post(TOKEN_PATH)
      .reply(200, { access_token: "for-a", expires_in: 3600 })
      .post(TOKEN_PATH)
      .reply(200, { access_token: "for-b", expires_in: 3600 });
    const connection = clientCredentialsConnection();

    expect(await authorizationHeaders(connection)).toEqual({
      Authorization: "Bearer for-a",
    });
    expect(
      await authorizationHeaders({
        ...connection,
        fields: {
          ...connection.fields,
          privateKey: pem("ec", { namedCurve: "P-256" }),
        },
      }),
    ).toEqual({ Authorization: "Bearer for-b" });
    expect(nock.isDone()).toBe(true);
  });
});

describe("client credentials token recovery", () => {
  test("drops the cached token when NetSuite rejects it with 401", async () => {
    const connection = clientCredentialsConnection();
    nock(ORIGIN)
      .post(TOKEN_PATH)
      .reply(200, { access_token: "revoked", expires_in: 3600 })
      .get("/services/rest/record/v1/customer/1")
      .reply(401, { "o:errorDetails": [{ detail: "Invalid login attempt." }] })
      .post(TOKEN_PATH)
      .reply(200, { access_token: "fresh", expires_in: 3600 });

    const first = await createClient(connection, "record");
    await expect(first.get("/customer/1")).rejects.toThrow();

    expect(await authorizationHeaders(connection)).toEqual({
      Authorization: "Bearer fresh",
    });
    expect(nock.isDone()).toBe(true);
  });

  test("retries a token request NetSuite rejects with 429", async () => {
    nock(ORIGIN)
      .post(TOKEN_PATH)
      .reply(429, {})
      .post(TOKEN_PATH)
      .reply(200, { access_token: "after-retry", expires_in: 3600 });

    expect(await authorizationHeaders(clientCredentialsConnection())).toEqual({
      Authorization: "Bearer after-retry",
    });
    expect(nock.isDone()).toBe(true);
  });
});
