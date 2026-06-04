import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { addGuestToListExamplePayload } from "../../examplePayloads";
import { connectionInput, getGuestId, getIncludeShared, getlistId, getPermissionLevel } from "../../inputs";
import type { AddGuestToListBody } from "./types/AddGuestToListBody";
import type { AddGuestToListQueryParams } from "./types/AddGuestToListQueryParams";

const guestId = getGuestId(true, "Guest ID");
const includeShared = getIncludeShared(
  false,
  "Exclude details of items shared with the guest by setting this parameter to false",
  true
);
const listId = getlistId(true, "List ID");
const permissionLevel = getPermissionLevel(true, "Can be read (view only), comment, edit, or create (full).", "create");

export const addGuestToList = action({
  display: {
    label: "Add Guest to List",
    description: "Share a list with a guest.",
  },
  examplePayload: addGuestToListExamplePayload,
  perform: async (context, { clickUpConnection, listId, guestId, includeShared, permissionLevel }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body: AddGuestToListBody = {
      permission_level: permissionLevel,
    };
    const params: AddGuestToListQueryParams = {
      include_shared: includeShared,
    };

    const { data } = await client.post(`/list/${listId}/guest/${guestId}`, body, { params });

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    listId,
    guestId,
    includeShared,
    permissionLevel,
  },
});
