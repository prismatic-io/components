import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { getCardInputs } from "../../inputs";
import { getCardPayload } from "../../examplePayloads";

export const getCard = action({
  display: {
    label: "Get Card",
    description:
      "Retrieve a specific card with extended information including teams and collaborators",
  },
  perform: async (context, { connection, cardId }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const { data } = await client.get(`/cards/${cardId}/extended`);

    return { data };
  },
  inputs: getCardInputs,
  examplePayload: getCardPayload,
});
