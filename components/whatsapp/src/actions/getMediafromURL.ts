import { action } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { getMediafromURLInputs } from "../inputs/getMediafromURLInputs";
import { getMediafromURLExamplePayload } from "../examplePayloads";

export const getMediafromURL = action({
  display: {
    label: "Get Media from URL",
    description: "Download media from a URL.",
  },
  perform: async (context, { connection, url }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.get(url);
    return {
      data,
    };
  },
  inputs: getMediafromURLInputs,
  examplePayload: getMediafromURLExamplePayload,
});
