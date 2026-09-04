import nock from "nock";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ORG_BASE_URL } from "../../constants";
import { createMockConnection, createMockContext } from "../../testHelpers";
vi.mock("../../client", () => ({
  getWebApiUrl: vi.fn().mockResolvedValue(`${ORG_BASE_URL}/api/data/v9.2/`),
  createCrmClient: vi.fn(),
}));
vi.mock("../../util", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    paginateListEntities: vi.fn().mockResolvedValue({
      data: {
        value: [{ name: "accounts", kind: "EntitySet", url: "accounts" }],
      },
    }),
  };
});
import { listEntities } from "./listEntities";
const conn = createMockConnection();
const ctx = createMockContext();
const API_BASE = `${ORG_BASE_URL}/api/data/v9.2`;
describe("listEntities", () => {
  afterEach(() => {
    nock.cleanAll();
    vi.clearAllMocks();
  });
  test("happy path returns entity set list", async () => {
    const apiResponse = {
      value: [
        { name: "accounts", kind: "EntitySet", url: "accounts" },
        { name: "contacts", kind: "EntitySet", url: "contacts" },
      ],
    };
    nock(API_BASE).get("/").reply(200, apiResponse);
    const result = await listEntities.perform(ctx, {
      connection: conn,
      fetchAll: false,
      pagination: { maxPageSize: 5000, nextLink: undefined },
    } as any);
    expect(result.data.entities).toHaveLength(2);
    expect(result.data.entities[0].name).toBe("accounts");
  });
  test("error path surfaces the failure", async () => {
    nock(API_BASE).get("/").reply(404, { error: "not found" });
    await expect(
      listEntities.perform(ctx, {
        connection: conn,
        fetchAll: false,
        pagination: { maxPageSize: 5000, nextLink: undefined },
      } as any),
    ).rejects.toThrow();
  });
});
