import { type ActionLogger, ConnectionError } from "@prismatic-io/spectral";
import nock from "nock";
import {
  createGitlabClient,
  getAuthHeaders,
  resolveRequestTarget,
} from "./client";
import {
  accessTokenConnection,
  GITLAB_URL,
  oauthConnection,
  onPremConnectionValue,
  onPremOauthConnectionValue,
} from "./testHelpers";

afterEach(() => nock.cleanAll());

describe("getAuthHeaders", () => {
  test("access tokens use PRIVATE-TOKEN", () => {
    expect(getAuthHeaders(accessTokenConnection)).toEqual({
      "PRIVATE-TOKEN": "glpat-test-token",
    });
  });

  test("OAuth uses a bearer token", () => {
    expect(getAuthHeaders(oauthConnection)).toEqual({
      Authorization: "Bearer oauth-test-token",
    });
  });
});

describe("resolveRequestTarget", () => {
  test("direct connection uses the GitLab URL", () => {
    const target = resolveRequestTarget(accessTokenConnection);
    expect(target.baseUrl).toBe(`${GITLAB_URL}/api/v4`);
    expect(target.viaTunnel).toBe(false);
    expect(target.headers.Host).toBeUndefined();
  });

  test("on-prem connection with a tunnel dials host and port and keeps the real Host", () => {
    const target = resolveRequestTarget(
      onPremConnectionValue({
        gitlabUrl: "https://gitlab.test/gitlab",
        host: "10.0.0.12",
        port: "4443",
      }),
    );
    expect(target.baseUrl).toBe("https://10.0.0.12:4443/gitlab/api/v4");
    expect(target.headers.Host).toBe("gitlab.test");
    expect(target.viaTunnel).toBe(true);
    expect(target.httpsAgent).toBeDefined();
  });

  test("OAuth connection with the on-prem toggle on also routes through the tunnel", () => {
    const target = resolveRequestTarget(
      onPremOauthConnectionValue({ host: "10.0.0.12", port: "443" }),
    );
    expect(target.baseUrl).toBe("https://10.0.0.12:443/api/v4");
    expect(target.headers).toMatchObject({
      Host: "gitlab.test",
      Authorization: "Bearer oauth-test-token",
    });
    expect(target.viaTunnel).toBe(true);
  });

  test("a direct connection gets a TLS agent only when a CA or Ignore SSL Errors is set", () => {
    expect(
      resolveRequestTarget(accessTokenConnection).httpsAgent,
    ).toBeUndefined();
    expect(
      resolveRequestTarget(
        onPremConnectionValue({ host: "", ignoreSslErrors: true }),
      ).httpsAgent,
    ).toBeDefined();
  });

  test("rejects an http GitLab URL on a direct connection", () => {
    expect(() =>
      resolveRequestTarget(
        onPremConnectionValue({ gitlabUrl: "http://gitlab.test" }),
      ),
    ).toThrow(ConnectionError);
  });

  test("allows an http GitLab URL through the on-prem tunnel", () => {
    const target = resolveRequestTarget(
      onPremConnectionValue({
        gitlabUrl: "http://gitlab.test",
        host: "10.0.0.12",
        port: "8080",
      }),
    );
    expect(target.baseUrl).toBe("http://10.0.0.12:8080/api/v4");
  });

  test("on-prem connection without a tunnel host goes direct", () => {
    const target = resolveRequestTarget(onPremConnectionValue({ host: "" }));
    expect(target.baseUrl).toBe("https://gitlab.test/api/v4");
    expect(target.viaTunnel).toBe(false);
  });
});

