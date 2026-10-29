import { action } from "@prismatic-io/spectral";
import { createV3Client } from "../../../client";
import { unrejectApplicationV3ExamplePayload } from "../../../examplePayloads/v3/applications";
import { unrejectApplicationV3Inputs } from "../../../inputs/v3/applications";

export const unrejectApplicationV3 = action({
  display: {
    label: "Unreject Application",
    description: "Reverses the rejection of an application.",
  },
  perform: async (context, { connection, applicationId }) => {
    const client = createV3Client(connection, context.debug.enabled);

    await client.post(`/applications/${applicationId}/unreject`, {});

    return { data: { success: true } };
  },
  inputs: unrejectApplicationV3Inputs,
  examplePayload: unrejectApplicationV3ExamplePayload,
});
