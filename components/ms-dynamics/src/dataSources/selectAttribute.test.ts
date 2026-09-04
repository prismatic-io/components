import { afterEach, describe, expect, test, vi } from "vitest";
import { createMockConnection } from "../testHelpers";
const { mockRetrieveAttributes } = vi.hoisted(() => ({
  mockRetrieveAttributes: vi.fn(),
}));
vi.mock("../client", () => ({
  createCrmClient: vi
    .fn()
    .mockResolvedValue({ retrieveAttributes: mockRetrieveAttributes }),
}));
import { selectAttribute } from "./selectAttribute";
const conn = createMockConnection();
const ctx = { debug: { enabled: false } } as any;
describe("selectAttribute datasource", () => {
  afterEach(() => vi.clearAllMocks());
  test("returns label/key pairs sorted by LogicalName", async () => {
    mockRetrieveAttributes.mockResolvedValueOnce({
      value: [
        {
          MetadataId: "attr-2",
          LogicalName: "telephone1",
          DisplayName: { UserLocalizedLabel: { Label: "Main Phone" } },
        },
        {
          MetadataId: "attr-1",
          LogicalName: "emailaddress1",
          DisplayName: { UserLocalizedLabel: { Label: "Email Address 1" } },
        },
      ],
    });
    const { result } = await selectAttribute.perform(ctx, {
      connection: conn,
      entityId: "entity-id-1",
    } as any);
    expect(Array.isArray(result)).toBe(true);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ label: "Email Address 1", key: "attr-1" });
    expect(result[1]).toEqual({ label: "Main Phone", key: "attr-2" });
  });
  test("empty attribute list returns empty result", async () => {
    mockRetrieveAttributes.mockResolvedValueOnce({ value: [] });
    const { result } = await selectAttribute.perform(ctx, {
      connection: conn,
      entityId: "entity-id-1",
    } as any);
    expect(result).toEqual([]);
  });
});
