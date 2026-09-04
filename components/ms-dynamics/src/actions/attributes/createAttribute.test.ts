import { afterEach, describe, expect, test, vi } from "vitest";
import { createAttributeExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockCreateAttribute } = vi.hoisted(() => ({
  mockCreateAttribute: vi.fn(),
}));
vi.mock("../../client", () => ({
  createCrmClient: vi
    .fn()
    .mockResolvedValue({ createAttribute: mockCreateAttribute }),
}));
import { createAttribute } from "./createAttribute";
const conn = createMockConnection();
const ctx = createMockContext();
describe("createAttribute", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns created attribute", async () => {
    mockCreateAttribute.mockResolvedValueOnce(
      createAttributeExamplePayload.data,
    );
    const result = await createAttribute.perform(ctx, {
      connection: conn,
      entityId: "id-1",
      attributeBody: { SchemaName: "new_CustomField" },
    } as any);
    expect(result.data).toEqual(createAttributeExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    mockCreateAttribute.mockRejectedValueOnce(new Error("Invalid attribute"));
    await expect(
      createAttribute.perform(ctx, {
        connection: conn,
        entityId: "id-1",
        attributeBody: {},
      } as any),
    ).rejects.toThrow("Invalid attribute");
  });
});
