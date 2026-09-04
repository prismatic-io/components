import { afterEach, describe, expect, test, vi } from "vitest";
import { ORG_BASE_URL } from "../../constants";
import { rawRequestExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
const { mockSendRawRequest } = vi.hoisted(() => ({
  mockSendRawRequest: vi.fn(),
}));
vi.mock("../../client", () => ({
  getWebApiUrl: vi.fn().mockResolvedValue(`${ORG_BASE_URL}/api/data/v9.2/`),
}));
vi.mock("@prismatic-io/spectral/dist/clients/http", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    sendRawRequest: mockSendRawRequest,
  };
});
import { rawRequest } from "./rawRequest";
const conn = createMockConnection();
const ctx = createMockContext();
describe("rawRequest", () => {
  afterEach(() => vi.clearAllMocks());
  test("happy path returns response data", async () => {
    mockSendRawRequest.mockResolvedValueOnce({
      data: rawRequestExamplePayload.data,
    });
    const result = await rawRequest.perform(ctx, {
      connection: conn,
      url: "/accounts",
      method: "GET",
      headers: [],
      queryParams: [],
      data: undefined,
      responseType: "json",
    } as any);
    expect(result.data).toEqual(rawRequestExamplePayload.data);
  });
});
