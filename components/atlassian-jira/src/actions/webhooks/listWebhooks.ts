import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../connections/auth";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { connectionInput, fetchAll } from "../../inputs";
import { getPaginatedData, isBasicAuth } from "../../util";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all configured webhooks, including those for other integrations.",
  },
  inputs: {
    jiraConnection: connectionInput,
    fetchAll,
  },
  perform: async (context, params) => {
    const useBasicAuth = isBasicAuth(params.jiraConnection);
    const client = await createV3Client(params.jiraConnection, context.debug.enabled, useBasicAuth);

    const { data } = await getPaginatedData(client, "/webhook", params.fetchAll, useBasicAuth);
    return { data };
  },
  examplePayload: listWebhooksExamplePayload,
});
