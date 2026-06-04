import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  maxMessages,
  projectId,
  returnImmediately,
  subscription,
  subscriptionNameOrFullFormat,
} from "../../inputs";

export const pullMessages = action({
  display: {
    label: "Pull Messages",
    description: "Pulls messages from the server.",
  },
  inputs: {
    connectionInput,
    projectId,
    subscription,
    subscriptionNameOrFullFormat,
    maxMessages,
    returnImmediately,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      subscription,
      returnImmediately,
      maxMessages,
      subscriptionNameOrFullFormat,
    },
  ) => {
    const client = createClient(connectionInput);
    const subscriptionName = subscriptionNameOrFullFormat
      ? subscription
      : `projects/${projectId}/subscriptions/${subscription}`;
    const { data } = await client.projects.subscriptions.pull({
      subscription: subscriptionName,
      requestBody: {
        returnImmediately: returnImmediately || undefined,
        maxMessages: maxMessages || undefined,
      },
    });
    return {
      data,
    };
  },
});
