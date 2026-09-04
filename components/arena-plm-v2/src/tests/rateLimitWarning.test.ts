import * as http from "node:http";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { createArenaClient } from "../client";
import { arenaApiKey } from "../connections";
import { createTestContext } from "./testContext";
jest.setTimeout(10000);
describe("Arena rate-limit quota warning", () => {
  let server: http.Server;
  let serverPort: number;
  let remainingHeader: string | undefined;
  beforeAll(async () => {
    server = http.createServer((_req, res) => {
      const headers: http.OutgoingHttpHeaders = {
        "Content-Type": "application/json",
        "X-Arena-Next-Request-Limit-Reset": "2026-07-29T00:00:00Z",
      };
      if (remainingHeader !== undefined) {
        headers["X-Arena-Requests-Remaining"] = remainingHeader;
      }
      res.writeHead(200, headers);
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
  const buildConnection = () =>
    createConnection(arenaApiKey, {
      baseUrl: "custom",
      customBaseUrl: `http://127.0.0.1:${serverPort}`,
      apiKey: "fake-api-key",
      timeout: "3000",
    });
  it("warns when the remaining quota is at or below the threshold", async () => {
    remainingHeader = "50";
    const context = createTestContext();
    const client = await createArenaClient(context, buildConnection());
    await client.get("/items");
    const warnings = context.logs.filter((l) => l.level === "warn");
    expect(warnings).toHaveLength(1);
    expect(String(warnings[0].args[0])).toContain("50 requests remaining");
    expect(String(warnings[0].args[0])).toContain("2026-07-29T00:00:00Z");
  });
  it("stays silent when plenty of quota remains", async () => {
    remainingHeader = "900";
    const context = createTestContext();
    const client = await createArenaClient(context, buildConnection());
    await client.get("/items");
    expect(context.logs.filter((l) => l.level === "warn")).toHaveLength(0);
  });
  it("stays silent and does not fail the request when the header is absent", async () => {
    remainingHeader = undefined;
    const context = createTestContext();
    const client = await createArenaClient(context, buildConnection());
    const response = await client.get("/items");
    expect(response.status).toBe(200);
    expect(context.logs.filter((l) => l.level === "warn")).toHaveLength(0);
  });
  it("does not fail the request when the header is malformed", async () => {
    remainingHeader = "not-a-number";
    const context = createTestContext();
    const client = await createArenaClient(context, buildConnection());
    const response = await client.get("/items");
    expect(response.status).toBe(200);
    expect(context.logs.filter((l) => l.level === "warn")).toHaveLength(0);
  });
});
