import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { listCardVerifiersInputs } from "../../inputs";
import { listCardVerifiersPayload } from "../../examplePayloads";

export const listCardVerifiers = action({
  display: {
    label: "List Card Verifiers",
    description: "List the verifiers for a card",
  },
  perform: async (context, { connection, cardId }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const { data } = await client.get(`/cards/${cardId}/verifiers`);

    return { data };
  },
  inputs: listCardVerifiersInputs,
  examplePayload: listCardVerifiersPayload,
});
