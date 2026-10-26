import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteInstanceWebhooksInputs } from "../../inputs";
import { deleteInstanceWebhooksOutputSchema } from "../../outputSchemas";
import { deleteInstanceWebhooksgql } from "../graphql/webhooks/deleteInstanceWebhooksgql";
export const deleteInstanceWebhooks = action({
  display: {
    label: "Delete Instance Webhooks",
    description: "Deletes all webhooks related to the current instance.",
  },
  inputs: deleteInstanceWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInstanceWebhooksOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const { data } = await deleteInstanceWebhooksgql.perform(context, {
      shopifyConnection: params.shopifyConnection,
    });
    return { data };
  },
});
