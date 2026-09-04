import { afterEach, describe, expect, test, vi } from "vitest";
import { queryAttributesExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockRetrieveAttributes } = vi.hoisted(() => ({
  mockRetrieveAttributes: vi.fn(),
}));
vi.mock("../../client", () => ({
  createCrmClient: vi
    .fn()
    .mockResolvedValue({ retrieveAttributes: mockRetrieveAttributes }),
}));
import { queryAttributes } from "./queryAttributes";
const conn = createMockConnection();
const ctx = createMockContext();
describe("queryAttributes", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns attributes", async () => {
    mockRetrieveAttributes.mockResolvedValueOnce(
      queryAttributesExamplePayload.data,
    );
    const result = await queryAttributes.perform(ctx, {
      connection: conn,
      entityId: "id-1",
      attributeType: "String",
      fieldNames: ["LogicalName"],
      filterExpression: undefined,
      expandPropertyNames: undefined,
    } as any);
    expect(result.data).toEqual(queryAttributesExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    mockRetrieveAttributes.mockRejectedValueOnce(new Error("SDK error"));
    await expect(
      queryAttributes.perform(ctx, {
        connection: conn,
        entityId: "id-1",
        attributeType: "String",
        fieldNames: undefined,
        filterExpression: undefined,
        expandPropertyNames: undefined,
      } as any),
    ).rejects.toThrow("SDK error");
  });
});
