import { afterEach, describe, expect, test, vi } from "vitest";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockUpdateAttribute } = vi.hoisted(() => ({
  mockUpdateAttribute: vi.fn(),
}));
vi.mock("../../client", () => ({
  createCrmClient: vi
    .fn()
    .mockResolvedValue({ updateAttribute: mockUpdateAttribute }),
}));
import { updateAttribute } from "./updateAttribute";
const conn = createMockConnection();
const ctx = createMockContext();
describe("updateAttribute", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns empty object on success", async () => {
    mockUpdateAttribute.mockResolvedValueOnce({});
    const result = await updateAttribute.perform(ctx, {
      connection: conn,
      entityId: "id-1",
      attributeBody: { SchemaName: "updated_field" },
    } as any);
    expect(result.data).toEqual({});
  });
  test("error path surfaces the failure", async () => {
    mockUpdateAttribute.mockRejectedValueOnce(new Error("Update failed"));
    await expect(
      updateAttribute.perform(ctx, {
        connection: conn,
        entityId: "id-1",
        attributeBody: {},
      } as any),
    ).rejects.toThrow("Update failed");
  });
});
