import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { deleteApplicationV3ExamplePayload } from "../../../examplePayloads/v3/applications";
import { deleteApplicationV3Inputs } from "../../../inputs/v3/applications";

export const deleteApplicationV3 = action({
  display: {
    label: "Delete Application",
    description: "Permanently deletes an application by ID.",
  },
  perform: async (context, { connection, applicationId }) => {
    const client = createV3Client(connection, context.debug.enabled);
    const { data } = await client.delete(`/applications/${applicationId}`);
    return { data };
  },
  inputs: deleteApplicationV3Inputs,
  examplePayload: deleteApplicationV3ExamplePayload,
});
