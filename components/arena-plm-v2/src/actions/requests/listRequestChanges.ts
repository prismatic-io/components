import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestChangesExamplePayload } from "../../examplePayloads";
import { listRequestChangesInputs } from "../../inputs";
import { requestChangeListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestChanges = action({
  display: {
    label: "List Request Changes",
    description:
      "List all changes associated with a request in Arena PLM system.",
  },
  inputs: listRequestChangesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: requestChangeListSchema,
  }),
  examplePayload: listRequestChangesExamplePayload,
  perform: async (context, { connection, requestGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Fetching changes for request: ${requestGuid}`);
      const { data } = await client.get(`/requests/${requestGuid}/changes`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} changes for request`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Request Changes");
    }
  },
});
