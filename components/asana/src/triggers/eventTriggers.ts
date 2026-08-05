import type {
  ActionContext,
  Connection,
  TriggerPayload,
} from "@prismatic-io/spectral";
import { trigger, util } from "@prismatic-io/spectral";
import { WEBHOOK_SECRET_LEGACY_KEY } from "../constants";
import {
  projectTasksTriggerExamplePayload,
  storiesTriggerExamplePayload,
  workspaceProjectsTriggerExamplePayload,
} from "../examplePayloads";
import {
  projectTasksTriggerInputs,
  storiesTriggerInputs,
  workspaceProjectsTriggerInputs,
} from "../inputs";
import {
  createWebhook,
  deleteWebhook,
  getAdditionalData,
  getFilters,
  isHeartbeatData,
  resolveWebhookSecret,
  validateHmac,
  webhookSecretStateKey,
} from "../util";
const performFunction = async (
  context: ActionContext,
  payload: TriggerPayload,
  inputs: {
    asanaConnection: Connection;
  },
): Promise<{
  payload: TriggerPayload;
  branch: string;
}> => {
  const headers = util.types.lowerCaseHeaders(payload.headers);
  const webhookSecret = headers["x-hook-secret"];
  const { value: storedSecret, isLegacy } = resolveWebhookSecret(context);
  if (webhookSecret) {
    return Promise.resolve({
      payload,
      response: {
        statusCode: 200,
        headers: {
          "X-Hook-Secret": webhookSecret,
        },
        contentType: "text/plain",
      },
      branch: "URL Verify",
      crossFlowState: {
        [webhookSecretStateKey(context)]: webhookSecret,
      },
    });
  } else {
    if (!context.isSimulatedTestExecution) {
      validateHmac(payload, headers["x-hook-signature"], [storedSecret]);
    }
    if (isLegacy) {
      context.crossFlowState[webhookSecretStateKey(context)] = storedSecret;
      context.instanceState[WEBHOOK_SECRET_LEGACY_KEY] = null;
    }
    if (isHeartbeatData(payload.body.data)) {
      context.logger.debug("Asana Heartbeat received");
      return Promise.resolve({
        payload,
        branch: "URL Verify",
      });
    } else {
      return Promise.resolve({
        payload: await getAdditionalData(context, payload, inputs),
        branch: "Notification",
      });
    }
  }
};
const workspaceProjectsTrigger = trigger({
  display: {
    label: "Workspace Projects",
    description:
      "Receive project notifications from Asana. Automatically creates and manages a webhook subscription for project events in the selected workspace.",
  },
  allowsBranching: true,
  staticBranchNames: ["Notification", "URL Verify"],
  examplePayload: workspaceProjectsTriggerExamplePayload,
  inputs: workspaceProjectsTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: performFunction,
  webhookLifecycleHandlers: {
    create: async (
      context,
      {
        triggerWhenAdded,
        triggerWhenChanged,
        triggerWhenDeleted,
        triggerWhenRemoved,
        triggerWhenUndeleted,
        asanaConnection,
        workspaceId,
      },
    ) => {
      const endpoint = context.webhookUrls[context.flow.name];
      await createWebhook({
        asanaConnection: asanaConnection,
        endpoint,
        resourceId: workspaceId,
        filters: getFilters(
          {
            triggerWhenAdded,
            triggerWhenChanged,
            triggerWhenDeleted,
            triggerWhenRemoved,
            triggerWhenUndeleted,
          },
          "project",
        ),
      });
    },
    delete: async (context, params) => {
      const endpoint = context.webhookUrls[context.flow.name];
      await deleteWebhook({
        asanaConnection: params.asanaConnection,
        endpoint,
        resourceId: params.workspaceId,
      });
    },
  },
});
const projectTasksTrigger = trigger({
  display: {
    label: "Project Tasks",
    description:
      "Receive task notifications from Asana. Automatically creates and manages a webhook subscription for task events in the selected project.",
  },
  allowsBranching: true,
  staticBranchNames: ["Notification", "URL Verify"],
  examplePayload: projectTasksTriggerExamplePayload,
  inputs: projectTasksTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: performFunction,
  webhookLifecycleHandlers: {
    create: async (
      context,
      {
        triggerWhenAdded,
        triggerWhenChanged,
        triggerWhenDeleted,
        triggerWhenRemoved,
        triggerWhenUndeleted,
        asanaConnection,
        projectId,
      },
    ) => {
      const endpoint = context.webhookUrls[context.flow.name];
      await createWebhook({
        asanaConnection: asanaConnection,
        endpoint,
        resourceId: projectId,
        filters: getFilters(
          {
            triggerWhenAdded,
            triggerWhenChanged,
            triggerWhenDeleted,
            triggerWhenRemoved,
            triggerWhenUndeleted,
          },
          "task",
        ),
      });
    },
    delete: async (context, params) => {
      const endpoint = context.webhookUrls[context.flow.name];
      await deleteWebhook({
        asanaConnection: params.asanaConnection,
        endpoint,
        resourceId: params.projectId,
      });
    },
  },
});
const storiesTrigger = trigger({
  display: {
    label: "Comments and Activity",
    description:
      "Receive comment and activity notifications from Asana. Automatically creates and manages a webhook subscription for story events in the selected project.",
  },
  allowsBranching: true,
  staticBranchNames: ["Notification", "URL Verify"],
  examplePayload: storiesTriggerExamplePayload,
  inputs: storiesTriggerInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  perform: performFunction,
  webhookLifecycleHandlers: {
    create: async (
      context,
      {
        triggerWhenAdded,
        triggerWhenChanged,
        triggerWhenDeleted,
        triggerWhenRemoved,
        triggerWhenUndeleted,
        asanaConnection,
        projectId,
      },
    ) => {
      const endpoint = context.webhookUrls[context.flow.name];
      await createWebhook({
        asanaConnection: asanaConnection,
        endpoint,
        resourceId: projectId,
        filters: getFilters(
          {
            triggerWhenAdded,
            triggerWhenChanged,
            triggerWhenDeleted,
            triggerWhenRemoved,
            triggerWhenUndeleted,
          },
          "story",
        ),
      });
    },
    delete: async (context, params) => {
      const endpoint = context.webhookUrls[context.flow.name];
      await deleteWebhook({
        asanaConnection: params.asanaConnection,
        endpoint,
        resourceId: params.projectId,
      });
    },
  },
});
export default {
  projectTasksTrigger,
  workspaceProjectsTrigger,
  storiesTrigger,
};
