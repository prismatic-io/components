import { createServer, type IncomingHttpHeaders, type Server } from "node:http";
import type { AddressInfo } from "node:net";
import type { Connection } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import { afterAll, afterEach, beforeAll } from "vitest";
import { duroApiKey } from "./connections";

export const TEST_API_KEY = "test-duro-api-key";

export interface CapturedRequest {
  method?: string;
  path?: string;
  headers: IncomingHttpHeaders;
  body: { query?: string; variables?: Record<string, unknown> };
}

export const useGraphqlServer = () => {
  let server: Server;
  let url = "";
  let status = 200;
  let replyBody: unknown = {};
  const requests: CapturedRequest[] = [];

  beforeAll(async () => {
    server = createServer((req, res) => {
      let raw = "";
      req.on("data", (chunk) => {
        raw += chunk;
      });
      req.on("end", () => {
        requests.push({
          method: req.method,
          path: req.url,
          headers: req.headers,
          body: raw ? JSON.parse(raw) : {},
        });
        res.writeHead(status, { "Content-Type": "application/json" });
        res.end(JSON.stringify(replyBody));
      });
    });
    await new Promise<void>((resolve) =>
      server.listen(0, "127.0.0.1", resolve),
    );
    url = `http://127.0.0.1:${(server.address() as AddressInfo).port}/graphql`;
  });

  afterAll(async () => {
    await new Promise<void>((resolve) => server.close(() => resolve()));
  });

  afterEach(() => {
    requests.length = 0;
    status = 200;
    replyBody = {};
  });

  return {
    requests,
    reply: (body: unknown, replyStatus = 200) => {
      replyBody = body;
      status = replyStatus;
    },
    connection: (): Connection =>
      createConnection(duroApiKey, {
        username: TEST_API_KEY,
        duroEnvironment: "",
        customDuroEnvironment: url,
      }) as unknown as Connection,
  };
};
