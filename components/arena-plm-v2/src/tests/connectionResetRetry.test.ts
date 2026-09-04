import * as http from "node:http";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createArenaClient } from "../client";
import { arenaApiKey, arenaOAuth, arenaUsernamePassword } from "../connections";
import { createTestContext } from "./testContext";
jest.setTimeout(10000);
describe("connection reset retry", () => {
  let server: http.Server;
  let serverPort: number;
  let resetResponses: number;
  let resourceRequests: number;
  beforeAll(async () => {
    server = http.createServer((req, res) => {
      if (req.url === "/v1/login") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ arena_session_id: "session-1" }));
        return;
      }
      resourceRequests += 1;
      if (resourceRequests <= resetResponses) {
        req.socket.destroy();
        return;
      }
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ results: [], count: 0 }));
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
    resetResponses = 0;
    resourceRequests = 0;
  });
  const baseFields = () => ({
    baseUrl: "custom",
    customBaseUrl: `http://127.0.0.1:${serverPort}`,
    timeout: "3000",
  });
  it("retries once for an OAuth connection, whose token the platform owns", async () => {
    resetResponses = 1;
    const client = await createArenaClient(
      createTestContext(),
      createConnection(
        arenaOAuth,
        { ...baseFields(), tokenUrl: "http://127.0.0.1/token" },
        { access_token: "platform-token" },
      ),
    );
    const response = await client.get("/items");
    expect(response.status).toBe(200);
    expect(resourceRequests).toBe(2);
  });
  it("retries once for an API key connection, whose credential cannot be renewed", async () => {
    resetResponses = 1;
    const client = await createArenaClient(
      createTestContext(),
      createConnection(arenaApiKey, {
        ...baseFields(),
        apiKey: "fake-api-key",
      }),
    );
    const response = await client.get("/items");
    expect(response.status).toBe(200);
    expect(resourceRequests).toBe(2);
  });
  it("retries once for a username/password connection", async () => {
    resetResponses = 1;
    const client = await createArenaClient(
      createTestContext(),
      createConnection(arenaUsernamePassword, {
        ...baseFields(),
        email: "test@example.com",
        password: "test-password",
      }),
    );
    const response = await client.get("/items");
    expect(response.status).toBe(200);
    expect(resourceRequests).toBe(2);
  });
  it("gives up after a single retry when the reset repeats", async () => {
    resetResponses = 2;
    const client = await createArenaClient(
      createTestContext(),
      createConnection(
        arenaOAuth,
        { ...baseFields(), tokenUrl: "http://127.0.0.1/token" },
        { access_token: "platform-token" },
      ),
    );
    await expect(client.get("/items")).rejects.toBeDefined();
    expect(resourceRequests).toBe(2);
  });
});
