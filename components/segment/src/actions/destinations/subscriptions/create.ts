import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  actionId,
  connectionInput,
  destinationId,
  enabled,
  modelId,
  name,
  region,
  settings,
  trigger,
} from "../../../inputs";
import { getDestinationSubscriptionExamplePayload } from "../../../examplePayloads";

export const createDestinationSubscription = action({
  display: {
    label: "Create Destination Subscription",
    description: "Creates a new Destination subscription.",
  },
  inputs: {
    connectionInput,
    region,
    destinationId,
    name: {
      ...name,
      comments: "The user-defined name for the subscription.",
      required: true,
    },
    actionId,
    trigger: {
      ...trigger,
      required: true,
    },
    enabled: {
      ...enabled,
      comments: "Is the subscription enabled.",
      required: true,
    },
    settings,
    modelId,
  },
  perform: async (
    context,
    {
      connectionInput,
      region,
      destinationId,
      enabled,
      name,
      settings,
      trigger,
      modelId,
    },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.post(
      `/destinations/${destinationId}/subscriptions`,
      {
        enabled: enabled || undefined,
        name: name || undefined,
        settings: settings || undefined,
        trigger: trigger || undefined,
        modelId: modelId || undefined,
      },
      {
        headers: {
          "Content-Type": "application/vnd.segment.v1alpha+json",
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getDestinationSubscriptionExamplePayload,
  },
});
