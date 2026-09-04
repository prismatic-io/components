import * as http from "node:http";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createArenaClient } from "../client";
import { arenaApiKey, arenaOAuth, arenaUsernamePassword } from "../connections";
import { createTestContext } from "./testContext";
jest.setTimeout(10000);
describe("credential expiry re-authentication", () => {
  let server: http.Server;
  let serverPort: number;
  let loginCount: number;
  let resourceRequests: {
    sessionId?: string;
    authorization?: string;
  }[];
  let unauthorizedResponses: number;
  beforeAll(async () => {
    server = http.createServer((req, res) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        if (req.url === "/v1/login") {
          loginCount += 1;
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(
            JSON.stringify({ arena_session_id: `session-${loginCount}` }),
          );
          return;
        }
        resourceRequests.push({
          sessionId: req.headers.arena_session_id as string | undefined,
          authorization: req.headers.authorization,
        });
        if (resourceRequests.length <= unauthorizedResponses) {
          res.writeHead(401, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ errors: [{ message: "Session expired" }] }));
          return;
        }
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ results: [], count: 0 }));
      });
    });
    await new Promise<void>((resolve) =>
      server.listen(0, "127.0.0.1", resolve),
    );
    serverPort = (
      server.address() as {
        port: number;
      }
    ).port;
  });
  afterAll(async () => {
    await new Promise<void>((resolve, reject) =>
      server.close((err) => (err ? reject(err) : resolve())),
    );
  });
  beforeEach(() => {
    loginCount = 0;
    resourceRequests = [];
    unauthorizedResponses = 0;
  });
  it("re-authenticates and retries once when the session has expired", async () => {
    unauthorizedResponses = 1;
    const context = createTestContext();
    const client = await createArenaClient(
      context,
      createConnection(arenaUsernamePassword, {
        baseUrl: "custom",
        customBaseUrl: `http://127.0.0.1:${serverPort}`,
        email: "test@example.com",
        password: "test-password",
        timeout: "3000",
      }),
    );
    const response = await client.get("/items");
    expect(response.status).toBe(200);
    expect(loginCount).toBe(2);
    expect(resourceRequests).toHaveLength(2);
    expect(resourceRequests[0].sessionId).toBe("session-1");
    expect(resourceRequests[1].sessionId).toBe("session-2");
  });
  it("gives up after a single retry when re-authentication keeps failing", async () => {
    unauthorizedResponses = 2;
    const context = createTestContext();
    const client = await createArenaClient(
      context,
      createConnection(arenaUsernamePassword, {
        baseUrl: "custom",
        customBaseUrl: `http://127.0.0.1:${serverPort}`,
        email: "test@example.com",
        password: "test-password",
        timeout: "3000",
      }),
    );
    await expect(client.get("/items")).rejects.toBeDefined();
    expect(resourceRequests).toHaveLength(2);
  });
  it("does not retry an API key connection, whose credential cannot be renewed", async () => {
    unauthorizedResponses = 1;
    const context = createTestContext();
    const client = await createArenaClient(
      context,
      createConnection(arenaApiKey, {
        baseUrl: "custom",
        customBaseUrl: `http://127.0.0.1:${serverPort}`,
        apiKey: "fake-api-key",
        timeout: "3000",
      }),
    );
    await expect(client.get("/items")).rejects.toBeDefined();
    expect(resourceRequests).toHaveLength(1);
    expect(loginCount).toBe(0);
  });
  it("does not retry an OAuth connection, whose token the platform refreshes", async () => {
    unauthorizedResponses = 1;
    const context = createTestContext();
    const client = await createArenaClient(
      context,
      createConnection(
        arenaOAuth,
        {
          baseUrl: "custom",
          customBaseUrl: `http://127.0.0.1:${serverPort}`,
          tokenUrl: "http://127.0.0.1/token",
          timeout: "3000",
        },
        { access_token: "platform-token" },
      ),
    );
    await expect(client.get("/items")).rejects.toBeDefined();
    expect(resourceRequests).toHaveLength(1);
    expect(loginCount).toBe(0);
  });
  it("sends the platform-issued OAuth token as a bearer credential", async () => {
    const context = createTestContext();
    const client = await createArenaClient(
      context,
      createConnection(
        arenaOAuth,
        {
          baseUrl: "custom",
          customBaseUrl: `http://127.0.0.1:${serverPort}`,
          tokenUrl: "http://127.0.0.1/token",
          timeout: "3000",
        },
        { access_token: "platform-token" },
      ),
    );
    await client.get("/items");
    expect(resourceRequests[0].authorization).toBe("Bearer platform-token");
    expect(loginCount).toBe(0);
  });
  it("rejects an OAuth connection that carries no access token", async () => {
    const context = createTestContext();
    await expect(
      createArenaClient(
        context,
        createConnection(arenaOAuth, {
          baseUrl: "custom",
          customBaseUrl: `http://127.0.0.1:${serverPort}`,
          tokenUrl: "http://127.0.0.1/token",
          timeout: "3000",
        }),
      ),
    ).rejects.toThrow(/does not contain a valid OAuth access token/);
  });
  it("reuses the persisted session instead of logging in again", async () => {
    const context = createTestContext();
    const connection = createConnection(arenaUsernamePassword, {
      baseUrl: "custom",
      customBaseUrl: `http://127.0.0.1:${serverPort}`,
      email: "test@example.com",
      password: "test-password",
      timeout: "3000",
    });
    await createArenaClient(context, connection);
    await createArenaClient(context, connection);
    expect(loginCount).toBe(1);
  });
});
