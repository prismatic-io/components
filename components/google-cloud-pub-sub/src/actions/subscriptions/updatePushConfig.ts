import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  attributes,
  connectionInput,
  oidcToken,
  projectId,
  pushEndpoint,
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
    pushEndpoint,
    attributes,
    oidcToken,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      subscription,
      pushEndpoint,
      attributes,
      oidcToken,
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
          pushEndpoint: pushEndpoint || undefined,
          attributes: attributes || undefined,
          oidcToken: oidcToken || undefined,
        },
      },
    });
    return {
      data,
    };
  },
});
