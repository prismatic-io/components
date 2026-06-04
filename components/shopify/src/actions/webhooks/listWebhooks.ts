import { action } from "@prismatic-io/spectral";
import { MAX_LIMIT } from "../../constants";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooksExamplePayload } from "../../payloadExamples";
import { listWebhooksGql } from "../graphql/webhooks/listWebhooks";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Lists all webhooks or webhooks for the current instance.",
  },
  inputs: listWebhooksInputs,
  perform: async (context, params) => {
    const { data } = await listWebhooksGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      showOnlyInstanceWebhooks: params.showOnlyInstanceWebhooks,
      getAlldata: true,
      limit: MAX_LIMIT,
      endCursor: undefined,
      callbackUrl: undefined,
    });

    return { data };
  },
  examplePayload: { data: listWebhooksExamplePayload },
});
