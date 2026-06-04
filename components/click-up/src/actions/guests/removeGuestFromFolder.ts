import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeGuestFromFolderExamplePayload } from "../../examplePayloads";
import { connectionInput, getFolderId, getGuestId, getIncludeShared } from "../../inputs";
import type { RemoveGuestFromFolderQueryParams } from "./types/RemoveGuestFromFolderQueryParams";

const folderId = getFolderId(true, "Folder ID");
const guestId = getGuestId(true, "Guest ID");
const includeShared = getIncludeShared(
  false,
  "Exclude details of items shared with the guest by setting this parameter to false",
  true
);

export const removeGuestFromFolder = action({
  display: {
    label: "Remove Guest from Folder",
    description: "Revoke a guest's access to a folder.",
  },
  examplePayload: removeGuestFromFolderExamplePayload,
  perform: async (context, { clickUpConnection, folderId, guestId, includeShared }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const params: RemoveGuestFromFolderQueryParams = {
      include_shared: includeShared,
    };

    const { data } = await client.delete(`/folder/${folderId}/guest/${guestId}`, { params });

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    folderId,
    guestId,
    includeShared,
  },
});
