import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { getCardFoldersInputs } from "../../inputs";
import { getCardFoldersPayload } from "../../examplePayloads";

export const getCardFolders = action({
  display: {
    label: "Get Card Folders",
    description: "Get the folders that contain a specific card",
  },
  perform: async (context, { connection, cardId }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const { data } = await client.get(`/cards/${cardId}/folders`);

    return { data };
  },
  inputs: getCardFoldersInputs,
  examplePayload: getCardFoldersPayload,
});
