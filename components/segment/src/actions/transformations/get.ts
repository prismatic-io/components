import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, transformationId } from "../../inputs";
import { getTransformationExamplePayload } from "../../examplePayloads";

export const getTransformation = action({
  display: {
    label: "Get Transformation",
    description: "Gets a Transformation.",
  },
  inputs: {
    connectionInput,
    region,
    transformationId,
  },
  perform: async (context, { connectionInput, region, transformationId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(`/transformations/${transformationId}`);
    return {
      data,
    };
  },
  examplePayload: {
    data: getTransformationExamplePayload,
  },
});
