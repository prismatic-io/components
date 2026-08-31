import { action, outputSchema } from "@prismatic-io/spectral";
import { createBoxHttpClient } from "../../client";
import { SHARED_LINK_FIELD } from "../../constants";
import { removeSharedLinkFromFolderExamplePayload } from "../../examplePayloads";
import { removeSharedLinkFromFolderInputs } from "../../inputs";
import { removeSharedLinkFromFolderOutputSchema } from "../../outputSchemas";
export const removeSharedLinkFromFolder = action({
  display: {
    label: "Remove Shared Link from Folder",
    description: "Removes a shared link from a folder.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const folderId = params.folderId;
    const client = createBoxHttpClient(
      params.boxConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/folders/${folderId}`,
      {
        shared_link: null,
      },
      {
        params: {
          fields: SHARED_LINK_FIELD,
        },
      },
    );
    return {
      data,
    };
  },
  examplePerform: async (
    _context,
    { folderId },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...removeSharedLinkFromFolderExamplePayload.data,
      id: folderId,
    },
  }),
  inputs: removeSharedLinkFromFolderInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeSharedLinkFromFolderOutputSchema,
  }),
  examplePayload: removeSharedLinkFromFolderExamplePayload,
});
