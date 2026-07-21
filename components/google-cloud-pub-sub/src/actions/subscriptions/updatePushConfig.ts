import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  projectId,
  pushConfiguration,
  subscription,
  subscriptionNameOrFullFormat,
} from "../../inputs";
export const updatePushConfig = action({
  display: {
    label: "Update Push Config",
    description:
      "This may be used to change a push subscription to a pull one (signified by an empty PushConfig) or vice versa, or change the endpoint URL and other attributes of a push subscription.",
  },
  inputs: {
    connectionInput,
    projectId,
    subscription,
    subscriptionNameOrFullFormat,
    pushConfiguration,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      subscription,
      pushConfiguration,
      subscriptionNameOrFullFormat,
    },
  ) => {
    const client = createClient(connectionInput);
    const subscriptionName = subscriptionNameOrFullFormat
      ? subscription
      : `projects/${projectId}/subscriptions/${subscription}`;
    const { data } = await client.projects.subscriptions.modifyPushConfig({
      subscription: subscriptionName,
      requestBody: {
        pushConfig: {
          pushEndpoint: pushConfiguration.pushEndpoint || undefined,
          attributes: pushConfiguration.attributes || undefined,
          oidcToken: pushConfiguration.oidcToken || undefined,
        },
      },
    });
    return {
      data,
    };
  },
});
