import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listItemTrainingRecordsExamplePayload } from "../../examplePayloads";
import { listItemTrainingRecordsInputs } from "../../inputs";
import { listItemTrainingRecordsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listItemTrainingRecords = action({
  display: {
    label: "List Item Training Records",
    description: "Retrieve training records for an item.",
  },
  inputs: listItemTrainingRecordsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listItemTrainingRecordsOutputSchema,
  }),
  examplePayload: listItemTrainingRecordsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/items/${util.types.toString(params.itemGuid)}/trainingrecords`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Item Training Records");
    }
  },
});
