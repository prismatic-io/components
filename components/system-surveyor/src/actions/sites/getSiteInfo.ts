import { action } from "@prismatic-io/spectral";
import { createSsvClient } from "../../client";
import { getSiteInfoExamplePayload } from "../../examplePayloads/sites";
import { getSiteInfoInputs } from "../../inputs";






export const getSiteInfo = action({
  display: {
    label: "Get Site Info",
    description: "Retrieve information about a specific site.",
  },
  inputs: getSiteInfoInputs,
  perform: async (context, { ssvConnection, siteId }) => {
    const client = await createSsvClient(ssvConnection, context);
    const { data } = await client.get(`/v3/site/${siteId}`);

    return { data };
  },
  examplePayload: getSiteInfoExamplePayload,
});
