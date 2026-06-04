import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { unverifyCardInputs } from "../../inputs";
import { unverifyCardPayload } from "../../examplePayloads";

export const unverifyCard = action({
  display: {
    label: "Unverify Card",
    description: "Remove verification from a card",
  },
  perform: async (context, { connection, cardId, verificationReason }) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const requestBody = {
      verificationReason,
    };

    const { data } = await client.post(
      `/cards/${cardId}/unverify`,
      requestBody,
    );

    return { data };
  },
  inputs: unverifyCardInputs,
  examplePayload: unverifyCardPayload,
});
