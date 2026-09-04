import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemNumberFormatFieldsExamplePayload } from "../../examplePayloads";
import { listItemNumberFormatFieldsInputs } from "../../inputs";
import { listItemNumberFormatFieldsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listItemNumberFormatFields = action({
  display: {
    label: "List Item Number Format Fields",
    description:
      "List all fields for a specific item number format from Arena PLM system.",
  },
  inputs: listItemNumberFormatFieldsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemNumberFormatFieldsOutputSchema,
  }),
  examplePayload: listItemNumberFormatFieldsExamplePayload,
  perform: async (context, { connection, formatGuid }) => {
    try {
      context.logger.info(
        `Getting item number format fields for format ${formatGuid}`,
        {
          formatGuid,
        },
      );
      const client = await createArenaClient(context, connection);
      const { data } = await client.get(
        `/settings/items/numberformats/${formatGuid}/fields`,
      );
      context.logger.info("Retrieved item number format fields", {
        formatGuid,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        `List Item Number Format Fields (${formatGuid})`,
      );
    }
  },
});
