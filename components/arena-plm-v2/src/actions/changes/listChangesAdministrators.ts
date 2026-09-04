import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangesAdministratorsExamplePayload } from "../../examplePayloads";
import { listChangesAdministratorsInputs } from "../../inputs";
import { userCompactListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listChangesAdministrators = action({
  display: {
    label: "List Change Administrators",
    description:
      "List all administrators for changes or requests in Arena PLM system.",
  },
  inputs: listChangesAdministratorsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: userCompactListSchema,
  }),
  examplePayload: listChangesAdministratorsExamplePayload,
  perform: async (context, { connection, objectType }) => {
    try {
      const client = await createArenaClient(context, connection);
      const type = objectType || "changes";
      context.logger.info(`Fetching ${type} administrators from Arena`);
      const { data } = await client.get(`/settings/${type}/administrators`);
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} ${type} administrators`,
      );
      return { data };
    } catch (error) {
      context.logger.error("Error fetching administrators", {
        error: error instanceof Error ? error.message : error,
      });
      handleArenaError(error, context.logger, "List Change Administrators");
    }
  },
});
