import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, region, transformationId } from "../../inputs";
import { deleteExamplePayload } from "../../examplePayloads";

export const deleteTransformation = action({
  display: {
    label: "Delete Transformation",
    description: "Deletes a Transformation.",
  },
  inputs: {
    connectionInput,
    region,
    transformationId,
  },
  perform: async (context, { connectionInput, region, transformationId }) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.delete(
      `/transformations/${transformationId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: deleteExamplePayload,
  },
});
