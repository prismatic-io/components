import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  projectId,
  subscription,
  subscriptionNameOrFullFormat,
} from "../../inputs";

export const getSubscription = action({
  display: {
    label: "Get Subscription",
    description: "Gets the configuration details of a subscription.",
  },
  inputs: {
    connectionInput,
    projectId,
    subscription,
    subscriptionNameOrFullFormat,
  },
  perform: async (
    _context,
    { connectionInput, projectId, subscription, subscriptionNameOrFullFormat },
  ) => {
    const client = createClient(connectionInput);
    const subscriptionName = subscriptionNameOrFullFormat
      ? subscription
      : `projects/${projectId}/subscriptions/${subscription}`;
    const { data } = await client.projects.subscriptions.get({
      subscription: subscriptionName,
    });
    return {
      data,
    };
  },
});
