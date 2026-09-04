import { afterEach, describe, expect, test, vi } from "vitest";
import { createMockConnection } from "../testHelpers";
const { mockRetrieveEntities } = vi.hoisted(() => ({
  mockRetrieveEntities: vi.fn(),
}));
vi.mock("../client", () => ({
  createCrmClient: vi
    .fn()
    .mockResolvedValue({ retrieveEntities: mockRetrieveEntities }),
}));
import { selectEntity } from "./selectEntity";
const conn = createMockConnection();
const ctx = { debug: { enabled: false } } as any;
describe("selectEntity datasource", () => {
  afterEach(() => vi.clearAllMocks());
  test("returns label/key pairs sorted by SchemaName", async () => {
    mockRetrieveEntities.mockResolvedValueOnce({
      value: [
        {
          MetadataId: "id-2",
          SchemaName: "Contact",
          DisplayName: { UserLocalizedLabel: { Label: "Contact" } },
          IsCustomEntity: false,
          IsChildEntity: false,
        },
        {
          MetadataId: "id-1",
          SchemaName: "Account",
          DisplayName: { UserLocalizedLabel: { Label: "Account" } },
          IsCustomEntity: false,
          IsChildEntity: false,
        },
      ],
    });
    const { result } = await selectEntity.perform(ctx, {
      connection: conn,
      includeCustom: true,
      includeOnlyTopLevel: false,
    } as any);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ label: "Account", key: "id-1" });
    expect(result[1]).toEqual({ label: "Contact", key: "id-2" });
  });
  test("empty entity list returns empty result", async () => {
    mockRetrieveEntities.mockResolvedValueOnce({ value: [] });
    const { result } = await selectEntity.perform(ctx, {
      connection: conn,
      includeCustom: true,
      includeOnlyTopLevel: false,
    } as any);
    expect(result).toEqual([]);
  });
});
