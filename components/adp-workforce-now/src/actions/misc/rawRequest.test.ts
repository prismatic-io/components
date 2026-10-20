import https from "node:https";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { adpOauth2 } from "../../connections/adpOauth2";
import { API_ENDPOINT, TOKEN_ENDPOINT } from "../../constants";
import { listWorkersExamplePayload } from "../../examplePayloads";
import { normalizeCertificateValue } from "../../util/connection";
import { rawRequest } from "./rawRequest";
const BASE = "https://api.adp.com";
const TOKEN = "test-token";
const CERT = "-----BEGIN CERTIFICATE-----\nCERT\n-----END CERTIFICATE-----";
const KEY = "-----BEGIN PRIVATE KEY-----\nKEY\n-----END PRIVATE KEY-----";
const ESCAPED_CERT = CERT.replace(/\n/g, "\\n");
const ESCAPED_KEY = KEY.replace(/\n/g, "\\n");
const makeConnection = (sslCert: string, sslKey: string) =>
  createConnection(adpOauth2, {
    endpoint: API_ENDPOINT,
    tokenEndpoint: TOKEN_ENDPOINT,
    clientId: "client-id",
    clientSecret: "client-secret",
    sslCert,
    sslKey,
  });
const context = (configVarKey: string) => ({
  executionState: {
    [`ADP - ${configVarKey}`]: {
      accessToken: TOKEN,
      expiresDate: Date.now() / 1000 + 3600,
    },
  },
});
const params = (connection: ReturnType<typeof makeConnection>) => ({
  connection,
  url: "/hr/v2/workers",
  method: "GET",
  data: undefined,
  formData: [],
  fileData: [],
  fileDataFileNames: undefined,
  headers: [{ key: "X-Custom", value: "abc" }],
  queryParams: [{ key: "$top", value: "1" }],
  responseType: "json",
  timeout: undefined,
});
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
afterEach(() => {
  nock.cleanAll();
  vi.restoreAllMocks();
});
describe("rawRequest", () => {
  test("forwards method, path, query and headers with the bearer token and returns the body", async () => {
    const connection = makeConnection(CERT, KEY);
    nock(BASE, {
      reqheaders: {
        authorization: `Bearer ${TOKEN}`,
        "x-custom": "abc",
      },
    })
      .get("/hr/v2/workers")
      .query({ $top: "1" })
      .reply(200, listWorkersExamplePayload.data, { "x-response": "yes" });
    const { result } = await invoke(
      rawRequest,
      params(connection) as never,
      context(connection.configVarKey),
    );
    const data = (
      result as {
        data: Record<string, unknown>;
      }
    ).data;
    expect(data.workers).toEqual(listWorkersExamplePayload.data.workers);
    expect(data.headers).toMatchObject({ "x-response": "yes" });
    expect(Object.keys(data).sort()).toEqual(
      [...Object.keys(listWorkersExamplePayload.data), "headers"].sort(),
    );
    expect(nock.isDone()).toBe(true);
  });
  test("accepts a certificate and key containing literal \\n sequences", async () => {
    const agentSpy = vi.spyOn(https, "Agent");
    const connection = makeConnection(ESCAPED_CERT, ESCAPED_KEY);
    nock(BASE)
      .get("/hr/v2/workers")
      .query(true)
      .reply(200, listWorkersExamplePayload.data);
    await expect(
      invoke(
        rawRequest,
        params(connection) as never,
        context(connection.configVarKey),
      ),
    ).resolves.toBeDefined();
    expect(agentSpy).toHaveBeenCalledWith(
      expect.objectContaining({ cert: CERT, key: KEY }),
    );
  });
  test("normalizeCertificateValue turns literal \\n into newlines", () => {
    expect(normalizeCertificateValue(ESCAPED_CERT)).toBe(CERT);
    expect(normalizeCertificateValue(CERT)).toBe(CERT);
  });
});
