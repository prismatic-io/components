import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listFileCorrectionsExamplePayload } from "../../examplePayloads";
import { listFileCorrectionsInputs } from "../../inputs";
import { listFileCorrectionsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listFileCorrections = action({
  display: {
    label: "List File Corrections",
    description: "Retrieve all file correction information of a file.",
  },
  inputs: listFileCorrectionsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFileCorrectionsOutputSchema,
  }),
  examplePayload: listFileCorrectionsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/files/${params.fileGuid}/corrections`,
      );
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List File Corrections");
    }
  },
});
