import { afterEach, describe, expect, test, vi } from "vitest";
import { getAttributeExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockRetrieveAttribute } = vi.hoisted(() => ({
  mockRetrieveAttribute: vi.fn(),
}));
vi.mock("../../client", () => ({
  createCrmClient: vi
    .fn()
    .mockResolvedValue({ retrieveAttribute: mockRetrieveAttribute }),
}));
import { getAttribute } from "./getAttribute";
const conn = createMockConnection();
const ctx = createMockContext();
describe("getAttribute", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns attribute data", async () => {
    mockRetrieveAttribute.mockResolvedValueOnce(
      getAttributeExamplePayload.data,
    );
    const result = await getAttribute.perform(ctx, {
      connection: conn,
      entityId: "id-1",
      attributeType: "attr-key",
      fieldNames: ["LogicalName"],
      expandPropertyNames: undefined,
    } as any);
    expect(result.data).toEqual(getAttributeExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    mockRetrieveAttribute.mockRejectedValueOnce(
      new Error("Attribute not found"),
    );
    await expect(
      getAttribute.perform(ctx, {
        connection: conn,
        entityId: "id-1",
        attributeType: "bad-key",
        fieldNames: undefined,
        expandPropertyNames: undefined,
      } as any),
    ).rejects.toThrow("Attribute not found");
  });
});
