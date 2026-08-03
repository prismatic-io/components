import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAdSetResponse } from "../../examplePayloads";
import { getAdSetInputs } from "../../inputs";
export const getAdSet = action({
  display: {
    label: "Get Ad Set",
    description: "Get the information and metadata of a given Ad Set.",
  },
  perform: async (context, { version, connection, adId, fields }) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.get(`/${adId}`, {
      params: {
        fields,
      },
    });
    return {
      data,
    };
  },
  inputs: getAdSetInputs,
  examplePayload: getAdSetResponse,
});
