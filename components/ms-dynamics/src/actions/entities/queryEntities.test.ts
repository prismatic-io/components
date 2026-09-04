import { afterEach, describe, expect, test, vi } from "vitest";
import { queryEntitiesExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockRetrieveMultiple } = vi.hoisted(() => ({
  mockRetrieveMultiple: vi.fn(),
}));
vi.mock("../../client", () => ({
  createCrmClient: vi.fn().mockResolvedValue({
    retrieveMultiple: mockRetrieveMultiple,
  }),
}));
vi.mock("../../util", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    paginateQueryEntities: vi
      .fn()
      .mockResolvedValue({ data: queryEntitiesExamplePayload.data }),
  };
});
import { queryEntities } from "./queryEntities";
const conn = createMockConnection();
const ctx = createMockContext();
describe("queryEntities", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns query results", async () => {
    mockRetrieveMultiple.mockResolvedValueOnce(
      queryEntitiesExamplePayload.data,
    );
    const result = await queryEntities.perform(ctx, {
      entityType: "accounts",
      fieldNames: ["name"],
      filterExpression: undefined,
      orderByFieldNames: undefined,
      expandPropertyNames: undefined,
      recordsPerPage: 100,
      nextPageId: undefined,
      fetchAll: false,
      connection: conn,
    } as any);
    expect(
      (
        result as {
          data: {
            value: unknown[];
          };
        }
      ).data.value,
    ).toEqual(queryEntitiesExamplePayload.data.value);
  });
  test("error path surfaces the failure", async () => {
    mockRetrieveMultiple.mockRejectedValueOnce(new Error("SDK error"));
    await expect(
      queryEntities.perform(ctx, {
        entityType: "accounts",
        fieldNames: undefined,
        filterExpression: undefined,
        orderByFieldNames: undefined,
        expandPropertyNames: undefined,
        recordsPerPage: 100,
        nextPageId: undefined,
        fetchAll: false,
        connection: conn,
      } as any),
    ).rejects.toThrow("SDK error");
  });
});
