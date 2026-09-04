import { afterEach, describe, expect, test, vi } from "vitest";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockRetrieveEntities, mockRetrieveAttributes } = vi.hoisted(() => ({
  mockRetrieveEntities: vi.fn(),
  mockRetrieveAttributes: vi.fn(),
}));
vi.mock("../../client", () => ({
  createCrmClient: vi.fn().mockResolvedValue({
    retrieveEntities: mockRetrieveEntities,
    retrieveAttributes: mockRetrieveAttributes,
  }),
}));
import { getEntitiesMetaData } from "./getEntitiesMetaData";
const conn = createMockConnection();
const ctx = createMockContext();
describe("getEntitiesMetaData", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns entity/attribute metadata", async () => {
    mockRetrieveEntities.mockResolvedValueOnce({
      value: [
        {
          MetadataId: "id-1",
          SchemaName: "Account",
          IsCustomEntity: false,
          IsChildEntity: false,
        },
      ],
    });
    mockRetrieveAttributes.mockResolvedValueOnce({
      value: [
        {
          LogicalName: "name",
          DisplayName: { UserLocalizedLabel: { Label: "Account Name" } },
        },
      ],
    });
    const result = await getEntitiesMetaData.perform(ctx, {
      connection: conn,
      defaultSelectedRecordTypes: ["Account"],
      recordTypeFilter: [],
      includeAllCustomRecordTypes: true,
      includeOnlyTopLevelRecordTypes: false,
    } as any);
    expect(result.data).toHaveLength(1);
    expect(result.data[0].object.label).toBe("Account");
    expect(result.data[0].defaultSelected).toBe(true);
    expect(result.data[0].fields[0].key).toBe("name");
  });
  test("error path surfaces the failure", async () => {
    mockRetrieveEntities.mockRejectedValueOnce(new Error("SDK error"));
    await expect(
      getEntitiesMetaData.perform(ctx, {
        connection: conn,
        defaultSelectedRecordTypes: [],
        recordTypeFilter: [],
        includeAllCustomRecordTypes: true,
        includeOnlyTopLevelRecordTypes: false,
      } as any),
    ).rejects.toThrow("SDK error");
  });
});
