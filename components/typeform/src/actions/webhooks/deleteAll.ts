import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, formId, url } from "../../inputs";
import { deleteWebhookFunction, listAllWebhooks } from "../../util";
import { DELETED_RESOURCE, NO_WEBHOOKS_FOUND } from "../../constants";

export const deleteAllInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description:
      "Delete all webhooks from a form for the instance url provided.",
  },
  inputs: {
    formId,
    url: {
      ...url,
      label: "Instance URL",
      comments:
        "The instance URL to delete all webhooks from, if not provided, all webhooks from the current flow will be deleted.",
      required: false,
    },
    connection,
  },
  perform: async (context, { connection, formId, url }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await listAllWebhooks(client, formId);
    const webhookUrl = url ? url : context.webhookUrls[context.flow.name];
    const webhooks = data.items.filter((webhook) => webhook.url === webhookUrl);
    if (!webhooks.length) {
      return {
        data: NO_WEBHOOKS_FOUND,
      };
    }
    await Promise.all(
      webhooks.map(async (webhook) =>
        deleteWebhookFunction({ client, formId, tag: webhook.tag }),
      ),
    );
    return {
      data: DELETED_RESOURCE,
    };
  },
  examplePayload: {
    data: DELETED_RESOURCE,
  },
});