describe("createGitlabClient", () => {
  test("retries a 429 honoring Retry-After", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/user")
      .reply(429, { message: "429 Too Many Requests" }, { "Retry-After": "0" })
      .get("/api/v4/user")
      .reply(200, { id: 1 });
    const client = createGitlabClient(accessTokenConnection, false);
    const { data } = await client.get("/user");
    expect(data).toEqual({ id: 1 });
  });

  test("does not retry a POST that was rate limited", async () => {
    const scope = nock(GITLAB_URL)
      .post("/api/v4/projects/1/issues")
      .reply(429, { message: "429 Too Many Requests" }, { "Retry-After": "0" });
    const client = createGitlabClient(accessTokenConnection, false);
    await expect(client.post("/projects/1/issues", {})).rejects.toThrow(/429/);
    expect(scope.isDone()).toBe(true);
    expect(nock.pendingMocks()).toEqual([]);
  });

  test("retries a rate-limited PUT", async () => {
    nock(GITLAB_URL)
      .put("/api/v4/projects/1/issues/2")
      .reply(429, { message: "429 Too Many Requests" }, { "Retry-After": "0" })
      .put("/api/v4/projects/1/issues/2")
      .reply(200, { id: 2 });
    const client = createGitlabClient(accessTokenConnection, false);
    const { data } = await client.put("/projects/1/issues/2", { title: "x" });
    expect(data).toEqual({ id: 2 });
  });

  test("does not retry a POST that failed with 500", async () => {
    const scope = nock(GITLAB_URL)
      .post("/api/v4/projects/1/issues")
      .reply(500, { message: "500 Internal Server Error" });
    const client = createGitlabClient(accessTokenConnection, false);
    await expect(client.post("/projects/1/issues", {})).rejects.toThrow(/500/);
    expect(scope.isDone()).toBe(true);
    expect(nock.pendingMocks()).toEqual([]);
  });

  test("reports a 401 as a ConnectionError with a next step", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/user")
      .reply(401, { message: "401 Unauthorized" });
    const client = createGitlabClient(accessTokenConnection, false);
    const error = await client.get("/user").catch((e: unknown) => e);
    expect(error).toBeInstanceOf(ConnectionError);
    expect((error as Error).message).toMatch(/expired or revoked/);
  });

  test("keeps a 403 as an HTTP error with a permissions hint", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/projects/1/hooks")
      .reply(403, { message: "403 Forbidden" });
    const client = createGitlabClient(accessTokenConnection, false);
    const error = await client
      .get("/projects/1/hooks")
      .catch((e: unknown) => e);
    expect(error).not.toBeInstanceOf(ConnectionError);
    expect((error as Error).message).toMatch(/Maintainer or Owner/);
  });
});

describe("redirects", () => {
  test("drops PRIVATE-TOKEN on a redirect to another host", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/projects/1/repository/files/a.txt/raw")
      .reply(302, "", { Location: "https://storage.example.net/blob/a.txt" });
    const storage = nock("https://storage.example.net", {
      badheaders: ["private-token"],
    })
      .get("/blob/a.txt")
      .reply(200, "contents");
    const client = createGitlabClient(accessTokenConnection, false);
    const { data } = await client.get(
      "/projects/1/repository/files/a.txt/raw",
      { responseType: "text" },
    );
    expect(data).toBe("contents");
    expect(storage.isDone()).toBe(true);
  });

  test("keeps PRIVATE-TOKEN on a redirect within the GitLab host", async () => {
    nock(GITLAB_URL)
      .get("/api/v4/projects/acme%2Fapp")
      .reply(301, "", { Location: `${GITLAB_URL}/api/v4/projects/1` });
    const target = nock(GITLAB_URL, {
      reqheaders: { "PRIVATE-TOKEN": "glpat-test-token" },
    })
      .get("/api/v4/projects/1")
      .reply(200, { id: 1 });
    const client = createGitlabClient(accessTokenConnection, false);
    await client.get("/projects/acme%2Fapp");
    expect(target.isDone()).toBe(true);
  });
});

