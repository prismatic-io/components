import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, organization, scope, user } from "../../inputs";
import { deleteWebhookInstance } from "../../util";

export const deleteInstancedWebhooks = action({
  display: {
    label: "Delete Instanced Webhooks",
    description: "Delete all webhooks that point to a flow in this instance.",
  },
  perform: async (context, { connection, organization, scope, user }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const endpoint = context.webhookUrls[context.flow.name];
    return {
      
      data: await deleteWebhookInstance(
        client,
        endpoint,
        organization,
        user,
        scope,
      ),
    };
  },
  inputs: {
    connection,
    organization: {
      ...organization,
      required: true,
      dataSource: "organizations",
      comments: "Organization to delete webhooks from",
    },
    scope: {
      ...scope,
      required: true,
      comments: "Organization or user webhooks to delete",
    },
    user: {
      ...user,
      comments:
        "User to delete webhooks from. Required if scope is set to user.",
    },
  },
});
