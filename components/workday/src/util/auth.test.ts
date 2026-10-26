import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { rawRequest } from "../actions/misc/rawRequest";
import { getClient } from "../client";
import {
  workdayOAuth2Connection,
  workdayRefreshTokenConnection,
} from "../connections";
import { clearTokenCache, getAccessToken, getBaseUrl } from "./auth";
const HOST = "https://wd.example.com";
const TOKEN_PATH = "/ccx/oauth2/acme/token";
const refreshConnection = (fields: Record<string, string> = {}) =>
  createConnection(workdayRefreshTokenConnection, {
    restApiUrl: `${HOST}/ccx/api/v1/acme`,
    clientId: "cid",
    clientSecret: "csecret",
    refreshToken: "good-rt",
    tokenUrl: "",
    ...fields,
  });
const formField = (body: unknown, key: string) =>
  typeof body === "string"
    ? new URLSearchParams(body).get(key)
    : (body as Record<string, string>)[key];
const mockToken = (
  accessToken: string,
  { refreshToken = "good-rt", reply = {} as Record<string, unknown> } = {},
) =>
  nock(HOST, { badheaders: ["authorization"] })
    .post(
      TOKEN_PATH,
      (body) =>
        formField(body, "grant_type") === "refresh_token" &&
        formField(body, "refresh_token") === refreshToken &&
        formField(body, "client_id") === "cid" &&
        formField(body, "client_secret") === "csecret",
    )
    .reply(200, { access_token: accessToken, token_type: "Bearer", ...reply });
