import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getListsExamplePayload } from "../../examplePayloads";
import { connectionInput, getArchived, getFolderId } from "../../inputs";

const folderId = getFolderId(true, "Folder ID");
const archived = getArchived(false, "Filter for archived Lists?", false);

export const getLists = action({
  display: {
    label: "List Lists in Folder",
    description: "List the lists within a folder.",
  },
  examplePayload: getListsExamplePayload,
  perform: async (context, { clickUpConnection, folderId, archived }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const queryParams = { archived };

    const { data } = await client.get(`/folder/${folderId}/list`, {
      params: queryParams,
    });

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    folderId,
    archived,
  },
});
