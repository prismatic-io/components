import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemRequirementsExamplePayload } from "../../examplePayloads";
import { listItemRequirementsInputs } from "../../inputs";
import { listItemRequirementsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listItemRequirements = action({
  display: {
    label: "List Item Requirements",
    description:
      "List all compliance requirements for items from Arena PLM system.",
  },
  inputs: listItemRequirementsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemRequirementsOutputSchema,
  }),
  examplePayload: listItemRequirementsExamplePayload,
  perform: async (context, { connection }) => {
    try {
      context.logger.info("Getting item requirements");
      const client = await createArenaClient(context, connection);
      const { data } = await client.get("/settings/items/requirements");
      context.logger.info(`Retrieved ${data?.count || 0} item requirements`, {
        count: data?.count,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List Item Requirements");
    }
  },
});
