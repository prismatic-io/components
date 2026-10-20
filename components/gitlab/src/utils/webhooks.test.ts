import nock from "nock";
import { createGitlabClient } from "../client";
import { accessTokenConnection, GITLAB_URL } from "../testHelpers";
import type { WebhookState } from "../types";
import {
  buildHookBody,
  reconcileHooks,
  removeHooks,
  resolveEventBranch,
  tokensMatch,
} from "./webhooks";
afterEach(() => nock.cleanAll());
const client = () => createGitlabClient(accessTokenConnection, false);
const URL_ = "https://hooks.example.com/trigger/ABC";
test("tokensMatch compares in constant time and rejects blanks", () => {
  expect(tokensMatch("s3cret", "s3cret")).toBe(true);
  expect(tokensMatch("nope", "s3cret")).toBe(false);
  expect(tokensMatch(undefined, "s3cret")).toBe(false);
  expect(tokensMatch("", "")).toBe(false);
});
test("resolveEventBranch maps X-Gitlab-Event to a branch", () => {
  expect(resolveEventBranch({ "x-gitlab-event": "Merge Request Hook" })).toBe(
    "Merge Request",
  );
  expect(resolveEventBranch({ "x-gitlab-event": "Emoji Hook" })).toBe("Other");
});
test("buildHookBody sets every event flag explicitly", () => {
  const body = buildHookBody(URL_, "s", {
    projects: ["1"],
    events: ["push_events"],
    branchFilter: null,
  });
  expect(body.push_events).toBe(true);
  expect(body.issues_events).toBe(false);
  expect(body.token).toBe("s");
  expect(body.enable_ssl_verification).toBe(true);
  expect(body.branch_filter_strategy).toBe("all_branches");
});
test("buildHookBody uses the wildcard strategy when a branch filter is set", () => {
  const body = buildHookBody(URL_, "s", {
    projects: ["1"],
    events: ["push_events"],
    branchFilter: "release/*",
  });
  expect(body.push_events_branch_filter).toBe("release/*");
  expect(body.branch_filter_strategy).toBe("wildcard");
});
test("reconcile updates an existing hook, creates missing ones, and deletes hooks for removed projects", async () => {
  const previous: WebhookState = {
    secret: "keep-me",
    hooks: [
      { projectId: "1", hookId: 10 },
      { projectId: "3", hookId: 30 },
    ],
    config: {
      projects: ["1", "3"],
      events: ["push_events"],
      branchFilter: null,
    },
  };
  nock(GITLAB_URL)
    .get("/api/v4/projects/1/hooks")
    .query(true)
    .reply(200, [{ id: 10, url: URL_, project_id: 1 }])
    .put(
      "/api/v4/projects/1/hooks/10",
      (b) => b.token === "keep-me" && b.note_events === true,
    )
    .reply(200, { id: 10 })
    .get("/api/v4/projects/2/hooks")
    .query(true)
    .reply(200, [])
    .post("/api/v4/projects/2/hooks", (b) => b.url === URL_)
    .reply(201, { id: 20 })
    .get("/api/v4/projects/3/hooks")
    .query(true)
    .reply(200, [{ id: 30, url: URL_, project_id: 3 }])
    .delete("/api/v4/projects/3/hooks/30")
    .reply(204);
  const state = await reconcileHooks(
    client(),
    URL_,
    {
      projects: ["1", "2"],
      events: ["push_events", "note_events"],
      branchFilter: null,
    },
    previous,
  );
  expect(state.secret).toBe("keep-me");
  expect(state.hooks).toEqual([
    { projectId: "1", hookId: 10 },
    { projectId: "2", hookId: 20 },
  ]);
  expect(nock.isDone()).toBe(true);
});
test("reconcile rolls back hooks it created when a later project fails", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/1/hooks")
    .query(true)
    .reply(200, [])
    .post("/api/v4/projects/1/hooks")
    .reply(201, { id: 11 })
    .get("/api/v4/projects/2/hooks")
    .query(true)
    .reply(403, { message: "403 Forbidden" })
    .delete("/api/v4/projects/1/hooks/11")
    .reply(204);
  await expect(
    reconcileHooks(
      client(),
      URL_,
      { projects: ["1", "2"], events: ["push_events"], branchFilter: null },
      undefined,
    ),
  ).rejects.toThrow(/403/);
  expect(nock.isDone()).toBe(true);
});
test("removeHooks finds hooks by URL when state is lost, tolerating 404", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/5/hooks")
    .query(true)
    .reply(200, [
      { id: 50, url: URL_, project_id: 5 },
      { id: 51, url: "https://other", project_id: 5 },
    ])
    .delete("/api/v4/projects/5/hooks/50")
    .reply(404, { message: "404 Not Found" });
  const removed = await removeHooks(client(), [URL_], undefined, ["5"]);
  expect(removed).toEqual([{ projectId: "5", hookId: 50 }]);
});
test("reconcile keeps the hook when a project entered as a path is redeployed as its numeric ID", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/acme%2Fapp")
    .reply(200, { id: 7 })
    .get("/api/v4/projects/7/hooks")
    .query(true)
    .reply(200, [])
    .post("/api/v4/projects/7/hooks")
    .reply(201, { id: 70 });
  const first = await reconcileHooks(
    client(),
    URL_,
    { projects: ["acme%2Fapp"], events: ["push_events"], branchFilter: null },
    undefined,
  );
  expect(first.config.projects).toEqual(["7"]);
  expect(first.hooks).toEqual([{ projectId: "7", hookId: 70 }]);
  expect(nock.isDone()).toBe(true);
  const deletes = nock(GITLAB_URL)
    .delete(/\/hooks\//)
    .reply(204);
  nock(GITLAB_URL)
    .get("/api/v4/projects/7/hooks")
    .query(true)
    .times(2)
    .reply(200, [{ id: 70, url: URL_, project_id: 7 }])
    .put("/api/v4/projects/7/hooks/70")
    .reply(200, { id: 70 });
  const second = await reconcileHooks(
    client(),
    URL_,
    { projects: ["7"], events: ["push_events"], branchFilter: null },
    first,
  );
  expect(second.hooks).toEqual([{ projectId: "7", hookId: 70 }]);
  expect(deletes.isDone()).toBe(false);
});
test("reconcile resolves paths from older state and tolerates a deleted project", async () => {
  const previous: WebhookState = {
    secret: "keep-me",
    hooks: [{ projectId: "acme%2Fapp", hookId: 70 }],
    config: {
      projects: ["acme%2Fapp", "acme%2Fgone"],
      events: ["push_events"],
      branchFilter: null,
    },
  };
  const deletes = nock(GITLAB_URL)
    .delete(/\/hooks\//)
    .reply(204);
  nock(GITLAB_URL)
    .get("/api/v4/projects/7/hooks")
    .query(true)
    .reply(200, [{ id: 70, url: URL_, project_id: 7 }])
    .put("/api/v4/projects/7/hooks/70")
    .reply(200, { id: 70 })
    .get("/api/v4/projects/acme%2Fapp")
    .reply(200, { id: 7 })
    .get("/api/v4/projects/acme%2Fgone")
    .reply(404, { message: "404 Project Not Found" });
  const state = await reconcileHooks(
    client(),
    URL_,
    { projects: ["7"], events: ["push_events"], branchFilter: null },
    previous,
  );
  expect(state.config.projects).toEqual(["7"]);
  expect(deletes.isDone()).toBe(false);
});
test("removeHooks resolves a stored path to its numeric ID before listing hooks", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/acme%2Fapp")
    .reply(200, { id: 7 })
    .get("/api/v4/projects/7/hooks")
    .query(true)
    .reply(200, [{ id: 70, url: URL_, project_id: 7 }])
    .delete("/api/v4/projects/7/hooks/70")
    .reply(204);
  const removed = await removeHooks(client(), [URL_], undefined, [
    "acme%2Fapp",
  ]);
  expect(removed).toEqual([{ projectId: "7", hookId: 70 }]);
  expect(nock.isDone()).toBe(true);
});
test("removeHooks skips a project from saved state that GitLab no longer has", async () => {
  const state: WebhookState = {
    secret: "s",
    hooks: [
      { projectId: "9", hookId: 90 },
      { projectId: "7", hookId: 70 },
    ],
    config: {
      projects: ["9", "7"],
      events: ["push_events"],
      branchFilter: null,
    },
  };
  nock(GITLAB_URL)
    .get("/api/v4/projects/9/hooks")
    .query(true)
    .reply(404, { message: "404 Project Not Found" })
    .get("/api/v4/projects/7/hooks")
    .query(true)
    .reply(200, [{ id: 70, url: URL_, project_id: 7 }])
    .delete("/api/v4/projects/7/hooks/70")
    .reply(204);
  const removed = await removeHooks(client(), [URL_], state, []);
  expect(removed).toEqual([{ projectId: "7", hookId: 70 }]);
  expect(nock.isDone()).toBe(true);
});
test("reconcile skips a deleted project from saved state when cleaning up", async () => {
  const previous: WebhookState = {
    secret: "keep-me",
    hooks: [
      { projectId: "7", hookId: 70 },
      { projectId: "9", hookId: 90 },
    ],
    config: {
      projects: ["7", "9"],
      events: ["push_events"],
      branchFilter: null,
    },
  };
  nock(GITLAB_URL)
    .get("/api/v4/projects/7/hooks")
    .query(true)
    .reply(200, [{ id: 70, url: URL_, project_id: 7 }])
    .put("/api/v4/projects/7/hooks/70")
    .reply(200, { id: 70 })
    .get("/api/v4/projects/9/hooks")
    .query(true)
    .reply(404, { message: "404 Project Not Found" });
  const state = await reconcileHooks(
    client(),
    URL_,
    { projects: ["7"], events: ["push_events"], branchFilter: null },
    previous,
  );
  expect(state.hooks).toEqual([{ projectId: "7", hookId: 70 }]);
  expect(nock.isDone()).toBe(true);
});
test("removeHooks raises an error for a mistyped fallback project", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/acme%2Ftypo")
    .reply(404, { message: "404 Project Not Found" });
  await expect(
    removeHooks(client(), [URL_], undefined, ["acme%2Ftypo"]),
  ).rejects.toThrow(/404/);
});
test("removeHooks raises an error for a missing numeric fallback project", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/404404/hooks")
    .query(true)
    .reply(404, { message: "404 Project Not Found" });
  await expect(
    removeHooks(client(), [URL_], undefined, ["404404"]),
  ).rejects.toThrow(/404/);
});
test("reconcile keeps the original error and names a hook the rollback could not delete", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/1/hooks")
    .query(true)
    .reply(200, [])
    .post("/api/v4/projects/1/hooks")
    .reply(201, { id: 11 })
    .get("/api/v4/projects/2/hooks")
    .query(true)
    .reply(200, [])
    .post("/api/v4/projects/2/hooks")
    .reply(201, { id: 21 })
    .get("/api/v4/projects/3/hooks")
    .query(true)
    .reply(403, { message: "403 Forbidden" })
    .delete("/api/v4/projects/1/hooks/11")
    .reply(500, { message: "500 Internal Server Error" })
    .delete("/api/v4/projects/2/hooks/21")
    .reply(204);
  const error = (await reconcileHooks(
    client(),
    URL_,
    { projects: ["1", "2", "3"], events: ["push_events"], branchFilter: null },
    undefined,
  ).catch((e: unknown) => e)) as Error;
  expect(error.message).toMatch(/403/);
  expect(error.message).toMatch(/hook 11 in project 1/);
  expect(error.message).not.toMatch(/hook 21/);
  expect(nock.isDone()).toBe(true);
});
test("reconcile rolls back created hooks when cleaning up a deselected project fails", async () => {
  const previous: WebhookState = {
    secret: "s",
    hooks: [{ projectId: "9", hookId: 90 }],
    config: { projects: ["9"], events: ["push_events"], branchFilter: null },
  };
  nock(GITLAB_URL)
    .get("/api/v4/projects/1/hooks")
    .query(true)
    .reply(200, [])
    .post("/api/v4/projects/1/hooks")
    .reply(201, { id: 11 })
    .get("/api/v4/projects/9/hooks")
    .query(true)
    .reply(403, { message: "403 Forbidden" })
    .delete("/api/v4/projects/1/hooks/11")
    .reply(204);
  await expect(
    reconcileHooks(
      client(),
      URL_,
      { projects: ["1"], events: ["push_events"], branchFilter: null },
      previous,
    ),
  ).rejects.toThrow(/403/);
  expect(nock.isDone()).toBe(true);
});
test("reconcile deletes duplicate hooks that point at the same URL", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/1/hooks")
    .query(true)
    .reply(200, [
      { id: 10, url: URL_, project_id: 1 },
      { id: 12, url: URL_, project_id: 1 },
    ])
    .put("/api/v4/projects/1/hooks/10")
    .reply(200, { id: 10 })
    .delete("/api/v4/projects/1/hooks/12")
    .reply(204);
  const state = await reconcileHooks(
    client(),
    URL_,
    { projects: ["1"], events: ["push_events"], branchFilter: null },
    undefined,
  );
  expect(state.hooks).toEqual([{ projectId: "1", hookId: 10 }]);
  expect(nock.isDone()).toBe(true);
});
test("removeHooks treats null state as lost and does not skip a missing fallback project", async () => {
  nock(GITLAB_URL)
    .get("/api/v4/projects/404404/hooks")
    .query(true)
    .reply(404, { message: "404 Project Not Found" });
  await expect(removeHooks(client(), [URL_], null, ["404404"])).rejects.toThrow(
    /404/,
  );
});
