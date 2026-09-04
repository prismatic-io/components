import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { updateQualityProcessExamplePayload } from "../../examplePayloads";
import { updateQualityProcessInputs } from "../../inputs";
import { qualityProcessSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const updateQualityProcess = action({
  display: {
    label: "Update Quality Process",
    description:
      "Updates the metadata of a Quality Process object with a given GUID in Arena PLM system.",
  },
  inputs: updateQualityProcessInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: qualityProcessSchema,
  }),
  examplePayload: updateQualityProcessExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.put(
        `/qualityprocesses/${params.qualityProcessGuid}`,
        params.data,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Update Quality Process");
    }
  },
});
