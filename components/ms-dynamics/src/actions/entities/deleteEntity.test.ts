import { afterEach, describe, expect, test, vi } from "vitest";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockDeleteRecord } = vi.hoisted(() => ({ mockDeleteRecord: vi.fn() }));
vi.mock("../../client", () => ({
  createCrmClient: vi
    .fn()
    .mockResolvedValue({ deleteRecord: mockDeleteRecord }),
}));
import { deleteEntity } from "./deleteEntity";
const conn = createMockConnection();
const ctx = createMockContext();
describe("deleteEntity", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns empty object on success", async () => {
    mockDeleteRecord.mockResolvedValueOnce({});
    const result = await deleteEntity.perform(ctx, {
      entityType: "accounts",
      entityId: "f1a2b3c4-d5e6-4789-a012-3456789abcde",
      connection: conn,
    } as any);
    expect(result.data).toEqual({});
  });
  test("error path surfaces the failure", async () => {
    mockDeleteRecord.mockRejectedValueOnce(new Error("Entity not found"));
    await expect(
      deleteEntity.perform(ctx, {
        entityType: "accounts",
        entityId: "bad-id",
        connection: conn,
      } as any),
    ).rejects.toThrow("Entity not found");
  });
});
