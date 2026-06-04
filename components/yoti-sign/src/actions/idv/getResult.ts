import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getIDVSessionResultResponse } from "../../examplePayloads";
import { connectionInput, recipientId } from "../../inputs";

export const getIDVSessionResult = action({
  display: {
    label: "Get IDV Session Result",
    description:
      "This will return the result of the Identity verification session in JSON format",
  },
  inputs: {
    connection: connectionInput,
    recipientId,
  },
  perform: async (context, { connection, recipientId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/idv/recipients/${recipientId}/sessions/signed/json`,
    );

    return { data };
  },
  examplePayload: {
    data: getIDVSessionResultResponse,
  },
});
