import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { deleteCardPayload } from "../../examplePayloads";
import { deleteCardInputs } from "../../inputs";
export const deleteCard = action({
  display: {
    label: "Delete Card",
    description: "Delete a card from Guru",
  },
  perform: async (context, { connection, cardId }) => {
    const client = getGuruClient(connection, context.debug.enabled);
    await client.delete(`/cards/${cardId}`);
    return {
      data: {
        message: "Card deleted successfully",
        cardId: cardId,
      },
    };
  },
  inputs: deleteCardInputs,
  examplePayload: deleteCardPayload,
});
