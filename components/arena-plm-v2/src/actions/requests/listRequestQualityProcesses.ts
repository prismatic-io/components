import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestQualityProcessesExamplePayload } from "../../examplePayloads";
import { listRequestQualityProcessesInputs } from "../../inputs";
import { changeQualityAssociationListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestQualityProcesses = action({
  display: {
    label: "List Request Quality Processes",
    description:
      "List all quality processes linked to a request in Arena PLM system.",
  },
  inputs: listRequestQualityProcessesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: changeQualityAssociationListSchema,
  }),
  examplePayload: listRequestQualityProcessesExamplePayload,
  perform: async (context, { connection, requestGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(
        `Fetching quality processes for request: ${requestGuid}`,
      );
      const { data } = await client.get(`/requests/${requestGuid}/quality`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} quality processes for request`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Request Quality Processes");
    }
  },
});
