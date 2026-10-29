import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { deleteInstancedWebhooksExamplePayload } from "../../examplePayloads";
import { deleteInstancedWebhooksInputs } from "../../inputs";
import { deleteInstancedWebhooksOutputSchema } from "../../outputSchemas";
import { removeHooks } from "../../utils";

export const deleteInstancedWebhooks = action({
  display: {
    label: "Delete Instanced Webhooks",
    description:
      "Delete webhooks in the selected projects that point at any of this instance's flow URLs.",
  },
  inputs: deleteInstancedWebhooksInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, projects }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const deleted = await removeHooks(
      client,
      Object.values(context.webhookUrls),
      undefined,
      projects,
    );
    return { data: { deleted } };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    deleteInstancedWebhooksExamplePayload,
  examplePayload: deleteInstancedWebhooksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInstancedWebhooksOutputSchema,
  }),
});
