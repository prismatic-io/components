import { action } from "@prismatic-io/spectral";
import { getGuruClient } from "../../client";
import { verifyCardPayload } from "../../examplePayloads";
import { verifyCardInputs } from "../../inputs";

export const verifyCard = action({
  display: {
    label: "Verify Card",
    description: "Mark a card as verified",
  },
  perform: async (
    context,
    { connection, cardId, verificationStatus, verificationReason },
  ) => {
    const client = getGuruClient(connection, context.debug.enabled);

    const requestBody = {
      verificationState: verificationStatus || "VERIFIED",
      verificationReason,
    };

    await client.put(`/cards/${cardId}/verify`, requestBody);

    return {
      data: {
        message: "Card verified successfully",
        cardId: cardId,
      },
    };
  },
  inputs: verifyCardInputs,
  examplePayload: verifyCardPayload,
});
