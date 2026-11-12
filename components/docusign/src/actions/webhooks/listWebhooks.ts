import { action, outputSchema } from "@prismatic-io/spectral";
import { listWebhooksOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { listWebhooksInputs } from "../../inputs";
import { getWebhooks } from "../../util";
import { listWebhooksExamplePayload } from "../../examplePayloads";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Retrieve all webhooks.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const data = await getWebhooks(client);
    return { data };
  },
  examplePerform: async () => listWebhooksExamplePayload,
  inputs: listWebhooksInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksOutputSchema,
  }),
  examplePayload: listWebhooksExamplePayload,
});
