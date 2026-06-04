import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { addGuestToFolderExamplePayload } from "../../examplePayloads";
import { connectionInput, getFolderId, getGuestId, getIncludeShared, getPermissionLevel } from "../../inputs";
import type { AddGuestToFolder } from "./types/AddGuestToFolder";
import type { AddGuestToFolderQueryParams } from "./types/AddGuestToFolderQueryParams";

const folderId = getFolderId(true, "Folder ID");
const guestId = getGuestId(true, "Guest ID");
const includeShared = getIncludeShared(
  false,
  "Exclude details of items shared with the guest by setting this parameter to false",
  true
);
const permissionLevel = getPermissionLevel(true, "Can be read (view only), comment, edit, or create (full).", "create");

export const addGuestToFolder = action({
  display: {
    label: "Add Guest to Folder",
    description: "Share a folder with a guest.",
  },
  examplePayload: addGuestToFolderExamplePayload,
  perform: async (context, { clickUpConnection, folderId, guestId, includeShared, permissionLevel }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body: AddGuestToFolder = {
      permission_level: permissionLevel,
    };
    const params: AddGuestToFolderQueryParams = {
      include_shared: includeShared,
    };

    const { data } = await client.post(`/folder/${folderId}/guest/${guestId}`, body, { params });

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    folderId,
    guestId,
    includeShared,
    permissionLevel,
  },
});
