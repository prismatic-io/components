import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, formId } from "../../inputs";
import { listWebhooksResponse } from "../../examplePayloads/webhooks";
import { listAllWebhooks } from "../../util";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Retrieve all webhooks for the specified Typeform.",
  },
  inputs: {
    formId,
    connection,
  },
  perform: async (context, { connection, formId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await listAllWebhooks(client, formId);
    return {
      data,
    };
  },
  examplePayload: {
    data: listWebhooksResponse,
  },
});
