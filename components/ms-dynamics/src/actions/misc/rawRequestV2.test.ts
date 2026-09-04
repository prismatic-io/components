import { afterEach, describe, expect, test, vi } from "vitest";
import { rawRequestV2ExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockSendRawRequest } = vi.hoisted(() => ({
  mockSendRawRequest: vi.fn(),
}));
vi.mock("@prismatic-io/spectral/dist/clients/http", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    sendRawRequest: mockSendRawRequest,
  };
});
import { rawRequestV2 } from "./rawRequestV2";
const conn = createMockConnection();
const ctx = createMockContext();
describe("rawRequestV2", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns response data", async () => {
    mockSendRawRequest.mockResolvedValueOnce({
      data: rawRequestV2ExamplePayload.data,
    });
    const result = await rawRequestV2.perform(ctx, {
      connection: conn,
      url: "/api/data/v9.2/accounts",
      method: "GET",
      headers: [],
      queryParams: [],
      data: undefined,
      responseType: "json",
    } as any);
    expect(result.data).toEqual(rawRequestV2ExamplePayload.data);
  });
});
