import { action } from "@prismatic-io/spectral";
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
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const url = computeEndpointBasedOnConnection(
      params.connection,
      `/me/mailFolders/${params.folderId}`,
    );
    const { data } = await client.delete(url);
    return { data };
  },
  examplePayload: deleteMailFolderExamplePayload,
});
