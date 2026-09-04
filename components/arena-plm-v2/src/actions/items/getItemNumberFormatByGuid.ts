import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getItemNumberFormatByGuidExamplePayload } from "../../examplePayloads";
import { getItemNumberFormatByGuidInputs } from "../../inputs";
import { getItemNumberFormatByGuidOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getItemNumberFormatByGuid = action({
  display: {
    label: "Get Item Number Format by GUID",
    description:
      "Get details of a specific item number format by GUID from Arena PLM system.",
  },
  inputs: getItemNumberFormatByGuidInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getItemNumberFormatByGuidOutputSchema,
  }),
  examplePayload: getItemNumberFormatByGuidExamplePayload,
  perform: async (context, { connection, guid }) => {
    try {
      const client = await createArenaClient(context, connection);
      context.logger.info(`Fetching item number format by GUID: ${guid}`);
      const { data } = await client.get(
        `/settings/items/numberformats/${guid}`,
      );
      context.logger.info(
        `Successfully retrieved item number format: ${data?.name || guid}`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "Get Item Number Format by GUID");
    }
  },
});
