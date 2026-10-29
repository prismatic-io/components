import { action, outputSchema } from "@prismatic-io/spectral";
import { MAX_LIMIT } from "../../constants";
import {
  listWebhooksPayload,
  restListWebhooksExamplePayload,
} from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooksOutputSchema } from "../../outputSchemas";
import { listWebhooksGql } from "../graphql/webhooks/listWebhooksGql";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Lists all webhooks or webhooks for the current instance.",
  },
  inputs: listWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const { data } = await listWebhooksGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      showOnlyInstanceWebhooks: params.showOnlyInstanceWebhooks,
      getAlldata: true,
      pagination: {
        limit: MAX_LIMIT,
        endCursor: undefined,
      },
      callbackUrl: undefined,
    });

    return { data };
  },
  examplePerform: async () => ({
    data: restListWebhooksExamplePayload,
  }),
  examplePayload: listWebhooksPayload,
});
