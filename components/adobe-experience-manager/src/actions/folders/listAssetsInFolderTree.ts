import { action, outputSchema } from "@prismatic-io/spectral";
import { createAemClient } from "../../client";
import { MAX_FOLDER_WALK } from "../../constants";
import { listAssetsInFolderTreeExamplePayload } from "../../examplePayloads";
import { listAssetsInFolderTreeInputs } from "../../inputs";
import { listAssetsInFolderTreeOutputSchema } from "../../outputSchemas";
import { walkFolderTree } from "../../utils";

export const listAssetsInFolderTree = action({
  display: {
    label: "List Assets in Folder Tree",
    description: "List every asset in a folder and all of its subfolders.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, path }) => {
    const client = createAemClient(connection, context.debug.enabled);
    const { assets, truncated } = await walkFolderTree(client, path, { collectAssets: true });
    if (truncated) {
      throw new Error(
        `The folder tree under ${path} has more than ${MAX_FOLDER_WALK} folders. Choose a narrower folder path.`,
      );
    }
    return { data: assets };
  },
  inputs: listAssetsInFolderTreeInputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: listAssetsInFolderTreeOutputSchema }),
  examplePerform: async () => listAssetsInFolderTreeExamplePayload,
  examplePayload: listAssetsInFolderTreeExamplePayload,
});
