import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { runWqlQueryExamplePayload } from "../../examplePayloads";
import {
  mockTokenExchange,
  oauthTestConnection,
  refreshTokenTestConnection,
  TEST_HOST,
} from "../../testHelpers";
import { clearTokenCache } from "../../util";
import { runWqlQuery } from "./runWqlQuery";
const QUERY = "SELECT worker, fullName FROM allWorkers";
beforeAll(() => nock.disableNetConnect());
afterAll(() => nock.enableNetConnect());
beforeEach(() => clearTokenCache());
afterEach(() => {
  expect(nock.isDone()).toBe(true);
  nock.cleanAll();
});
describe("runWqlQuery", () => {
  it("runs a short query with GET against the connection's tenant", async () => {
    mockTokenExchange();
    nock(TEST_HOST)
      .get("/ccx/api/wql/v1/acme/data")
      .query({ query: QUERY, limit: "10", offset: "5" })
      .reply(200, runWqlQueryExamplePayload.data);
    const { result } = await invoke(runWqlQuery, {
      connection: refreshTokenTestConnection(),
      query: QUERY,
      tenant: undefined,
      fetchAll: false,
      pagination: { limit: 10, offset: 5 },
    });
    expect(result).toEqual(runWqlQueryExamplePayload);
  });
  it("runs a long query with POST", async () => {
    const longQuery = `${QUERY} WHERE ${"fullName = 'x' OR ".repeat(120)}fullName = 'y'`;
    nock(TEST_HOST)
      .post("/ccx/api/wql/v1/other/data", { query: longQuery })
      .reply(200, { total: 0, data: [] });
    const { result } = await invoke(runWqlQuery, {
      connection: oauthTestConnection(),
      query: longQuery,
      tenant: "other",
      fetchAll: false,
      pagination: { limit: undefined, offset: undefined },
    });
    expect(result).toEqual({ data: { total: 0, data: [] } });
  });
  it("rejects a long query with a limit or offset before calling Workday", async () => {
    const longQuery = `${QUERY} WHERE ${"fullName = 'x' OR ".repeat(120)}fullName = 'y'`;
    await expect(
      invoke(runWqlQuery, {
        connection: oauthTestConnection(),
        query: longQuery,
        tenant: "acme",
        fetchAll: false,
        pagination: { limit: 10, offset: undefined },
      }),
    ).rejects.toThrow(/2,047 characters.*cannot be paged/);
    await expect(
      invoke(runWqlQuery, {
        connection: oauthTestConnection(),
        query: longQuery,
        tenant: "acme",
        fetchAll: false,
        pagination: { limit: undefined, offset: 20 },
      }),
    ).rejects.toThrow(/2,047 characters.*cannot be paged/);
  });
  it("sends a long query once, without limit or offset, and fails when more rows exist", async () => {
    const longQuery = `${QUERY} WHERE ${"fullName = 'x' OR ".repeat(120)}fullName = 'y'`;
    nock(TEST_HOST)
      .post("/ccx/api/wql/v1/acme/data", { query: longQuery })
      .reply(201, { total: 50, data: [{ n: 1 }, { n: 2 }] });
    await expect(
      invoke(runWqlQuery, {
        connection: oauthTestConnection(),
        query: longQuery,
        tenant: "acme",
        fetchAll: true,
        pagination: { limit: undefined, offset: undefined },
      }),
    ).rejects.toThrow(/returned 2 of 50 rows.*Shorten the query/);
  });
  it("returns a long query's rows when one request holds them all", async () => {
    const longQuery = `${QUERY} WHERE ${"fullName = 'x' OR ".repeat(120)}fullName = 'y'`;
    nock(TEST_HOST)
      .post("/ccx/api/wql/v1/acme/data", { query: longQuery })
      .reply(201, { total: 2, data: [{ n: 1 }, { n: 2 }] });
    const { result } = await invoke(runWqlQuery, {
      connection: oauthTestConnection(),
      query: longQuery,
      tenant: "acme",
      fetchAll: true,
      pagination: { limit: undefined, offset: undefined },
    });
    expect(result).toEqual({
      data: { total: 2, data: [{ n: 1 }, { n: 2 }] },
    });
  });
  it("fails instead of truncating when Workday caches fewer rows than the query matched", async () => {
    const rows = (start: number) =>
      Array.from({ length: 5000 }, (_, i) => ({ n: start + i }));
    nock(TEST_HOST)
      .get("/ccx/api/wql/v1/acme/data")
      .query({ query: QUERY, limit: "5000", offset: "0" })
      .reply(200, { total: 12000, data: rows(0) })
      .get("/ccx/api/wql/v1/acme/data")
      .query({ query: QUERY, limit: "5000", offset: "5000" })
      .reply(200, { total: 12000, data: rows(5000) });
    await expect(
      invoke(runWqlQuery, {
        connection: oauthTestConnection(),
        query: QUERY,
        tenant: "acme",
        fetchAll: true,
        pagination: { limit: 5000, offset: undefined },
      }),
    ).rejects.toThrow(
      /Read 10000 of 12000 rows.*at most 10,000 rows.*WHERE or LIMIT/,
    );
  });
  it("requires a tenant when the connection doesn't include one", async () => {
    await expect(
      invoke(runWqlQuery, {
        connection: oauthTestConnection(),
        query: QUERY,
        tenant: undefined,
        fetchAll: false,
        pagination: { limit: undefined, offset: undefined },
      }),
    ).rejects.toThrow(/Tenant is required/);
  });
  it("fetches every page when Fetch All is enabled", async () => {
    nock(TEST_HOST)
      .get("/ccx/api/wql/v1/acme/data")
      .query({ query: QUERY, limit: "2", offset: "0" })
      .reply(200, { total: 3, data: [{ n: 1 }, { n: 2 }] })
      .get("/ccx/api/wql/v1/acme/data")
      .query({ query: QUERY, limit: "2", offset: "2" })
      .reply(200, { total: 3, data: [{ n: 3 }] });
    const { result } = await invoke(runWqlQuery, {
      connection: oauthTestConnection(),
      query: QUERY,
      tenant: "acme",
      fetchAll: true,
      pagination: { limit: 2, offset: undefined },
    });
    expect(result).toEqual({
      data: { total: 3, data: [{ n: 1 }, { n: 2 }, { n: 3 }] },
    });
  });
  it("keeps paging when Workday returns fewer rows than the requested limit", async () => {
    const rows = (start: number, count: number) =>
      Array.from({ length: count }, (_, i) => ({ n: start + i }));
    nock(TEST_HOST)
      .get("/ccx/api/wql/v1/acme/data")
      .query({ query: QUERY, limit: "1000", offset: "0" })
      .reply(200, { total: 130, data: rows(0, 100) })
      .get("/ccx/api/wql/v1/acme/data")
      .query({ query: QUERY, limit: "1000", offset: "100" })
      .reply(200, { total: 130, data: rows(100, 30) });
    const { result } = await invoke(runWqlQuery, {
      connection: oauthTestConnection(),
      query: QUERY,
      tenant: "acme",
      fetchAll: true,
      pagination: { limit: undefined, offset: undefined },
    });
    expect(result).toEqual({ data: { total: 130, data: rows(0, 130) } });
  });
  it("surfaces a WQL error from Workday", async () => {
    nock(TEST_HOST)
      .get("/ccx/api/wql/v1/acme/data")
      .query(true)
      .reply(400, { error: "Invalid query" });
    await expect(
      invoke(runWqlQuery, {
        connection: oauthTestConnection(),
        query: "SELECT nope",
        tenant: "acme",
        fetchAll: false,
        pagination: { limit: undefined, offset: undefined },
      }),
    ).rejects.toThrow(/400/);
  });
});
