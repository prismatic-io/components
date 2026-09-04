import { afterEach, describe, expect, test, vi } from "vitest";
import { getEntityMetaDataExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockRetrieveEntity } = vi.hoisted(() => ({
  mockRetrieveEntity: vi.fn(),
}));
vi.mock("../../client", () => ({
  createCrmClient: vi
    .fn()
    .mockResolvedValue({ retrieveEntity: mockRetrieveEntity }),
}));
import { getEntityMetaData } from "./getEntityMetaData";
const conn = createMockConnection();
const ctx = createMockContext();
describe("getEntityMetaData", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns entity definition", async () => {
    mockRetrieveEntity.mockResolvedValueOnce(
      getEntityMetaDataExamplePayload.data.result,
    );
    const result = await getEntityMetaData.perform(ctx, {
      entityType: "account",
      connection: conn,
      lookupField: true,
    } as any);
    expect(result.data.result).toEqual(
      getEntityMetaDataExamplePayload.data.result,
    );
    expect(mockRetrieveEntity).toHaveBeenCalledWith({
      key: "LogicalName='account'",
    });
  });
  test("error path surfaces the failure", async () => {
    mockRetrieveEntity.mockRejectedValueOnce(new Error("Entity not found"));
    await expect(
      getEntityMetaData.perform(ctx, {
        entityType: "nonexistent",
        connection: conn,
        lookupField: true,
      } as any),
    ).rejects.toThrow("Entity not found");
  });
});
