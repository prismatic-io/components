import { afterEach, describe, expect, test, vi } from "vitest";
import { batchEntityActionsExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const {
  mockStartBatch,
  mockCreate,
  mockUpdate,
  mockDeleteRecord,
  mockExecuteBatch,
} = vi.hoisted(() => ({
  mockStartBatch: vi.fn(),
  mockCreate: vi.fn(),
  mockUpdate: vi.fn(),
  mockDeleteRecord: vi.fn(),
  mockExecuteBatch: vi.fn(),
}));
vi.mock("../../client", () => ({
  createCrmClient: vi.fn().mockResolvedValue({
    startBatch: mockStartBatch,
    create: mockCreate,
    update: mockUpdate,
    deleteRecord: mockDeleteRecord,
    executeBatch: mockExecuteBatch,
  }),
}));
import { batchEntityActions } from "./batchEntityActions";
const conn = createMockConnection();
const ctx = createMockContext();
describe("batchEntityActions", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path executes batch and returns results", async () => {
    mockExecuteBatch.mockResolvedValueOnce(
      batchEntityActionsExamplePayload.data,
    );
    const actions = [
      {
        collection: "accounts",
        action: "create" as const,
        data: { name: "test" },
        returnRepresentation: true,
      },
      {
        collection: "accounts",
        action: "update" as const,
        key: "abc",
        data: { name: "updated" },
        returnRepresentation: false,
      },
      { collection: "accounts", action: "delete" as const, key: "def" },
    ];
    const result = await batchEntityActions.perform(ctx, {
      connection: conn,
      actions,
    } as any);
    expect(mockStartBatch).toHaveBeenCalledOnce();
    expect(mockCreate).toHaveBeenCalledOnce();
    expect(mockUpdate).toHaveBeenCalledOnce();
    expect(mockDeleteRecord).toHaveBeenCalledOnce();
    expect(mockExecuteBatch).toHaveBeenCalledOnce();
    expect(result.data).toEqual(batchEntityActionsExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    mockExecuteBatch.mockRejectedValueOnce(new Error("Batch failed"));
    await expect(
      batchEntityActions.perform(ctx, {
        connection: conn,
        actions: [
          {
            collection: "accounts",
            action: "create" as const,
            data: { name: "test" },
          },
        ],
      } as any),
    ).rejects.toThrow("Batch failed");
  });
});
