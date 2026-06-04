import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, sourceId } from "../../inputs";
import { getSourceExamplePayload } from "../../examplePayloads";

export const getSource = action({
  display: {
    label: "Get Source",
    description: "Returns a Source by its id.",
  },
  inputs: {
    connectionInput,
    region,
    sourceId,
  },
  perform: async (context, { connectionInput, region, sourceId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/sources/${sourceId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getSourceExamplePayload,
  },
});
