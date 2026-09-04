import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listQualityProcessOwnersExamplePayload } from "../../examplePayloads";
import { listQualityProcessOwnersInputs } from "../../inputs";
import { listQualityProcessOwnersOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listQualityProcessOwners = action({
  display: {
    label: "List Quality Process Owners",
    description:
      "List users who can be assigned as quality process owners from Arena PLM system.",
  },
  inputs: listQualityProcessOwnersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listQualityProcessOwnersOutputSchema,
  }),
  examplePayload: listQualityProcessOwnersExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get("/settings/qualityprocesses/owners");
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Quality Process Owners");
    }
  },
});
