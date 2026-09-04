import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { createItemNumberFormatFieldExamplePayload } from "../../examplePayloads";
import { createItemNumberFormatFieldInputs } from "../../inputs";
import { numberFormatFieldFullSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const createItemNumberFormatField = action({
  display: {
    label: "Create Item Number Format Field",
    description:
      "Add a new field to a specific item number format in Arena PLM system.",
  },
  inputs: createItemNumberFormatFieldInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: numberFormatFieldFullSchema,
  }),
  examplePayload: createItemNumberFormatFieldExamplePayload,
  perform: async (context, { connection, formatGuid, fieldData }) => {
    try {
      context.logger.info(
        `Creating item number format field for format ${formatGuid}`,
        {
          formatGuid,
          fieldDataKeys: Object.keys(fieldData),
        },
      );
      const client = await createArenaClient(context, connection);
      const { data } = await client.post(
        `/settings/items/numberformats/${formatGuid}/fields`,
        fieldData,
      );
      context.logger.info("Created item number format field", {
        formatGuid,
        fieldGuid: data?.guid,
      });
      return { data };
    } catch (error: unknown) {
      handleArenaError(
        error,
        context.logger,
        `Create Item Number Format Field (${formatGuid})`,
      );
    }
  },
});
