import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { addGuestToFolderExamplePayload } from "../../examplePayloads";
import { addGuestToFolderInputs } from "../../inputs";
import { addGuestToFolderOutputSchema } from "../../outputSchemas";
import type {
  AddGuestToFolderBody as AddGuestToFolder,
  AddGuestToFolderQueryParams,
} from "../../types";
export const addGuestToFolder = action({
  display: {
    label: "Add Guest to Folder",
    description: "Share a folder with a guest.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: addGuestToFolderOutputSchema,
  }),
  examplePayload: addGuestToFolderExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { clickUpConnection, folderId, guestId, includeShared, permissionLevel },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const body: AddGuestToFolder = {
      permission_level: permissionLevel,
    };
    const params: AddGuestToFolderQueryParams = {
      include_shared: includeShared,
    };
    const { data } = await client.post(
      `/folder/${folderId}/guest/${guestId}`,
      body,
      { params },
    );
    return {
      data,
    };
  },
  examplePerform: async () => addGuestToFolderExamplePayload,
  inputs: addGuestToFolderInputs,
});
