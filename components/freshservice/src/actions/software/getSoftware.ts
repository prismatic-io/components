import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { getSoftwareExamplePayload as examplePayload } from "../../examplePayloads";
import { getSoftwareInputs as inputs } from "../../inputs";
import { softwareOutputSchema } from "../../outputSchemas";
export const getSoftware = action({
  display: {
    label: "Get Software",
    description: "Retrieves details of a software application by ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, applicationId }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/applications/${applicationId}`);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: softwareOutputSchema,
  }),
  inputs,
  examplePayload,
});
