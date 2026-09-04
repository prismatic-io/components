import { afterEach, describe, expect, test, vi } from "vitest";
import { updateEntityExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockUpdate } = vi.hoisted(() => ({ mockUpdate: vi.fn() }));
vi.mock("../../client", () => ({
  createCrmClient: vi.fn().mockResolvedValue({ update: mockUpdate }),
}));
import { updateEntity } from "./updateEntity";
const conn = createMockConnection();
const ctx = createMockContext();
describe("updateEntity", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns updated entity", async () => {
    mockUpdate.mockResolvedValueOnce(updateEntityExamplePayload.data);
    const result = await updateEntity.perform(ctx, {
      entityType: "accounts",
      entityId: "f1a2b3c4-d5e6-4789-a012-3456789abcde",
      fieldValues: { name: "Contoso Ltd. (Updated)" },
      dynamicValues: {},
      connection: conn,
    } as any);
    expect(result.data).toEqual(updateEntityExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    mockUpdate.mockRejectedValueOnce(new Error("Entity not found"));
    await expect(
      updateEntity.perform(ctx, {
        entityType: "accounts",
        entityId: "bad-id",
        fieldValues: {},
        dynamicValues: {},
        connection: conn,
      } as any),
    ).rejects.toThrow("Entity not found");
  });
});
