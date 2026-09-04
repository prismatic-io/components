import { afterEach, describe, expect, test, vi } from "vitest";
import { createMockConnection } from "../testHelpers";
const { mockRetrieveEntities, mockRetrieveAttributes } = vi.hoisted(() => ({
  mockRetrieveEntities: vi.fn(),
  mockRetrieveAttributes: vi.fn(),
}));
vi.mock("../client", () => ({
  createCrmClient: vi.fn().mockResolvedValue({
    retrieveEntities: mockRetrieveEntities,
    retrieveAttributes: mockRetrieveAttributes,
  }),
}));
import { getEntitiesMetaData } from "./getEntitiesMetaData";
const conn = createMockConnection();
const ctx = { debug: { enabled: false } } as any;
describe("getEntitiesMetaData datasource", () => {
  afterEach(() => vi.clearAllMocks());
  test("returns objectSelection with entity/attribute mapping", async () => {
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
    const { result } = await getEntitiesMetaData.perform(ctx, {
      connection: conn,
      defaultSelectedRecordTypes: ["Account"],
      recordTypeFilter: [],
      includeAllCustomRecordTypes: true,
      includeOnlyTopLevelRecordTypes: false,
    } as any);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(1);
    expect(result[0].object).toEqual({ key: "id-1", label: "Account" });
    expect(result[0].defaultSelected).toBe(true);
    expect(result[0].fields).toHaveLength(1);
    expect(result[0].fields[0]).toEqual({ key: "name", label: "Account Name" });
  });
  test("empty entity list returns empty result", async () => {
    mockRetrieveEntities.mockResolvedValueOnce({ value: [] });
    const { result } = await getEntitiesMetaData.perform(ctx, {
      connection: conn,
      defaultSelectedRecordTypes: [],
      recordTypeFilter: [],
      includeAllCustomRecordTypes: true,
      includeOnlyTopLevelRecordTypes: false,
    } as any);
    expect(result).toEqual([]);
  });
});
