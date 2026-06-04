import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, functionId, region } from "../../inputs";
import { getFunctionExamplePayload } from "../../examplePayloads";

export const getFunction = action({
  display: {
    label: "Get Function",
    description: "Gets a Function.",
  },
  inputs: {
    connectionInput,
    region,
    functionId,
  },
  perform: async (context, { connectionInput, region, functionId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/functions/${functionId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getFunctionExamplePayload,
  },
});
