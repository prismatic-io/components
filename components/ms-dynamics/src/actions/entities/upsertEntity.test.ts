import { afterEach, describe, expect, test, vi } from "vitest";
import { upsertEntityExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockUpsert } = vi.hoisted(() => ({ mockUpsert: vi.fn() }));
vi.mock("../../client", () => ({
  createCrmClient: vi.fn().mockResolvedValue({ upsert: mockUpsert }),
}));
import { upsertEntity } from "./upsertEntity";
const conn = createMockConnection();
const ctx = createMockContext();
describe("upsertEntity", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns upserted entity", async () => {
    mockUpsert.mockResolvedValueOnce(upsertEntityExamplePayload.data);
    const result = await upsertEntity.perform(ctx, {
      entityType: "accounts",
      entityId: "f1a2b3c4-d5e6-4789-a012-3456789abcde",
      fieldValues: { name: "Contoso Ltd." },
      dynamicValues: {},
      connection: conn,
    } as any);
    expect(result.data).toEqual(upsertEntityExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    mockUpsert.mockRejectedValueOnce(new Error("Conflict"));
    await expect(
      upsertEntity.perform(ctx, {
        entityType: "accounts",
        entityId: "bad-id",
        fieldValues: {},
        dynamicValues: {},
        connection: conn,
      } as any),
    ).rejects.toThrow("Conflict");
  });
});