describe("debug logging", () => {
  const fakeLogger = () => {
    const debug = vi.fn();
    const logger: ActionLogger = {
      metric: vi.fn(),
      trace: vi.fn(),
      debug,
      info: vi.fn(),
      log: vi.fn(),
      warn: vi.fn(),
      error: vi.fn(),
    };
    return { logger, debug };
  };

  test.each([
    ["access token", accessTokenConnection, "glpat-test-token"],
    ["OAuth", oauthConnection, "oauth-test-token"],
  ])("never logs the %s credential", async (_name, connection, token) => {
    const { logger, debug } = fakeLogger();
    nock(GITLAB_URL)
      .post("/api/v4/projects/1/issues")
      .query(true)
      .reply(201, { id: 1, title: "Retry failed ACH settlements" });
    const client = createGitlabClient(connection, logger);
    await client.post(
      "/projects/1/issues",
      { title: "Retry failed ACH settlements" },
      { params: { confidential: true } },
    );
    const output = debug.mock.calls.map((call) => call.join(" ")).join("\n");
    expect(output).not.toContain(token);
    expect(output).toContain("[REDACTED]");
    expect(output).toContain("/projects/1/issues");
    expect(output).toContain("confidential");
    expect(output).toContain("Retry failed ACH settlements");
  });

  test("never logs a webhook secret or a private_token param or query value", async () => {
    const { logger, debug } = fakeLogger();
    nock(GITLAB_URL).post("/api/v4/projects/1/hooks").query(true).reply(201, {
      id: 5,
      url: "https://hooks.example.com",
      token: "echoed-hook-secret",
    });
    const client = createGitlabClient(accessTokenConnection, logger);
    await client.post(
      "/projects/1/hooks?private_token=url-query-token&per_page=5",
      {
        url: "https://hooks.example.com",
        token: "hook-secret-value",
        nested: [{ Client_Secret: "nested-client-secret" }],
      },
      {
        params: { private_token: "param-token", access_token: "param-access" },
      },
    );
    const output = debug.mock.calls.map((call) => call.join(" ")).join("\n");
    for (const secret of [
      "hook-secret-value",
      "echoed-hook-secret",
      "nested-client-secret",
      "url-query-token",
      "param-token",
      "param-access",
    ]) {
      expect(output).not.toContain(secret);
    }
    expect(output).toContain("per_page=5");
    expect(output).toContain("https://hooks.example.com");
  });

  test("redacts a copy and sends the real secret", async () => {
    const { logger } = fakeLogger();
    const body = {
      url: "https://hooks.example.com",
      token: "hook-secret-value",
    };
    const scope = nock(GITLAB_URL)
      .post("/api/v4/projects/1/hooks", (b) => b.token === "hook-secret-value")
      .query({ private_token: "param-token" })
      .reply(201, { id: 5 });
    await createGitlabClient(accessTokenConnection, logger).post(
      "/projects/1/hooks",
      body,
      { params: { private_token: "param-token" } },
    );
    expect(scope.isDone()).toBe(true);
    expect(body.token).toBe("hook-secret-value");
  });

  test("summarizes a request body over 10 KB instead of logging it", async () => {
    const { logger, debug } = fakeLogger();
    nock(GITLAB_URL).post("/api/v4/projects/1/issues").reply(201, { id: 1 });
    const client = createGitlabClient(accessTokenConnection, logger);
    await client.post("/projects/1/issues", {
      description: "x".repeat(11_000),
    });
    const output = debug.mock.calls.map((call) => call.join(" ")).join("\n");
    expect(output).toMatch(/<data \(\d+ bytes\)>/);
    expect(output).not.toContain("x".repeat(11_000));
  });

  test("logs nothing to the console", async () => {
    const consoleLog = vi
      .spyOn(console, "log")
      .mockImplementation(() => undefined);
    const { logger } = fakeLogger();
    nock(GITLAB_URL).get("/api/v4/user").reply(200, { id: 1 });
    await createGitlabClient(accessTokenConnection, logger).get("/user");
    expect(consoleLog).not.toHaveBeenCalled();
    consoleLog.mockRestore();
  });

  test("logs nothing when debug is off", async () => {
    const consoleLog = vi
      .spyOn(console, "log")
      .mockImplementation(() => undefined);
    nock(GITLAB_URL).get("/api/v4/user").reply(200, { id: 1 });
    await createGitlabClient(accessTokenConnection, false).get("/user");
    expect(consoleLog).not.toHaveBeenCalled();
    consoleLog.mockRestore();
  });
});
