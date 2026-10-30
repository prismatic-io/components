import { action, outputSchema } from "@prismatic-io/spectral";
import { createV3Client } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import { listWebhooksOutputSchema } from "../../outputSchemas";
import { getPaginatedData, isBasicAuth } from "../../util";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description:
      "List all configured webhooks, including those for other integrations.",
  },
  inputs: listWebhooksInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const useBasicAuth = isBasicAuth(params.jiraConnection);
    const client = await createV3Client(
      params.jiraConnection,
      context.debug.enabled,
      useBasicAuth,
    );

    const { data } = await getPaginatedData(
      client,
      "/webhook",
      params.fetchAll,
      useBasicAuth,
    );
    return { data };
  },
  examplePerform: async () => listWebhooksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksOutputSchema,
  }),
  examplePayload: listWebhooksExamplePayload,
});
