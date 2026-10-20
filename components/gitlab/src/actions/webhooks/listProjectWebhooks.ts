import { action, outputSchema } from "@prismatic-io/spectral";
import { createGitlabClient } from "../../client";
import { listProjectWebhooksExamplePayload } from "../../examplePayloads";
import { listProjectWebhooksInputs } from "../../inputs";
import { listProjectWebhooksOutputSchema } from "../../outputSchemas";
import { listRecords } from "../../utils";
export const listProjectWebhooks = action({
  display: {
    label: "List Project Webhooks",
    description: "List the webhooks configured on a project.",
  },
  inputs: listProjectWebhooksInputs,
  performSafety: "notAllowed",
  perform: async (context, { connection, project, fetchAll, pagination }) => {
    const client = createGitlabClient(
      connection,
      context.debug.enabled && context.logger,
    );
    const data = await listRecords(client, `/projects/${project}/hooks`, {
      fetchAll,
      ...pagination,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => listProjectWebhooksExamplePayload,
  examplePayload: listProjectWebhooksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listProjectWebhooksOutputSchema,
  }),
});
