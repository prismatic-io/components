import { afterEach, describe, expect, test, vi } from "vitest";
import { fetchXmlExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockFetch } = vi.hoisted(() => ({ mockFetch: vi.fn() }));
vi.mock("../../client", () => ({
  createCrmClient: vi.fn().mockResolvedValue({ fetch: mockFetch }),
}));
vi.mock("../../util", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    paginateFetchXml: vi
      .fn()
      .mockResolvedValue({ data: fetchXmlExamplePayload.data }),
  };
});
import { fetchXml } from "./fetchXml";
const conn = createMockConnection();
const ctx = createMockContext();
describe("fetchXml", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns query results", async () => {
    mockFetch.mockResolvedValueOnce(fetchXmlExamplePayload.data);
    const result = await fetchXml.perform(ctx, {
      entityType: "accounts",
      xmlQuery:
        '<fetch><entity name="account"><attribute name="name"/></entity></fetch>',
      includeAnnotations: undefined,
      pagination: { pageNumber: undefined, nextPageId: undefined },
      impersonateUserId: undefined,
      fetchAll: false,
      connection: conn,
    } as any);
    expect(result.data).toEqual(fetchXmlExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Invalid XML"));
    await expect(
      fetchXml.perform(ctx, {
        entityType: "accounts",
        xmlQuery: "<invalid>",
        includeAnnotations: undefined,
        pagination: { pageNumber: undefined, nextPageId: undefined },
        impersonateUserId: undefined,
        fetchAll: false,
        connection: conn,
      } as any),
    ).rejects.toThrow("Invalid XML");
  });
});
