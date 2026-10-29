import { defaultTriggerPayload } from "@prismatic-io/spectral/dist/testing";
import nock from "nock";
import { accessTokenConnection, GITLAB_URL } from "../testHelpers";
import { webhookEvents } from "./webhookEvents";

afterEach(() => nock.cleanAll());
const HOOK_URL = "https://hooks.example.com/trigger/FLOW1";

const makeContext = (
  crossFlowState: Record<string, unknown> = {},
  isSimulatedTestExecution = false,
) =>
  ({
    webhookUrls: { "Flow 1": HOOK_URL },
    flow: { name: "Flow 1", stableId: "stable-1" },
    crossFlowState,
    isSimulatedTestExecution,
    debug: { enabled: false },
    logger: { debug: vi.fn(), info: vi.fn(), warn: vi.fn(), error: vi.fn() },
  }) as never;

const params = {
  connection: accessTokenConnection,
  projects: ["1"],
  events: ["push_events", "merge_requests_events"],
  branchFilter: undefined,
} as never;

test("create registers a hook and returns state keyed by flow stableId", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/1/hooks")
    .query(true)
    .reply(200, [])
    .post(
      "/api/v4/projects/1/hooks",
      (b) => b.url === HOOK_URL && b.merge_requests_events === true,
    )
    .reply(201, { id: 77 });
  const result = await webhookEvents.webhookLifecycleHandlers?.create(
    makeContext(),
    params,
  );
  const state = (
    result as {
      crossFlowState: Record<string, { hooks: unknown; secret: string }>;
    }
  ).crossFlowState["gitlabWebhook:stable-1"];
  expect(state.hooks).toEqual([{ projectId: "1", hookId: 77 }]);
  expect(state.secret).toMatch(/^[0-9a-f]{64}$/);
});

test("delete removes hooks by URL even with no stored state", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/1/hooks")
    .query(true)
    .reply(200, [{ id: 77, url: HOOK_URL, project_id: 1 }])
    .delete("/api/v4/projects/1/hooks/77")
    .reply(204);
  const result = await webhookEvents.webhookLifecycleHandlers?.delete(
    makeContext(),
    params,
  );
  expect(nock.isDone()).toBe(true);
  expect(
    (result as { crossFlowState: Record<string, unknown> }).crossFlowState,
  ).toEqual({
    "gitlabWebhook:stable-1": null,
  });
});

test("perform verifies the token against stored state and branches", async () => {
  const context = makeContext({
    "gitlabWebhook:stable-1": {
      secret: "abc",
      hooks: [],
      config: { projects: ["1"], events: [], branchFilter: null },
    },
  });
  const ok = await webhookEvents.perform(
    context,
    {
      ...defaultTriggerPayload(),
      headers: {
        "X-Gitlab-Token": "abc",
        "X-Gitlab-Event": "Merge Request Hook",
      },
    },
    params,
  );
  expect((ok as { branch: string }).branch).toBe("Merge Request");
  expect(
    (ok as { payload: { headers: Record<string, string> } }).payload.headers,
  ).toEqual({ "X-Gitlab-Event": "Merge Request Hook" });
  await expect(
    webhookEvents.perform(
      context,
      {
        ...defaultTriggerPayload(),
        headers: { "X-Gitlab-Token": "nope", "X-Gitlab-Event": "Push Hook" },
      },
      params,
    ),
  ).rejects.toThrow(/rejected/);
});

const eventPayload = (headers: Record<string, string>) => ({
  ...defaultTriggerPayload(),
  headers,
});

describe("perform without a stored secret", () => {
  test("rejects when no state is stored for this flow, even with a token header", async () => {
    await expect(
      webhookEvents.perform(
        makeContext(),
        eventPayload({
          "X-Gitlab-Token": "abc",
          "X-Gitlab-Event": "Push Hook",
        }),
        params,
      ),
    ).rejects.toThrow(/rejected/);
  });

  test("rejects when the stored state for another flow has the secret", async () => {
    const context = makeContext({
      "gitlabWebhook:other-flow": { secret: "abc", hooks: [], config: {} },
    });
    await expect(
      webhookEvents.perform(
        context,
        eventPayload({
          "X-Gitlab-Token": "abc",
          "X-Gitlab-Event": "Push Hook",
        }),
        params,
      ),
    ).rejects.toThrow(/rejected/);
  });

  test("rejects when the stored secret is empty and the token header is empty", async () => {
    const context = makeContext({
      "gitlabWebhook:stable-1": {
        secret: "",
        hooks: [],
        config: { projects: ["1"], events: [], branchFilter: null },
      },
    });
    await expect(
      webhookEvents.perform(
        context,
        eventPayload({ "X-Gitlab-Token": "", "X-Gitlab-Event": "Push Hook" }),
        params,
      ),
    ).rejects.toThrow(/rejected/);
  });

  test("rejects a request with no token header against a stored secret", async () => {
    const context = makeContext({
      "gitlabWebhook:stable-1": {
        secret: "abc",
        hooks: [],
        config: { projects: ["1"], events: [], branchFilter: null },
      },
    });
    await expect(
      webhookEvents.perform(
        context,
        eventPayload({ "X-Gitlab-Event": "Push Hook" }),
        params,
      ),
    ).rejects.toThrow(/rejected/);
  });
});

describe("perform during a simulated test execution", () => {
  test("skips verification with no stored state and no token", async () => {
    const payload = eventPayload({ "X-Gitlab-Event": "Pipeline Hook" });
    const result = await webhookEvents.perform(
      makeContext({}, true),
      payload,
      params,
    );
    expect(result).toEqual({ payload, branch: "Pipeline" });
  });

  test("skips verification even when the token does not match the stored secret", async () => {
    const context = makeContext(
      {
        "gitlabWebhook:stable-1": {
          secret: "abc",
          hooks: [],
          config: { projects: ["1"], events: [], branchFilter: null },
        },
      },
      true,
    );
    const result = await webhookEvents.perform(
      context,
      eventPayload({ "X-Gitlab-Token": "nope", "X-Gitlab-Event": "Note Hook" }),
      params,
    );
    expect((result as { branch: string }).branch).toBe("Note");
  });
});
