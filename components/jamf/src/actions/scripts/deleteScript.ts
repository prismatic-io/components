import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteScriptExamplePayload } from "../../examplePayloads";
import { deleteScriptInputs } from "../../inputs";

export const deleteScript = action({
  display: {
    label: "Delete Script",
    description: "Delete a script by ID.",
  },
  inputs: deleteScriptInputs,
  perform: async (context, { connection, resourceId }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.delete(`/v1/scripts/${resourceId}`);
    return { data: `Successfully deleted script ${resourceId}` };
  },
  examplePayload: deleteScriptExamplePayload,
});
