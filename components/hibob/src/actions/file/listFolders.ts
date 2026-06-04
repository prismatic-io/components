import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { listFoldersExamplePayload } from "../../examplePayloads";
import { listFoldersInputs } from "../../inputs";

export const listFolders = action({
  display: {
    label: "List Folders",
    description: "Retrieves a list of all document folders in the system.",
  },
  perform: async (context, { connection }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.get("/docs/folders/metadata");
    return {
      data,
    };
  },
  inputs: listFoldersInputs,
  examplePayload: listFoldersExamplePayload,
});
