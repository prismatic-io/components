import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteMailFolderOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { deleteMailFolderExamplePayload } from "../../examplePayloads";
import { deleteMailFolderInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const deleteMailFolder = action({
  display: {
    label: "Delete Mail Folder",
    description: "Deletes the specified mail folder.",
  },
  inputs: deleteMailFolderInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      `/me/mailFolders/${params.folderId}`,
    );
    await client.delete(url);
    return {
      data: { success: true, id: params.folderId, message: "Mail folder deleted successfully" },
    };
  },
  examplePerform: async () => deleteMailFolderExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteMailFolderOutputSchema,
  }),
  examplePayload: deleteMailFolderExamplePayload,
});
