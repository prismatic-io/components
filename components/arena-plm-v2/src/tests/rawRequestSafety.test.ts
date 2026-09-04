import * as http from "node:http";
import { createConnection, invoke } from "@prismatic-io/spectral/dist/testing";
import { rawRequest } from "../actions/misc/rawRequest";
import { arenaApiKey } from "../connections";
import { type CapturedLog, createTestContext } from "./testContext";
jest.setTimeout(10000);
type RawRequestParams = Parameters<typeof rawRequest.perform>[1];
const allLogText = (logs: CapturedLog[]) =>
  logs
    .map((entry) => `${entry.level} ${entry.args.map(serialize).join(" ")}`)
    .join("\n");
const serialize = (value: unknown) => {
  if (typeof value === "string") {
    return value;
  }
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
};
describe("Raw Request logging", () => {
  let arena: http.Server;
  let arenaPort: number;
  beforeAll(async () => {
    arena = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok" }));
    });
    await new Promise<void>((resolve) => arena.listen(0, "127.0.0.1", resolve));
    arenaPort = (
      arena.address() as {
        port: number;
      }
    ).port;
  });
  afterAll(async () => {
    await new Promise<void>((resolve, reject) =>
      arena.close((err) => (err ? reject(err) : resolve())),
    );
  });
  const params = (
    overrides: Partial<RawRequestParams> = {},
  ): RawRequestParams => ({
    connection: createConnection(arenaApiKey, {
      baseUrl: "custom",
      customBaseUrl: `http://127.0.0.1:${arenaPort}`,
      apiKey: "fake-api-key",
      timeout: "3000",
    }),
    endpoint: "/items",
    httpMethod: "GET",
    jsonPayload: undefined,
    formData: undefined,
    fileData: undefined,
    queryParameters: undefined,
    additionalHeaders: undefined,
    responseType: "json",
    ...overrides,
  });
  const run = (overrides: Partial<RawRequestParams> = {}) => {
    const context = createTestContext();
    return invoke(rawRequest, params(overrides), {
      logger: context.logger,
      executionState: context.executionState,
    }).then((invocation) => ({ ...invocation, logs: context.logs }));
  };
  it("never writes a password from the request body to any log", async () => {
    const { logs } = await run({
      endpoint: "/login",
      httpMethod: "POST",
      jsonPayload: {
        email: "builder@example.com",
        password: "sup3r-s3cret-pw",
      },
    });
    expect(allLogText(logs)).not.toContain("sup3r-s3cret-pw");
  });
  it("never writes a user-supplied Authorization header to any log", async () => {
    const { logs } = await run({
      additionalHeaders: [
        { key: "Authorization", value: "Bearer leaked-token-value" },
        { key: "arena_session_id", value: "leaked-session-id" },
      ],
    });
    const logged = allLogText(logs);
    expect(logged).not.toContain("leaked-token-value");
    expect(logged).not.toContain("leaked-session-id");
  });
  it("never writes a query parameter value to any log", async () => {
    const { logs } = await run({
      queryParameters: [{ key: "token", value: "leaked-query-token" }],
    });
    expect(allLogText(logs)).not.toContain("leaked-query-token");
  });
  it("still reports the endpoint and method so the call stays diagnosable", async () => {
    const { logs } = await run();
    const logged = allLogText(logs);
    expect(logged).toContain("/items");
    expect(logged).toContain("GET");
  });
});
describe("Raw Request endpoint scoping", () => {
  let arena: http.Server;
  let arenaPort: number;
  let attacker: http.Server;
  let attackerPort: number;
  let attackerHits: string[] = [];
  beforeAll(async () => {
    arena = http.createServer((_req, res) => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ status: "ok" }));
    });
    await new Promise<void>((resolve) => arena.listen(0, "127.0.0.1", resolve));
    arenaPort = (
      arena.address() as {
        port: number;
      }
    ).port;
    attacker = http.createServer((req, res) => {
      attackerHits.push(req.url ?? "");
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end("{}");
    });
    await new Promise<void>((resolve) =>
      attacker.listen(0, "127.0.0.1", resolve),
    );
    attackerPort = (
      attacker.address() as {
        port: number;
      }
    ).port;
  });
  beforeEach(() => {
    attackerHits = [];
  });
  afterAll(async () => {
    for (const server of [arena, attacker]) {
      await new Promise<void>((resolve, reject) =>
        server.close((err) => (err ? reject(err) : resolve())),
      );
    }
  });
  const run = (endpoint: string) => {
    const context = createTestContext();
    return invoke(
      rawRequest,
      {
        connection: createConnection(arenaApiKey, {
          baseUrl: "custom",
          customBaseUrl: `http://127.0.0.1:${arenaPort}`,
          apiKey: "fake-api-key",
          timeout: "3000",
        }),
        endpoint,
        httpMethod: "GET",
        jsonPayload: undefined,
        formData: undefined,
        fileData: undefined,
        queryParameters: undefined,
        additionalHeaders: undefined,
        responseType: "json",
      },
      { logger: context.logger, executionState: context.executionState },
    );
  };
  it("rejects a protocol-relative endpoint instead of requesting another host", async () => {
    await expect(run(`//127.0.0.1:${attackerPort}/collect`)).rejects.toThrow();
    expect(attackerHits).toEqual([]);
  });
  it("rejects an endpoint carrying an explicit scheme", async () => {
    await expect(
      run(`http://127.0.0.1:${attackerPort}/collect`),
    ).rejects.toThrow();
    expect(attackerHits).toEqual([]);
  });
  it("still accepts an ordinary relative endpoint", async () => {
    const { result } = await run("items");
    expect(result.data.statusCode).toBe(200);
    expect(attackerHits).toEqual([]);
  });
  it("still accepts a relative endpoint already carrying a leading slash", async () => {
    const { result } = await run("/items");
    expect(result.data.statusCode).toBe(200);
    expect(attackerHits).toEqual([]);
  });
});
