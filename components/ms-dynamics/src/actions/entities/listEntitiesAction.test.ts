import { afterEach, describe, expect, test, vi } from "vitest";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockRetrieveEntities } = vi.hoisted(() => ({
  mockRetrieveEntities: vi.fn(),
}));
vi.mock("../../client", () => ({
  createCrmClient: vi
    .fn()
    .mockResolvedValue({ retrieveEntities: mockRetrieveEntities }),
}));
import { listEntitiesAction } from "./listEntitiesAction";
const conn = createMockConnection();
const ctx = createMockContext();
describe("listEntitiesAction", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns filtered and sorted entity list", async () => {
    mockRetrieveEntities.mockResolvedValueOnce({
      value: [
        {
          MetadataId: "id-1",
          LogicalName: "contact",
          SchemaName: "Contact",
          DisplayName: { UserLocalizedLabel: { Label: "Contact" } },
          DisplayCollectionName: { UserLocalizedLabel: { Label: "Contacts" } },
          IsCustomEntity: false,
          IsChildEntity: false,
        },
        {
          MetadataId: "id-2",
          LogicalName: "account",
          SchemaName: "Account",
          DisplayName: { UserLocalizedLabel: { Label: "Account" } },
          DisplayCollectionName: { UserLocalizedLabel: { Label: "Accounts" } },
          IsCustomEntity: false,
          IsChildEntity: false,
        },
      ],
    });
    const result = await listEntitiesAction.perform(ctx, {
      connection: conn,
      includeCustom: true,
      includeOnlyTopLevel: false,
      includeDetails: false,
    } as any);
    expect(result.data.entities[0].logicalName).toBe("account");
    expect(result.data.entities[1].logicalName).toBe("contact");
    expect(result.data.totalCount).toBe(2);
  });
  test("error path surfaces the failure", async () => {
    mockRetrieveEntities.mockRejectedValueOnce(new Error("SDK error"));
    await expect(
      listEntitiesAction.perform(ctx, {
        connection: conn,
        includeCustom: true,
        includeOnlyTopLevel: false,
        includeDetails: false,
      } as any),
    ).rejects.toThrow("SDK error");
  });
});
