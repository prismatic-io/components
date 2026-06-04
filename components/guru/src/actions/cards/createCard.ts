import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { createCardInputs } from "../../inputs";
import { createCardPayload } from "../../examplePayloads";

export const createCard = action({
  display: {
    label: "Create Card",
    description: "Create a new card in Guru",
  },
  perform: async (
    context,
    {
      connection,
      cardTitle,
      cardContent,
      shareStatus,
      collectionId,
      additionalProperties,
    },
  ) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const requestBody = {
      preferredPhrase: cardTitle,
      content: cardContent,
      cardType: "CARD",
      shareStatus: shareStatus || "TEAM",
      collection: {
        id: collectionId,
      },
      ...additionalProperties,
    };

    const { data } = await client.post("/cards", requestBody);

    return { data };
  },
  inputs: createCardInputs,
  examplePayload: createCardPayload,
});
