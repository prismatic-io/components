import type { ActionContext, Connection } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { ENDPOINTS } from "../constants";

export const onInstanceDeploy = async (
  context: ActionContext,
  {
    connection,
    events,
    webhookDescription,
    filterId,
    filterType,
  }: {
    connection: Connection;
    events: string[];
    webhookDescription: string;
    filterId: string;
    filterType: string;
  },
) => {
  const client = createClient(connection);
  const webhookUrl = context.webhookUrls[context.flow.name];

  const payload = {
    webhook_subscription: {
      delivery_method: {
        type: "http_delivery_method",
        url: webhookUrl,
      },
      events,
      type: "webhook_subscription",
      description: webhookDescription,
      filter: {
        id: filterId,
        type: filterType,
      },
    },
  };

  await client.post(ENDPOINTS.WEBHOOK_SUBSCRIPTIONS, payload);
  return;
};
