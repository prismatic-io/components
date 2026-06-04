import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { listFoldersExamplePayload } from "../../examplePayloads";
import { connectionInput, getArchived, getSpaceId } from "../../inputs";

const archived = getArchived(false, "Archived?");

const spaceId = getSpaceId(true);

export const listFolders = action({
  display: {
    label: "List Folders",
    description: "List all folders in a space.",
  },
  examplePayload: listFoldersExamplePayload,
  perform: async (context, { connection, spaceId, archived }) => {
    const client = createClickUpClient(connection, context.debug.enabled);
    const params: { archived?: unknown } = {};

    if (archived !== undefined) {
      params.archived = archived;
    }

    const { data } = await client.get(`/space/${spaceId}/folder`, {
      params,
    });

    return {
      data,
    };
  },
  inputs: {
    connection: connectionInput,
    spaceId,
    archived,
  },
});
