import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { updateCardInputs } from "../../inputs";
import { updateCardPayload } from "../../examplePayloads";

export const updateCard = action({
  display: {
    label: "Update Card",
    description: "Update an existing card in Guru",
  },
  perform: async (
    context,
    {
      connection,
      cardId,
      cardTitle,
      cardContent,
      shareStatus,
      additionalProperties,
    },
  ) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const requestBody = {
      preferredPhrase: cardTitle,
      content: cardContent,
      shareStatus: shareStatus,
      ...additionalProperties,
    };

    const { data } = await client.put(`/cards/${cardId}`, requestBody);

    return { data };
  },
  inputs: updateCardInputs,
  examplePayload: updateCardPayload,
});
