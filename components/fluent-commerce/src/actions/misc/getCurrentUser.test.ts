import type { ActionContext } from "@prismatic-io/spectral";
import { invoke } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { getCurrentUserExamplePayload } from "../../examplePayloads";
import {
  debugModeContext,
  expectDebugLoggedRequest,
  mockGraphql,
  mockTokenExchange,
  recordingLogger,
  testConnection,
  useNockLifecycle,
} from "../../testHelpers";
import { getCurrentUser } from "./getCurrentUser";
describe("getCurrentUser", () => {
  useNockLifecycle();
  it("queries the current user and returns the data", async () => {
    mockTokenExchange();
    const graphql = mockGraphql(200, getCurrentUserExamplePayload);
    const { result } = await invoke(getCurrentUser, {
      connection: testConnection,
    });
    expect(graphql.body()?.query).toContain("me");
    expect(result).toEqual({ data: getCurrentUserExamplePayload.data });
    expect(nock.isDone()).toBe(true);
  });
  it("never logs the connection's credentials or token when Debug Mode is on", async () => {
    mockTokenExchange();
    mockGraphql(200, getCurrentUserExamplePayload);
    const log = vi.spyOn(console, "log").mockImplementation(() => undefined);
    try {
      await invoke(
        getCurrentUser,
        { connection: testConnection },
        { debug: { enabled: true } as ActionContext["debug"] },
      );
      const logged = log.mock.calls.flat().map(String).join("\n");
      expect(logged).not.toMatch(/"password":\s*"secret"/);
      expect(logged).not.toContain("client-secret");
      expect(logged).not.toContain("test-token");
    } finally {
      log.mockRestore();
    }
    expect(nock.isDone()).toBe(true);
  });
  it("logs the GraphQL query in Debug Mode", async () => {
    mockTokenExchange();
    mockGraphql(200, getCurrentUserExamplePayload);
    const logger = recordingLogger();
    await invoke(
      getCurrentUser,
      { connection: testConnection },
      debugModeContext(logger),
    );
    expectDebugLoggedRequest(logger, ["primaryEmail"]);
    expect(nock.isDone()).toBe(true);
  });
  it("rejects when the GraphQL endpoint returns a 4xx", async () => {
    mockTokenExchange();
    mockGraphql(401, { errors: [{ message: "Unauthorized" }] });
    await expect(
      invoke(getCurrentUser, { connection: testConnection }),
    ).rejects.toThrow();
    expect(nock.isDone()).toBe(true);
  });
});
