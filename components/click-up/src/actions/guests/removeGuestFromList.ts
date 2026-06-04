import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeGuestFromListExamplePayload } from "../../examplePayloads";
import { connectionInput, getGuestId, getIncludeShared, getlistId } from "../../inputs";
import type { RemoveGuestFromListQueryParams } from "./types/RemoveGuestFromListQueryParams";

const guestId = getGuestId(true, "Guest ID");
const includeShared = getIncludeShared(
  false,
  "Exclude details of items shared with the guest by setting this parameter to false",
  true
);
const listId = getlistId(true, "List ID");

export const removeGuestFromList = action({
  display: {
    label: "Remove Guest from List",
    description: "Revoke a guest's access to a list.",
  },
  examplePayload: removeGuestFromListExamplePayload,
  perform: async (context, { clickUpConnection, listId, guestId, includeShared }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const params: RemoveGuestFromListQueryParams = {
      include_shared: includeShared,
    };

    const { data } = await client.delete(`/list/${listId}/guest/${guestId}`, {
      params,
    });

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    listId,
    guestId,
    includeShared,
  },
});
