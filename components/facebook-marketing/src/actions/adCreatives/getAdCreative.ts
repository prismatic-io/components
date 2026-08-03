import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAdCreativeResponse } from "../../examplePayloads";
import { getAdCreativeInputs } from "../../inputs";
export const getAdCreative = action({
  display: {
    label: "Get Ad Creative",
    description: "Get the information and metadata of the given ad creative.",
  },
  perform: async (context, { version, connection, adCreativeId, fields }) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.get(`/${adCreativeId}`, {
      params: {
        fields,
      },
    });
    return {
      data,
    };
  },
  inputs: getAdCreativeInputs,
  examplePayload: getAdCreativeResponse,
});
