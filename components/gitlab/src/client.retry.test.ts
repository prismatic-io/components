import type { ActionLogger } from "@prismatic-io/spectral";
import nock from "nock";
import { createGitlabClient } from "./client";
import {
  accessTokenConnection,
  GITLAB_URL,
  onPremConnectionValue,
} from "./testHelpers";
vi.mock("./constants", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./constants")>()),
  RETRY_BASE_DELAY_MS: 1,
}));
afterEach(() => nock.cleanAll());
test("appends the tunnel hint once even after every retry fails", async () => {
  const scope = nock("https://tunnel.internal:8443")
    .get("/api/v4/user")
    .times(4)
    .replyWithError(
      Object.assign(new Error("connect ECONNREFUSED"), {
        code: "ECONNREFUSED",
      }),
    );
  const client = createGitlabClient(
    onPremConnectionValue({ host: "tunnel.internal", port: "8443" }),
    false,
  );
  const error = (await client.get("/user").catch((e: unknown) => e)) as Error;
  expect(scope.isDone()).toBe(true);
  expect(
    error.message.match(/on-prem agent tunnel is unreachable/g),
  ).toHaveLength(1);
});
test("logs a retried-then-successful response once", async () => {
  const debug = vi.fn();
  const logger = {
    metric: vi.fn(),
    trace: vi.fn(),
    debug,
    info: vi.fn(),
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  } as ActionLogger;
  nock(GITLAB_URL)
    .get("/api/v4/user")
    .reply(502, { message: "502 Bad Gateway" })
    .get("/api/v4/user")
    .reply(200, { id: 1 });
  const client = createGitlabClient(accessTokenConnection, logger);
  await client.get("/user");
  const responses = debug.mock.calls.filter((call) =>
    String(call[0]).includes('"type": "response"'),
  );
  expect(responses).toHaveLength(1);
});
test("redacts the webhook secret from a retried PUT whose body is already serialized", async () => {
  const debug = vi.fn();
  const logger = {
    metric: vi.fn(),
    trace: vi.fn(),
    debug,
    info: vi.fn(),
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  } as ActionLogger;
  nock(GITLAB_URL)
    .put("/api/v4/projects/1/hooks/10")
    .reply(429, { message: "429 Too Many Requests" }, { "Retry-After": "0" })
    .put("/api/v4/projects/1/hooks/10")
    .reply(200, { id: 10 });
  const client = createGitlabClient(accessTokenConnection, logger);
  await client.put("/projects/1/hooks/10", {
    url: "https://hooks.example.com/trigger/ABC",
    token: "hook-secret",
  });
  const requests = debug.mock.calls.filter((call) =>
    String(call[0]).includes('"type": "request"'),
  );
  expect(requests.length).toBeGreaterThanOrEqual(2);
  const output = debug.mock.calls.map((call) => call.join(" ")).join("\n");
  expect(output).not.toContain("hook-secret");
});
