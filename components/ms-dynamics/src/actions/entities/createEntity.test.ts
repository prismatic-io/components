import { afterEach, describe, expect, test, vi } from "vitest";
import { createEntityExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockCreate } = vi.hoisted(() => ({ mockCreate: vi.fn() }));
vi.mock("../../client", () => ({
  createCrmClient: vi.fn().mockResolvedValue({ create: mockCreate }),
}));
import { createEntity } from "./createEntity";
const conn = createMockConnection();
const ctx = createMockContext();
describe("createEntity", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns created entity", async () => {
    mockCreate.mockResolvedValueOnce(createEntityExamplePayload.data);
    const result = await createEntity.perform(ctx, {
      entityType: "accounts",
      fieldValues: { name: "Contoso Ltd." },
      dynamicValues: {},
      connection: conn,
    } as any);
    expect(result.data).toEqual(createEntityExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    mockCreate.mockRejectedValueOnce(new Error("Duplicate record"));
    await expect(
      createEntity.perform(ctx, {
        entityType: "accounts",
        fieldValues: { name: "Contoso Ltd." },
        dynamicValues: {},
        connection: conn,
      } as any),
    ).rejects.toThrow("Duplicate record");
  });
});
