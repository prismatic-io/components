import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, sourceId } from "../../inputs";
import { deleteExamplePayload } from "../../examplePayloads";

export const deleteSource = action({
  display: {
    label: "Delete Source",
    description: "Deletes an existing Source.",
  },
  inputs: {
    connectionInput,
    region,
    sourceId,
  },
  perform: async (context, { connectionInput, region, sourceId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.delete(`/sources/${sourceId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: deleteExamplePayload,
  },
});
