import * as http from "node:http";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { fetchArenaList } from "../util/pagination";
jest.setTimeout(10000);
interface Row {
  id: number;
}
const startServer = async (total: number, countMeaning: "total" | "page") => {
  const requests: {
    offset?: string;
    limit?: string;
  }[] = [];
  const server = http.createServer((req, res) => {
    const url = new URL(req.url ?? "", "http://localhost");
    const offset = Number(url.searchParams.get("offset") ?? 0);
    const limit = Number(url.searchParams.get("limit") ?? 20);
    requests.push({
      offset: url.searchParams.get("offset") ?? undefined,
      limit: url.searchParams.get("limit") ?? undefined,
    });
    const rows: Row[] = [];
    for (let i = offset; i < Math.min(offset + limit, total); i++) {
      rows.push({ id: i });
    }
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        results: rows,
        count: countMeaning === "total" ? total : rows.length,
      }),
    );
  });
  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
  const { port } = server.address() as {
    port: number;
  };
  return {
    requests,
    client: createClient({ baseUrl: `http://127.0.0.1:${port}` }),
    close: () =>
      new Promise<void>((resolve, reject) =>
        server.close((err) => (err ? reject(err) : resolve())),
      ),
  };
};
describe("fetchArenaList — single page", () => {
  it("makes one request and returns Arena's envelope untouched", async () => {
    const { client, requests, close } = await startServer(950, "total");
    try {
      const result = await fetchArenaList<Row>(client, "/items", {
        limit: 25,
        offset: 100,
      });
      expect(requests).toHaveLength(1);
      expect(requests[0]).toEqual({ offset: "100", limit: "25" });
      expect(result.results).toHaveLength(25);
      expect(result.results[0]).toEqual({ id: 100 });
      expect(result.count).toBe(950);
    } finally {
      await close();
    }
  });
  it("omits limit and offset when the user set neither", async () => {
    const { client, requests, close } = await startServer(10, "total");
    try {
      await fetchArenaList<Row>(client, "/items", {
        limit: undefined,
        offset: undefined,
      });
      expect(requests[0]).toEqual({ offset: undefined, limit: undefined });
    } finally {
      await close();
    }
  });
});
describe("fetchArenaList — fetch all", () => {
  it.each([
    "total",
    "page",
  ] as const)("sweeps every page when count means %s", async (countMeaning) => {
    const { client, requests, close } = await startServer(950, countMeaning);
    try {
      const result = await fetchArenaList<Row>(
        client,
        "/items",
        { limit: 25, offset: undefined },
        true,
      );
      expect(requests).toEqual([
        { offset: "0", limit: "400" },
        { offset: "400", limit: "400" },
        { offset: "800", limit: "400" },
      ]);
      expect(result.results).toHaveLength(950);
      expect(result.results[0]).toEqual({ id: 0 });
      expect(result.results[949]).toEqual({ id: 949 });
      expect(result.count).toBe(950);
    } finally {
      await close();
    }
  });
  it("starts from the offset the user supplied", async () => {
    const { client, requests, close } = await startServer(500, "total");
    try {
      const result = await fetchArenaList<Row>(
        client,
        "/items",
        { offset: 450 },
        true,
      );
      expect(requests).toEqual([{ offset: "450", limit: "400" }]);
      expect(result.results).toHaveLength(50);
      expect(result.results[0]).toEqual({ id: 450 });
    } finally {
      await close();
    }
  });
  it("stops on an exact page boundary without looping forever", async () => {
    const { client, requests, close } = await startServer(800, "total");
    try {
      const result = await fetchArenaList<Row>(client, "/items", {}, true);
      expect(requests).toHaveLength(3);
      expect(result.results).toHaveLength(800);
    } finally {
      await close();
    }
  });
  it("returns an empty envelope when nothing matches", async () => {
    const { client, requests, close } = await startServer(0, "total");
    try {
      const result = await fetchArenaList<Row>(client, "/items", {}, true);
      expect(requests).toHaveLength(1);
      expect(result).toEqual({ results: [], count: 0 });
    } finally {
      await close();
    }
  });
});
