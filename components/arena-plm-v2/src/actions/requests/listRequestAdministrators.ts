import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listRequestAdministratorsExamplePayload } from "../../examplePayloads";
import { listRequestAdministratorsInputs } from "../../inputs";
import { userCompactListSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listRequestAdministrators = action({
  display: {
    label: "List Request Administrators",
    description: "List administrators for requests in Arena PLM system.",
  },
  inputs: listRequestAdministratorsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: userCompactListSchema,
  }),
  examplePayload: listRequestAdministratorsExamplePayload,
  perform: async (context, { connection }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info("Fetching request administrators from Arena");
      const { data } = await client.get("/settings/requests/administrators");
      context.logger.info(
        `Successfully retrieved ${data?.count || 0} request administrators`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Request Administrators");
    }
  },
});
