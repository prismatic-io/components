import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, formId, tag } from "../../inputs";
import { DELETED_RESOURCE } from "../../constants";
import { genericDeleteResponse } from "../../examplePayloads/general";
import { deleteWebhookFunction } from "../../util";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook.",
  },
  inputs: {
    formId,
    tag,
    connection,
  },
  perform: async (context, { connection, formId, tag }) => {
    const client = createClient(connection, context.debug.enabled);

    await deleteWebhookFunction({
      client,
      formId,
      tag,
    });
    return {
      data: {
        message: DELETED_RESOURCE,
      },
    };
  },
  examplePayload: {
    data: genericDeleteResponse,
  },
});
