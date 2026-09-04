import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestMarkupFilesExamplePayload } from "../../examplePayloads";
import { listRequestMarkupFilesInputs } from "../../inputs";
import { listRequestMarkupFilesOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestMarkupFiles = action({
  display: {
    label: "List Request Markup Files",
    description:
      "List all markup files attached to a request in Arena PLM system.",
  },
  inputs: listRequestMarkupFilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listRequestMarkupFilesOutputSchema,
  }),
  examplePayload: listRequestMarkupFilesExamplePayload,
  perform: async (context, { connection, requestGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Fetching markup files for request: ${requestGuid}`);
      const { data } = await client.get(`/requests/${requestGuid}/markupfiles`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} markup files for request`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Request Markup Files");
    }
  },
});
