import { createVerify, generateKeyPairSync } from "node:crypto";
import { util } from "@prismatic-io/spectral";
import {
  createConnection,
  invoke,
  loggerMock,
} from "@prismatic-io/spectral/testing";
import nock from "nock";
import { rawRequest } from "../actions/misc/rawRequest";
import { createClient, createDataManagerClient } from "../client";
import { serviceAccount } from "../connections";
import {
  GOOGLE_ADS_API_VERSION,
  GOOGLE_ADS_BASE_URL,
  GOOGLE_ADS_OAUTH_SCOPE,
  JWT_BEARER_GRANT_TYPE,
} from "../constants";
import { getServiceAccountToken } from "./serviceAccount";

const TOKEN_HOST = "https://oauth2.googleapis.com";
const { privateKey, publicKey } = generateKeyPairSync("rsa", {
  modulusLength: 2048,
  privateKeyEncoding: { type: "pkcs8", format: "pem" },
  publicKeyEncoding: { type: "spki", format: "pem" },
});

const keyFile = (clientEmail: string, key = privateKey) =>
  JSON.stringify({
    type: "service_account",
    client_email: clientEmail,
    private_key: key,
    private_key_id: "test-key-id",
    token_uri: `${TOKEN_HOST}/token`,
  });

const saConnection = (
  clientEmail: string,
  scopes = GOOGLE_ADS_OAUTH_SCOPE,
  key = privateKey,
) =>
  createConnection(serviceAccount, {
    keyFile: keyFile(clientEmail, key),
    scopes,
    apiVersion: "",
  });

const decodeSegment = (segment: string) =>
  util.types.toObject(
    util.types.toString(Buffer.from(segment, "base64url")),
  ) as Record<string, unknown>;

const mockTokenEndpoint = (accessToken: string) => {
  const captured: { assertion: string; grantType: string } = {
    assertion: "",
    grantType: "",
  };
  const scope = nock(TOKEN_HOST)
    .post("/token", (body) => {
      captured.assertion = util.types.toString(body.assertion);
      captured.grantType = util.types.toString(body.grant_type);
      return true;
    })
    .reply(200, { access_token: accessToken, expires_in: 3599 });
  return { scope, captured };
};

describe("getServiceAccountToken", () => {
  afterEach(() => nock.cleanAll());

  test("exchanges a JWT signed with the key for an access token", async () => {
    const { scope, captured } = mockTokenEndpoint("sa-token-1");

    const token = await getServiceAccountToken(
      saConnection("one@example.iam.gserviceaccount.com"),
    );

    expect(token).toBe("sa-token-1");
    expect(scope.isDone()).toBe(true);
    expect(captured.grantType).toBe(JWT_BEARER_GRANT_TYPE);

    const [header, claims, signature] = captured.assertion.split(".");
    expect(
      createVerify("RSA-SHA256")
        .update(`${header}.${claims}`)
        .verify(publicKey, Buffer.from(signature, "base64url")),
    ).toBe(true);
    expect(decodeSegment(header)).toEqual({
      alg: "RS256",
      typ: "JWT",
      kid: "test-key-id",
    });
    const payload = decodeSegment(claims);
    expect(payload).toMatchObject({
      iss: "one@example.iam.gserviceaccount.com",
      scope: GOOGLE_ADS_OAUTH_SCOPE,
      aud: `${TOKEN_HOST}/token`,
    });
    expect(payload.sub).toBeUndefined();
    expect(util.types.toInt(payload.exp) - util.types.toInt(payload.iat)).toBe(
      3600,
    );
  });

  test("reuses a token until it nears expiry", async () => {
    const { scope } = mockTokenEndpoint("sa-token-2");
    const connection = saConnection("two@example.iam.gserviceaccount.com");

    expect(await getServiceAccountToken(connection)).toBe("sa-token-2");
    expect(await getServiceAccountToken(connection)).toBe("sa-token-2");
    expect(scope.isDone()).toBe(true);
    expect(nock.pendingMocks()).toHaveLength(0);
  });

  test("does not share a token between keys of the same service account", async () => {
    const email = "rotated@example.iam.gserviceaccount.com";
    const { privateKey: otherKey } = generateKeyPairSync("rsa", {
      modulusLength: 2048,
      privateKeyEncoding: { type: "pkcs8", format: "pem" },
      publicKeyEncoding: { type: "spki", format: "pem" },
    });
    const first = mockTokenEndpoint("sa-token-old-key");
    expect(await getServiceAccountToken(saConnection(email))).toBe(
      "sa-token-old-key",
    );
    expect(first.scope.isDone()).toBe(true);

    const second = mockTokenEndpoint("sa-token-new-key");
    expect(
      await getServiceAccountToken(
        saConnection(email, GOOGLE_ADS_OAUTH_SCOPE, otherKey),
      ),
    ).toBe("sa-token-new-key");
    expect(second.scope.isDone()).toBe(true);
  });

  test("refuses a key file that is not a service account JSON key", async () => {
    const connection = createConnection(serviceAccount, {
      keyFile: "not json",
      scopes: GOOGLE_ADS_OAUTH_SCOPE,
      apiVersion: "",
    });

    await expect(getServiceAccountToken(connection)).rejects.toThrow(
      "must be the service account's JSON key",
    );
  });
});

describe("service account clients", () => {
  afterEach(() => nock.cleanAll());

  test("the Google Ads client sends the minted token and the linked-customer-id header", async () => {
    mockTokenEndpoint("sa-token-3");
    const api = nock(GOOGLE_ADS_BASE_URL, {
      reqheaders: {
        authorization: "Bearer sa-token-3",
        "login-customer-id": "1111111111",
        "linked-customer-id": "2222222222",
      },
    })
      .get(`/${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers`)
      .reply(200, { resourceNames: [] });

    const client = createClient({
      connection: saConnection("three@example.iam.gserviceaccount.com"),
      debugEnabled: false,
      logger: loggerMock(),
      loginCustomerId: "111-111-1111",
      linkedCustomerId: "222-222-2222",
    });
    await client.get("/customers:listAccessibleCustomers");

    expect(api.isDone()).toBe(true);
  });

  test("Raw Request authorizes with the minted token", async () => {
    mockTokenEndpoint("sa-token-4");
    const api = nock(GOOGLE_ADS_BASE_URL, {
      reqheaders: { authorization: "Bearer sa-token-4" },
    })
      .get(`/${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers`)
      .reply(200, { resourceNames: [] });

    await invoke(rawRequest, {
      connection: saConnection("four@example.iam.gserviceaccount.com"),
      url: `/${GOOGLE_ADS_API_VERSION}/customers:listAccessibleCustomers`,
      method: "GET",
    } as never);

    expect(api.isDone()).toBe(true);
  });

  test("the Data Manager client refuses the Service Account connection", () => {
    expect(() =>
      createDataManagerClient({
        connection: saConnection("five@example.iam.gserviceaccount.com"),
        debugEnabled: false,
        logger: loggerMock(),
      }),
    ).toThrow(
      "Unsupported connection type for the Data Manager API: serviceAccount",
    );
  });
});
