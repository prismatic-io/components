import { createServer, type IncomingHttpHeaders, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import type { ActionLogger, Connection } from "@prismatic-io/spectral";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { createDuroClient } from "./client";

const FAKE_TOKEN = "fake-duro-token-do-not-log";
const QUERY = "query { currentUser { id } }";
const FAILING_QUERY = "query { missingComponent { id } }";

let server: Server;
let url: string;
let receivedHeaders: IncomingHttpHeaders | undefined;

beforeAll(async () => {
  server = createServer((req, res) => {
    receivedHeaders = req.headers;
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify(
          body.includes("missingComponent")
            ? { data: null, errors: [{ message: "Component not found" }] }
            : { data: { currentUser: { id: "duro-user-42" } } },
        ),
      );
    });
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  url = `http://127.0.0.1:${(server.address() as AddressInfo).port}/graphql`;
});

afterAll(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

afterEach(() => {
  receivedHeaders = undefined;
  vi.restoreAllMocks();
});

const connection = (): Connection =>
  ({
    key: "duroApiKey",
    fields: { username: FAKE_TOKEN, duroEnvironment: url },
  }) as unknown as Connection;

const createLogger = () =>
  ({
    debug: vi.fn(),
    info: vi.fn(),
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
    metric: vi.fn(),
  }) as unknown as ActionLogger;

const silenceConsole = () =>
  vi.spyOn(console, "log").mockImplementation(() => undefined);

const everythingLogged = (
  logger: ActionLogger,
  consoleLog: ReturnType<typeof vi.spyOn>,
) =>
  JSON.stringify([
    ...Object.values(logger).flatMap(
      (fn) => (fn as ReturnType<typeof vi.fn>).mock.calls,
    ),
    ...consoleLog.mock.calls,
  ]);

const debugLine = (logger: ActionLogger, prefix: string) => {
  const lines = vi
    .mocked(logger.debug)
    .mock.calls.map(([message]) => String(message))
    .filter((message) => message.startsWith(prefix));
  expect(lines).toHaveLength(1);
  return lines[0];
};

describe("createDuroClient debug logging", () => {
  test("logs the GraphQL request body through the logger when debug is on", async () => {
    const logger = createLogger();
    silenceConsole();

    await createDuroClient(connection(), true, logger).request(QUERY);

    expect(debugLine(logger, "Duro GraphQL request:")).toContain("currentUser");
  });

  test("logs the request header names with every value redacted", async () => {
    const logger = createLogger();
    silenceConsole();

    await createDuroClient(connection(), true, logger).request(QUERY);

    const line = debugLine(logger, "Duro GraphQL request:");
    expect(line).toContain('"apiToken":"[REDACTED]"');
    expect(line).toContain('"Content-Type":"[REDACTED]"');
  });

  test("logs the response data when debug is on", async () => {
    const logger = createLogger();
    silenceConsole();

    await createDuroClient(connection(), true, logger).request(QUERY);

    expect(debugLine(logger, "Duro GraphQL response:")).toContain(
      "duro-user-42",
    );
  });

  test("logs the GraphQL errors when the request fails", async () => {
    const logger = createLogger();
    silenceConsole();

    await expect(
      createDuroClient(connection(), true, logger).request(FAILING_QUERY),
    ).rejects.toThrow("Component not found");

    expect(debugLine(logger, "Duro GraphQL response:")).toContain(
      "Component not found",
    );
  });

  test.each([
    ["succeeds", QUERY],
    ["fails", FAILING_QUERY],
  ])("never writes the API token to any log when the request %s", async (_, query) => {
    const logger = createLogger();
    const consoleLog = silenceConsole();

    await createDuroClient(connection(), true, logger)
      .request(query)
      .catch(() => undefined);

    expect(everythingLogged(logger, consoleLog)).not.toContain(FAKE_TOKEN);
  });

  test("still sends the API token to Duro in the apiToken header", async () => {
    silenceConsole();

    await createDuroClient(connection(), true, createLogger()).request(QUERY);

    expect(receivedHeaders?.apitoken).toBe(FAKE_TOKEN);
  });

  test("logs nothing when debug is off", async () => {
    const logger = createLogger();
    const consoleLog = silenceConsole();

    await createDuroClient(connection(), false, logger).request(QUERY);

    expect(everythingLogged(logger, consoleLog)).toBe("[]");
  });
});
