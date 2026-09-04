import { afterEach, describe, expect, test, vi } from "vitest";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockRetrieveAttributes } = vi.hoisted(() => ({
  mockRetrieveAttributes: vi.fn(),
}));
vi.mock("../../client", () => ({
  createCrmClient: vi
    .fn()
    .mockResolvedValue({ retrieveAttributes: mockRetrieveAttributes }),
}));
import { listAttributesAction } from "./listAttributesAction";
const conn = createMockConnection();
const ctx = createMockContext();
describe("listAttributesAction", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns filtered sorted attribute list", async () => {
    mockRetrieveAttributes.mockResolvedValueOnce({
      value: [
        {
          LogicalName: "name",
          DisplayName: { UserLocalizedLabel: { Label: "Account Name" } },
          AttributeType: "String",
          Description: { UserLocalizedLabel: { Label: "The name." } },
          IsCustomAttribute: false,
          IsPrimaryId: false,
          IsPrimaryName: true,
          RequiredLevel: { Value: "ApplicationRequired" },
          IsValidForRead: true,
          IsValidForCreate: true,
          IsValidForUpdate: true,
        },
        {
          LogicalName: "accountid",
          DisplayName: { UserLocalizedLabel: { Label: "Account" } },
          AttributeType: "Uniqueidentifier",
          Description: { UserLocalizedLabel: { Label: "Unique ID." } },
          IsCustomAttribute: false,
          IsPrimaryId: true,
          IsPrimaryName: false,
          RequiredLevel: { Value: "SystemRequired" },
          IsValidForRead: true,
          IsValidForCreate: true,
          IsValidForUpdate: false,
        },
      ],
    });
    const result = await listAttributesAction.perform(ctx, {
      connection: conn,
      entityId: "id-1",
      attributeType: undefined,
      includeDetails: false,
    } as any);
    expect(result.data.attributes[0].logicalName).toBe("accountid");
    expect(result.data.attributes[1].logicalName).toBe("name");
    expect(result.data.totalCount).toBe(2);
    expect(result.data.primaryNameAttribute).toBe("name");
  });
  test("error path surfaces the failure", async () => {
    mockRetrieveAttributes.mockRejectedValueOnce(new Error("SDK error"));
    await expect(
      listAttributesAction.perform(ctx, {
        connection: conn,
        entityId: "id-1",
        attributeType: undefined,
        includeDetails: false,
      } as any),
    ).rejects.toThrow("SDK error");
  });
});
