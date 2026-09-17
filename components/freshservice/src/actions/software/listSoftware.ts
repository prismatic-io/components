import { action, outputSchema } from "@prismatic-io/spectral";
import { createFreshserviceClient } from "../../client";
import { listSoftwareExamplePayload as examplePayload } from "../../examplePayloads";
import { listSoftwareInputs as inputs } from "../../inputs";
import { listSoftwareOutputSchema } from "../../outputSchemas";
export const listSoftware = action({
  display: {
    label: "List Software",
    description: "Returns a list of all software applications.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection }) => {
    const client = createFreshserviceClient(connection, {
      debug: context.debug.enabled,
    });
    const { data } = await client.get(`/applications`);
    return {
      data,
    };
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSoftwareOutputSchema,
  }),
  inputs,
  examplePayload,
});
