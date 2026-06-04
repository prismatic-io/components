import { action } from "@prismatic-io/spectral";
import { deleteInstanceWebhooksInputs } from "../../inputs";
import { deleteInstanceWebhooksgql } from "../graphql/webhooks/deleteInstanceWebhooks";

export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description: "Deletes all webhooks related to the current instance.",
  },
  inputs: deleteInstanceWebhooksInputs,
  perform: async (context, params) => {
    const { data } = await deleteInstanceWebhooksgql.perform(context, {
      shopifyConnection: params.shopifyConnection,
    });

    return { data };
  },
});
