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
import { selectEntityType } from "./selectEntityType";
const conn = createMockConnection();
const ctx = { debug: { enabled: false } } as any;
describe("selectEntityType datasource", () => {
  afterEach(() => vi.clearAllMocks());
  test("returns label/key pairs with DisplayName (SchemaName) format", async () => {
    mockRetrieveEntities.mockResolvedValueOnce({
      value: [
        {
          LogicalName: "account",
          SchemaName: "Account",
          DisplayName: { UserLocalizedLabel: { Label: "Account" } },
          IsCustomEntity: false,
          IsChildEntity: false,
        },
        {
          LogicalName: "contact",
          SchemaName: "Contact",
          DisplayName: { UserLocalizedLabel: { Label: "Contact" } },
          IsCustomEntity: false,
          IsChildEntity: false,
        },
      ],
    });
    const { result } = await selectEntityType.perform(ctx, {
      connection: conn,
      includeCustom: true,
      includeOnlyTopLevel: false,
    } as any);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ label: "Account (Account)", key: "account" });
    expect(result[1]).toEqual({ label: "Contact (Contact)", key: "contact" });
  });
  test("empty entity list returns empty result", async () => {
    mockRetrieveEntities.mockResolvedValueOnce({ value: [] });
    const { result } = await selectEntityType.perform(ctx, {
      connection: conn,
      includeCustom: true,
      includeOnlyTopLevel: false,
    } as any);
    expect(result).toEqual([]);
  });
});
