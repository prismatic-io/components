import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateAdSetResponse } from "../../examplePayloads";
import { updateAdSetInputs } from "../../inputs";
export const updateAdSet = action({
  display: {
    label: "Update Ad Set",
    description: "Update the information and metadata of a given Ad Set.",
  },
  perform: async (
    context,
    {
      version,
      connection,
      adId,
      optionalValues,
      adName,
      status,
      targeting,
      fields,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled, version);
    const { data } = await client.post(
      `/${adId}`,
      {},
      {
        params: {
          ...optionalValues,
          name: adName,
          status,
          targeting,
          fields,
        },
      },
    );
    return {
      data,
    };
  },
  inputs: updateAdSetInputs,
  examplePayload: updateAdSetResponse,
});
