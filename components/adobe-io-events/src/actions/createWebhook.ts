import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { createWebhookExamplePayload } from "../examplePayloads";
import { requestErrorHandler } from "../helpers";
import {
  connection,
  consumerOrgId,
  deliveryType,
  description,
  enabled,
  eventsOfInterest,
  name,
  projectId,
  runtimeAction,
  webhookUrl,
  workspaceId,
} from "../inputs";
import type { EventOfInterest } from "../types/EventOfInterest";
import type { Registration } from "../types/Registration";

export const createWebhook = action({
  display: {
    label: "Create Webhook/Journal Registration",
    description: "Create a Webhook/Journal registration for given workspace",
  },
  examplePayload: createWebhookExamplePayload,
  perform: async (
    context,
    {
      connection,
      consumerOrgId,
      projectId,
      workspaceId,
      name,
      description,
      webhookUrl,
      eventsOfInterest,
      deliveryType,
      runtimeAction,
      enabled,
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    let parsedEventsOfInterest: EventOfInterest[];
    try {
      parsedEventsOfInterest = JSON.parse(
        eventsOfInterest,
      ) as EventOfInterest[];
    } catch (_error) {
      throw new Error("Events of Interest must be valid JSON");
    }

    const body: Registration = {
      client_id: connection.fields?.clientId as string,
      name,
      description,
      webhook_url: webhookUrl,
      events_of_interest: parsedEventsOfInterest,
      delivery_type: deliveryType,
      ...(runtimeAction && { runtime_action: runtimeAction }),
      enabled: enabled as boolean,
    };
    try {
      const { data } = await client.post(
        `/${consumerOrgId}/${projectId}/${workspaceId}/registrations`,
        body,
        { headers: { "Content-Type": "application/json" } },
      );
      return { data };
    } catch (error) {
      requestErrorHandler(error);
    }
  },
  inputs: {
    connection,
    consumerOrgId,
    projectId,
    workspaceId,
    name,
    description: {
      ...description,
      label: "Registration Description",
      comments: "The description of this registration",
      required: true,
    },
    webhookUrl,
    eventsOfInterest,
    deliveryType,
    runtimeAction,
    enabled,
  },
});
