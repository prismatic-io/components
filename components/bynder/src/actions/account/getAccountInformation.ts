import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAccountInformationResponse } from "../../examplePayloads";
import { connection } from "../../inputs";

export const getAccountInformation = action({
  display: {
    label: "Get Account Information",
    description: "Retrieve information on current account",
  },
  inputs: {
    connection,
  },
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/account`);
    return { data };
  },
  examplePayload: {
    data: getAccountInformationResponse,
  },
});
