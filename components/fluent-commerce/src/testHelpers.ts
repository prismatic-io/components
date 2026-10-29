import type { ActionContext, ActionLogger } from "@prismatic-io/spectral";
import { createConnection } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { fluentCommerceOAuthPassword } from "./connections";

export const TEST_HOST = "https://example.api.fluentretail.com";

export const testConnection = createConnection(fluentCommerceOAuthPassword, {
  host: TEST_HOST,
  username: "john_doe",
  password: "secret",
  clientId: "client-id",
  clientSecret: "client-secret",
});

export const mockTokenExchange = (): nock.Scope =>
  nock(TEST_HOST)
    .post("/oauth/token")
    .query(true)
    .reply(200, { access_token: "test-token" });

export interface GraphqlBody {
  query?: string;
  variables?: Record<string, unknown>;
}

export const mockGraphql = (
  status: number,
  reply: object,
): { scope: nock.Scope; body: () => GraphqlBody | undefined } => {
  let captured: GraphqlBody | undefined;
  const scope = nock(TEST_HOST)
    .post("/graphql", (body) => {
      captured = body;
      return true;
    })
    .reply(status, reply);
  return { scope, body: () => captured };
};

export const recordingLogger = (): ActionLogger => ({
  metric: vi.fn(),
  trace: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  log: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
});

export const debugModeContext = (
  logger: ActionLogger,
): Partial<ActionContext> => ({
  debug: { enabled: true } as ActionContext["debug"],
  logger,
});

export const expectDebugLoggedRequest = (
  logger: ActionLogger,
  expected: string[],
): void => {
  const debugged = vi.mocked(logger.debug).mock.calls.flat().map(String);
  for (const fragment of expected) {
    expect(debugged.join("\n")).toContain(fragment);
  }
  const everything = Object.values(logger)
    .flatMap((channel) => vi.mocked(channel).mock.calls.flat())
    .map(String)
    .join("\n");
  expect(everything).not.toContain("test-token");
  expect(everything).not.toContain("client-secret");
  expect(everything).not.toMatch(/"password":\s*"secret"/);
};

export const useNockLifecycle = (): void => {
  beforeAll(() => {
    nock.disableNetConnect();
  });
  afterEach(() => {
    nock.cleanAll();
  });
  afterAll(() => {
    nock.enableNetConnect();
  });
};
