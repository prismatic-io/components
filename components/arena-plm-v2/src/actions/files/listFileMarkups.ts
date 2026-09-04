import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listFileMarkupsExamplePayload } from "../../examplePayloads";
import { listFileMarkupsInputs } from "../../inputs";
import { listFileMarkupsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listFileMarkups = action({
  display: {
    label: "List File Markups",
    description: "Retrieve all markup file associations for a file.",
  },
  inputs: listFileMarkupsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listFileMarkupsOutputSchema,
  }),
  examplePayload: listFileMarkupsExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(`/files/${params.fileGuid}/markups`);
      return { data };
    } catch (error: unknown) {
      handleArenaError(error, context.logger, "List File Markups");
    }
  },
});
