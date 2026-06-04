import type {
  ActionContext,
  TriggerPayload,
  Connection,
} from "@prismatic-io/spectral";
import { trigger, util } from "@prismatic-io/spectral";
import {
  createWebhook,
  deleteWebhook,
  getAdditionalData,
  getFilters,
  isHeartbeatData,
  resolveWebhookSecret,
  validateHmac,
  webhookSecretStateKey,
} from "./utils";
import {
  projectTasksTriggerExamplePayload,
  storiesTriggerExamplePayload,
  workspaceProjectsTriggerExamplePayload,
} from "../examplePayloads";
import {
  connectionInput,
  projectId,
  workspaceId,
  triggerWhenAdded,
  triggerWhenChanged,
  triggerWhenDeleted,
  triggerWhenRemoved,
  triggerWhenUndeleted,
} from "../inputs";
import { WEBHOOK_SECRET_LEGACY_KEY } from "../constants";

const performFunction = async (
  context: ActionContext,
  payload: TriggerPayload,
  inputs: { asanaConnection: Connection },
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
  inputs: {
    asanaConnection: connectionInput,
    workspaceId,
    triggerWhenAdded: {
      ...triggerWhenAdded,
      comments:
        "Determines if the webhook will trigger when a project is added.",
    },
    triggerWhenChanged: {
      ...triggerWhenChanged,
      comments:
        "Determines if the webhook will trigger when a project is changed.",
    },
    triggerWhenDeleted: {
      ...triggerWhenDeleted,
      comments:
        "Determines if the webhook will trigger when a project is deleted.",
    },
    triggerWhenRemoved: {
      ...triggerWhenRemoved,
      comments:
        "Determines if the webhook will trigger when a project is removed.",
    },
    triggerWhenUndeleted: {
      ...triggerWhenUndeleted,
      comments:
        "Determines if the webhook will trigger when a project is undeleted.",
    },
  },
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
  inputs: {
    asanaConnection: connectionInput,
    projectId,
    triggerWhenAdded: {
      ...triggerWhenAdded,
      comments: "Determines if the webhook will trigger when a task is added.",
    },
    triggerWhenChanged: {
      ...triggerWhenChanged,
      comments:
        "Determines if the webhook will trigger when a task is changed.",
    },
    triggerWhenDeleted: {
      ...triggerWhenDeleted,
      comments:
        "Determines if the webhook will trigger when a task is deleted.",
    },
    triggerWhenRemoved: {
      ...triggerWhenRemoved,
      comments:
        "Determines if the webhook will trigger when a task is removed.",
    },
    triggerWhenUndeleted: {
      ...triggerWhenUndeleted,
      comments:
        "Determines if the webhook will trigger when a task is undeleted.",
    },
  },
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
  inputs: {
    asanaConnection: connectionInput,
    projectId,
    triggerWhenAdded: {
      ...triggerWhenAdded,
      comments:
        "Determines if the webhook will trigger when a comment or activity is added.",
    },
    triggerWhenChanged: {
      ...triggerWhenChanged,
      comments:
        "Determines if the webhook will trigger when a comment or activity is changed.",
    },
    triggerWhenDeleted: {
      ...triggerWhenDeleted,
      comments:
        "Determines if the webhook will trigger when a comment or activity is deleted.",
    },
    triggerWhenRemoved: {
      ...triggerWhenRemoved,
      comments:
        "Determines if the webhook will trigger when a comment or activity is removed.",
    },
    triggerWhenUndeleted: {
      ...triggerWhenUndeleted,
      comments:
        "Determines if the webhook will trigger when a comment or activity is undeleted.",
    },
  },
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