const rawRequestParams = (connection: unknown, url: string) =>
  ({
    connection,
    url,
    method: "GET",
    data: "",
    formData: [],
    fileData: [],
    fileDataFileNames: [],
    queryParams: [],
    headers: [],
    responseType: "json",
    timeout: 0,
    debugRequest: false,
    retryDelayMS: 0,
    retryAllErrors: false,
    maxRetries: 0,
    useExponentialBackoff: false,
  }) as never;
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
beforeEach(() => clearTokenCache());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("connection URLs", () => {
  it("derives the base URL and token URL from the REST API Endpoint", async () => {
    expect(getBaseUrl(refreshConnection())).toBe(`${HOST}/ccx`);
    mockToken("at-1");
    expect(await getAccessToken(refreshConnection())).toBe("at-1");
  });
  it("uses the Token URL override when one is entered", async () => {
    nock("https://auth.example.com")
      .post("/token")
      .reply(200, { access_token: "at-override", token_type: "Bearer" });
    const connection = refreshConnection({
      tokenUrl: "https://auth.example.com/token",
    });
    expect(await getAccessToken(connection)).toBe("at-override");
  });
  it("rejects a Token URL override that isn't HTTPS", async () => {
    await expect(
      getAccessToken(
        refreshConnection({ tokenUrl: "http://auth.example.com/token" }),
      ),
    ).rejects.toThrow(/Token URL must use https/);
  });
  it("raises a connection error for a REST API Endpoint without a tenant", () => {
    expect(() =>
      getBaseUrl(refreshConnection({ restApiUrl: `${HOST}/ccx` })),
    ).toThrow(/REST API Endpoint must look like/);
  });
});
describe("refresh token connection", () => {
  it("exchanges with client credentials in the form body and no Authorization header, then calls the API with the access token", async () => {
    mockToken("at-1");
    nock(HOST, { reqheaders: { authorization: "Bearer at-1" } })
      .get("/ccx/api/common/v1/acme/organizations")
      .reply(200, { data: [] });
    const { data } = await getClient(refreshConnection(), false).get(
      "/api/common/v1/acme/organizations",
    );
    expect(data).toEqual({ data: [] });
  });
  it("reuses the token across requests and clients", async () => {
    mockToken("at-1");
    nock(HOST).get("/ccx/a").reply(200, {}).get("/ccx/b").reply(200, {});
    await getClient(refreshConnection(), false).get("/a");
    await getClient(refreshConnection(), false).get("/b");
  });
  it("gets one new token and retries once after a 401", async () => {
    mockToken("at-1");
    mockToken("at-2");
    nock(HOST)
      .get("/ccx/a")
      .matchHeader("authorization", "Bearer at-1")
      .reply(401)
      .get("/ccx/a")
      .matchHeader("authorization", "Bearer at-2")
      .reply(200, { ok: true });
    const { data } = await getClient(refreshConnection(), false).get("/a");
    expect(data).toEqual({ ok: true });
  });
  it("does not loop when the new token is also rejected", async () => {
    mockToken("at-1");
    mockToken("at-2");
    nock(HOST).get("/ccx/a").twice().reply(401);
    await expect(
      getClient(refreshConnection(), false).get("/a"),
    ).rejects.toThrow(/401/);
  });
  it("reports Workday's error without echoing the rest of the response", async () => {
    nock(HOST).post(TOKEN_PATH).reply(400, {
      error: "invalid_grant",
      error_description: "Invalid refresh token",
      echoed: "bad-rt",
    });
    const attempt = getAccessToken(
      refreshConnection({ refreshToken: "bad-rt" }),
    );
    await expect(attempt).rejects.toThrow(
      "Workday token request failed (HTTP 400): invalid_grant: Invalid refresh token",
    );
  });
  it("does not reuse a cached token when the client secret changes", async () => {
    mockToken("at-1");
    nock(HOST).post(TOKEN_PATH).reply(401, { error: "invalid_client" });
    await getAccessToken(refreshConnection());
    await expect(
      getAccessToken(refreshConnection({ clientSecret: "wrong-secret" })),
    ).rejects.toThrow(/Workday token request failed \(HTTP 401\)/);
  });
  it("forces a new exchange when asked, even with a cached token", async () => {
    mockToken("at-1");
    mockToken("at-2");
    expect(await getAccessToken(refreshConnection())).toBe("at-1");
    expect(
      await getAccessToken(refreshConnection(), { forceRefresh: true }),
    ).toBe("at-2");
  });
});
describe("refresh token rotation", () => {
  it("warns and uses the replacement refresh token for the next exchange", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    mockToken("at-1", { reply: { refresh_token: "rotated-rt" } });
    mockToken("at-2", { refreshToken: "rotated-rt" });
    await getAccessToken(refreshConnection());
    await getAccessToken(refreshConnection(), { forceRefresh: true });
    expect(warn).toHaveBeenCalledWith(
      expect.stringContaining("Workday returned a different refresh token"),
    );
    warn.mockRestore();
  });
  it("stays quiet when Workday returns the same refresh token", async () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    mockToken("at-1", { reply: { refresh_token: "good-rt" } });
    await getAccessToken(refreshConnection());
    expect(warn).not.toHaveBeenCalled();
    warn.mockRestore();
  });
});
describe("rawRequest", () => {
  it("sends a RaaS path with the exchanged token", async () => {
    mockToken("at-1");
    nock(HOST, { reqheaders: { authorization: "Bearer at-1" } })
      .get("/ccx/service/customreport2/acme/ISU_Orgvue/People")
      .query({ format: "json" })
      .reply(200, { Report_Entry: [] });
    const { result } = await invoke(
      rawRequest,
      rawRequestParams(
        refreshConnection(),
        "/service/customreport2/acme/ISU_Orgvue/People?format=json",
      ),
    );
    expect(result?.data).toEqual({ Report_Entry: [] });
  });
  it("retries once with a new token after a 401", async () => {
    mockToken("at-1");
    mockToken("at-2");
    nock(HOST)
      .get("/ccx/a")
      .reply(401)
      .get("/ccx/a")
      .matchHeader("authorization", "Bearer at-2")
      .reply(200, { ok: true });
    const { result } = await invoke(
      rawRequest,
      rawRequestParams(refreshConnection(), "/a"),
    );
    expect(result?.data).toEqual({ ok: true });
  });
});
describe("existing OAuth 2.0 connection", () => {
  it("still sends the stored access token and never calls the token endpoint", async () => {
    const connection = createConnection(
      workdayOAuth2Connection,
      { apiUrl: `${HOST}/ccx` },
      { access_token: "oauth-token" },
    );
    nock(HOST, { reqheaders: { authorization: "Bearer oauth-token" } })
      .get("/ccx/person/v4/people")
      .reply(200, { data: [] });
    const { data } = await getClient(connection, false).get(
      "/person/v4/people",
    );
    expect(data).toEqual({ data: [] });
  });
});
