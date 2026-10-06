import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeGuestFromFolderExamplePayload } from "../../examplePayloads";
import { removeGuestFromFolderInputs } from "../../inputs";
import { removeGuestFromFolderOutputSchema } from "../../outputSchemas";
import type { RemoveGuestFromFolderQueryParams } from "../../types";
export const removeGuestFromFolder = action({
  display: {
    label: "Remove Guest from Folder",
    description: "Revoke a guest's access to a folder.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeGuestFromFolderOutputSchema,
  }),
  examplePayload: removeGuestFromFolderExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { clickUpConnection, folderId, guestId, includeShared },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const params: RemoveGuestFromFolderQueryParams = {
      include_shared: includeShared,
    };
    const { data } = await client.delete(
      `/folder/${folderId}/guest/${guestId}`,
      { params },
    );
    return {
      data,
    };
  },
  examplePerform: async () => removeGuestFromFolderExamplePayload,
  inputs: removeGuestFromFolderInputs,
});
