import { afterEach, describe, expect, test, vi } from "vitest";
import { getEntityExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockRetrieve } = vi.hoisted(() => ({ mockRetrieve: vi.fn() }));
vi.mock("../../client", () => ({
  createCrmClient: vi.fn().mockResolvedValue({ retrieve: mockRetrieve }),
}));
import { getEntity } from "./getEntity";
const conn = createMockConnection();
const ctx = createMockContext();
describe("getEntity", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns entity data", async () => {
    mockRetrieve.mockResolvedValueOnce(getEntityExamplePayload.data);
    const result = await getEntity.perform(ctx, {
      entityType: "accounts",
      entityId: "f1a2b3c4-d5e6-4789-a012-3456789abcde",
      fieldNames: ["name"],
      expandPropertyNames: undefined,
      connection: conn,
    } as any);
    expect(result.data).toEqual(getEntityExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    mockRetrieve.mockRejectedValueOnce(new Error("Not Found"));
    await expect(
      getEntity.perform(ctx, {
        entityType: "accounts",
        entityId: "bad-id",
        fieldNames: undefined,
        expandPropertyNames: undefined,
        connection: conn,
      } as any),
    ).rejects.toThrow("Not Found");
  });
});
