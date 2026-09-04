import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getItemNumberFormatFieldExamplePayload } from "../../examplePayloads";
import { getItemNumberFormatFieldInputs } from "../../inputs";
import { numberFormatFieldFullSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getItemNumberFormatField = action({
  display: {
    label: "Get Item Number Format Field",
    description:
      "Get details of a specific field for an item number format from Arena PLM system.",
  },
  inputs: getItemNumberFormatFieldInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: numberFormatFieldFullSchema,
  }),
  examplePayload: getItemNumberFormatFieldExamplePayload,
  perform: async (context, { connection, formatGuid, fieldGuid }) => {
    try {
      context.logger.info(
        `Getting item number format field ${fieldGuid} for format ${formatGuid}`,
        {
          formatGuid,
          fieldGuid,
        },
      );
      const client = await createArenaClient(context, connection);
      const { data } = await client.get(
        `/settings/items/numberformats/${formatGuid}/fields/${fieldGuid}`,
      );
      context.logger.info(`Retrieved item number format field ${fieldGuid}`, {
        formatGuid,
        fieldGuid,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        `Get Item Number Format Field (${fieldGuid})`,
      );
    }
  },
});
