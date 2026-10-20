import { trigger, util } from "@prismatic-io/spectral";
import { createGitlabClient } from "../client";
import { WEBHOOK_BRANCH_NAMES } from "../constants";
import { webhookEventsExamplePayload } from "../examplePayloads";
import { webhookEventsInputs } from "../inputs";
import type { WebhookState } from "../types";
import {
  reconcileHooks,
  removeHooks,
  resolveEventBranch,
  tokensMatch,
  webhookStateKey,
  withoutSecretToken,
} from "../utils";
export const webhookEvents = trigger({
  display: {
    label: "Webhook Events",
    description:
      "Receive project event notifications from GitLab. Automatically creates and manages a webhook in each selected project for the selected events when the instance is deployed, and removes the webhooks when the instance is deleted.",
  },
  allowsBranching: true,
  staticBranchNames: WEBHOOK_BRANCH_NAMES,
  inputs: webhookEventsInputs,
  perform: async (context, payload) => {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    if (!context.isSimulatedTestExecution) {
      const state = context.crossFlowState[webhookStateKey(context)] as
        | WebhookState
        | undefined;
      if (
        !state?.secret ||
        !tokensMatch(headers["x-gitlab-token"], state.secret)
      ) {
        throw new Error(
          "Webhook request rejected: the X-Gitlab-Token header does not match this instance's webhook secret.",
        );
      }
    }
    return Promise.resolve({
      payload: withoutSecretToken(payload),
      branch: resolveEventBranch(headers),
    });
  },
  webhookLifecycleHandlers: {
    create: async (context, { connection, projects, events, branchFilter }) => {
      const key = webhookStateKey(context);
      const client = createGitlabClient(
        connection,
        context.debug.enabled && context.logger,
      );
      const state = await reconcileHooks(
        client,
        context.webhookUrls[context.flow.name],
        { projects, events, branchFilter: branchFilter ?? null },
        context.crossFlowState[key] as WebhookState | null | undefined,
      );
      return { crossFlowState: { [key]: state } };
    },
    delete: async (context, { connection, projects }) => {
      const key = webhookStateKey(context);
      const client = createGitlabClient(
        connection,
        context.debug.enabled && context.logger,
      );
      await removeHooks(
        client,
        [context.webhookUrls[context.flow.name]],
        context.crossFlowState[key] as WebhookState | null | undefined,
        projects,
      );
      return { crossFlowState: { [key]: null } };
    },
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: webhookEventsExamplePayload,
});
