import { action } from "@prismatic-io/spectral";
import { createKarbonClient } from "../../client";
import getContactInputs from "../../inputs/contacts/getContact";
import { cleanOdata } from "../../utils";
import { getContactExamplePayload } from "../../examplePayloads";

export const getContact = action({
  display: {
    label: "Get Contact",
    description: "Get a single Contact by Contact key",
  },
  inputs: {
    ...getContactInputs,
  },
  perform: async (
    context,
    { connection, contactkey, expandBusinessCards },
  ) => {
    const client = createKarbonClient(connection, context.debug.enabled);

    const response = await client.get(`/v3/Contacts/${contactkey}`, {
      params: {
        $expand: expandBusinessCards ? "BusinessCards" : undefined,
      },
    });

    return { data: cleanOdata(response.data) };
  },
  examplePayload: getContactExamplePayload,
});
