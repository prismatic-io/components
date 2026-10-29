import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, functionId, region } from "../../inputs";
import { deleteExamplePayload } from "../../examplePayloads";

export const deleteFunction = action({
  display: {
    label: "Delete Function",
    description: "Deletes a Function.",
  },
  inputs: {
    connectionInput,
    region,
    functionId,
  },
  perform: async (context, { connectionInput, region, functionId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.delete(`/functions/${functionId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: deleteExamplePayload,
  },
});
