import { action, util } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listChangeFilesExamplePayload } from "../../examplePayloads";
import { listChangeFilesInputs } from "../../inputs";
import { handleArenaError } from "../../util";
export const listChangeFiles = action({
  display: {
    label: "List Change Files",
    description: "List all files attached to a change.",
  },
  inputs: listChangeFilesInputs,
  examplePayload: listChangeFilesExamplePayload,
  perform: async (context, params) => {
    try {
      const client = await createArenaClient(context, params.connection);
      const { data } = await client.get(
        `/changes/${util.types.toString(params.changeGuid)}/files`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Change Files");
    }
  },
});
