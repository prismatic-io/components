import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../examplePayloads";
import { connectionInput } from "../../inputs";
import { deleteInstanceWebhooks } from "../../util";

export const deleteAllInstanceWebhooks = action({
  display: {
    label: "Delete All Instance Webhooks",
    description: "Delete all webhook subscriptions associated with this instance.",
  },
  perform: async (context, { connection }) => {
    await deleteInstanceWebhooks(createClient(connection), context.webhookUrls);
    return {
      data: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
    };
  },
  inputs: {
    connection: connectionInput,
  },
});
