import nock from "nock";
import { afterEach, describe, expect, test, vi } from "vitest";
import { ORG_BASE_URL } from "../../constants";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import { createMockConnection, createMockContext } from "../../testHelpers";
vi.mock("../../client", () => ({
  getWebApiUrl: vi.fn().mockResolvedValue(`${ORG_BASE_URL}/api/data/v9.2/`),
  createCrmClient: vi.fn(),
}));
import { getCurrentUser } from "./getCurrentUser";
const conn = createMockConnection();
const ctx = createMockContext();
const API_BASE = `${ORG_BASE_URL}/api/data/v9.2`;
describe("getCurrentUser", () => {
  afterEach(() => nock.cleanAll());
  test("happy path returns WhoAmI data", async () => {
    nock(API_BASE)
      .get("/WhoAmI()")
      .reply(200, getCurrentUserExamplePayload.data);
    const result = await getCurrentUser.perform(ctx, {
      connection: conn,
    } as any);
    expect(result.data).toEqual(getCurrentUserExamplePayload.data);
  });
  test("error path surfaces the failure", async () => {
    nock(API_BASE).get("/WhoAmI()").reply(401, { error: "unauthorized" });
    await expect(
      getCurrentUser.perform(ctx, { connection: conn } as any),
    ).rejects.toThrow();
  });
});
