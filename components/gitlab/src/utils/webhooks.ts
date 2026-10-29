import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import {
  type ActionContext,
  type TriggerPayload,
  util,
} from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import {
  OTHER_EVENT_BRANCH,
  WEBHOOK_EVENTS,
  WEBHOOK_STATE_KEY_PREFIX,
} from "../constants";
import type {
  HookRef,
  ProjectHook,
  WebhookConfig,
  WebhookState,
} from "../types";
import { fetchAllPages } from "./pagination";

export const webhookStateKey = (context: ActionContext): string =>
  `${WEBHOOK_STATE_KEY_PREFIX}:${context.flow.stableId}`;

const generateWebhookSecret = (): string => randomBytes(32).toString("hex");

export const tokensMatch = (received: unknown, expected: string): boolean => {
  const token = util.types.toString(received);
  if (token === "" || expected === "") {
    return false;
  }
  const a = createHash("sha256").update(token).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
};

export const withoutSecretToken = (
  payload: TriggerPayload,
): TriggerPayload => ({
  ...payload,
  headers: Object.fromEntries(
    Object.entries(payload.headers).filter(
      ([name]) => name.toLowerCase() !== "x-gitlab-token",
    ),
  ),
});

export const resolveEventBranch = (headers: Record<string, string>): string =>
  WEBHOOK_EVENTS.find((event) => event.header === headers["x-gitlab-event"])
    ?.label ?? OTHER_EVENT_BRANCH;

const status = (error: unknown): number | undefined =>
  (error as { response?: { status?: number } }).response?.status;

const listProjectHooks = async (
  client: HttpClient,
  projectId: string,
  tolerateMissing: boolean,
): Promise<ProjectHook[]> => {
  try {
    return await fetchAllPages<ProjectHook>(
      client,
      `/projects/${projectId}/hooks`,
    );
  } catch (error) {
    if (tolerateMissing && status(error) === 404) {
      return [];
    }
    throw error;
  }
};

const findHooksByUrl = async (
  client: HttpClient,
  projectId: string,
  url: string,
  tolerateMissing: boolean,
): Promise<ProjectHook[]> =>
  (await listProjectHooks(client, projectId, tolerateMissing)).filter(
    (hook) => hook.url === url,
  );

const NUMERIC_ID = /^\d+$/;

const resolveProjectId = async (
  client: HttpClient,
  project: string,
  tolerateMissing: boolean,
): Promise<string | undefined> => {
  if (NUMERIC_ID.test(project)) {
    return project;
  }
  try {
    const { data } = await client.get<{ id: number }>(`/projects/${project}`);
    return util.types.toString(data.id);
  } catch (error) {
    if (tolerateMissing && status(error) === 404) {
      return undefined;
    }
    throw error;
  }
};

const resolveProjectIds = async (
  client: HttpClient,
  projects: string[],
  tolerateMissing: boolean,
): Promise<string[]> => {
  const ids = new Set<string>();
  for (const project of projects) {
    const id = await resolveProjectId(client, project, tolerateMissing);
    if (id !== undefined) {
      ids.add(id);
    }
  }
  return [...ids];
};

const deleteHook = async (client: HttpClient, ref: HookRef): Promise<void> => {
  try {
    await client.delete(`/projects/${ref.projectId}/hooks/${ref.hookId}`);
  } catch (error) {
    if (status(error) !== 404) {
      throw error;
    }
  }
};

export const reconcileHooks = async (
  client: HttpClient,
  url: string,
  config: WebhookConfig,
  previous: WebhookState | null | undefined,
): Promise<WebhookState> => {
  const secret = previous?.secret ?? generateWebhookSecret();
  const body = buildHookBody(url, secret, config);
  const projectIds = await resolveProjectIds(client, config.projects, false);
  const hooks: HookRef[] = [];
  const created: HookRef[] = [];
  try {
    for (const projectId of projectIds) {
      const [existing, ...duplicates] = await findHooksByUrl(
        client,
        projectId,
        url,
        false,
      );
      if (existing) {
        await client.put(`/projects/${projectId}/hooks/${existing.id}`, body);
        hooks.push({ projectId, hookId: existing.id });
      } else {
        const { data } = await client.post<ProjectHook>(
          `/projects/${projectId}/hooks`,
          body,
        );
        const ref = { projectId, hookId: data.id };
        hooks.push(ref);
        created.push(ref);
      }
      for (const duplicate of duplicates) {
        await deleteHook(client, { projectId, hookId: duplicate.id });
      }
    }
    const kept = new Set(projectIds);
    const previousIds = await resolveProjectIds(
      client,
      previous?.config.projects ?? [],
      true,
    );
    for (const projectId of previousIds.filter((id) => !kept.has(id))) {
      for (const hook of await findHooksByUrl(client, projectId, url, true)) {
        await deleteHook(client, { projectId, hookId: hook.id });
      }
    }
  } catch (error) {
    const orphans = await rollBackHooks(client, created);
    if (orphans.length > 0 && error instanceof Error) {
      const list = orphans
        .map(
          ({ projectId, hookId }) => `hook ${hookId} in project ${projectId}`,
        )
        .join(", ");
      error.message = `${error.message} Rolling back also failed, so these hooks remain in GitLab: ${list}.`;
    }
    throw error;
  }
  return { secret, hooks, config: { ...config, projects: projectIds } };
};

const rollBackHooks = async (
  client: HttpClient,
  refs: HookRef[],
): Promise<HookRef[]> => {
  const failed: HookRef[] = [];
  for (const ref of refs) {
    try {
      await deleteHook(client, ref);
    } catch {
      failed.push(ref);
    }
  }
  return failed;
};

export const removeHooks = async (
  client: HttpClient,
  urls: string[],
  state: WebhookState | null | undefined,
  fallbackProjects: string[],
): Promise<HookRef[]> => {
  const fromState = state != null;
  const projects = await resolveProjectIds(
    client,
    fromState ? state.config.projects : fallbackProjects,
    fromState,
  );
  const targets = new Set(urls);
  const removed: HookRef[] = [];
  for (const projectId of projects) {
    const hooks = await listProjectHooks(client, projectId, fromState);
    for (const hook of hooks.filter((h) => targets.has(h.url))) {
      const ref = { projectId, hookId: hook.id };
      await deleteHook(client, ref);
      removed.push(ref);
    }
  }
  return removed;
};

export const buildHookBody = (
  url: string,
  secret: string,
  config: WebhookConfig,
): Record<string, unknown> => ({
  url,
  token: secret,
  enable_ssl_verification: true,
  push_events_branch_filter: config.branchFilter ?? "",
  branch_filter_strategy: config.branchFilter ? "wildcard" : "all_branches",
  ...Object.fromEntries(
    WEBHOOK_EVENTS.map((event) => [
      event.value,
      config.events.includes(event.value),
    ]),
  ),
});
