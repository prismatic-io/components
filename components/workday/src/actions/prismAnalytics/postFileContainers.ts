import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { postFileContainersExamplePayload } from "../../examplePayloads";
import { postFileContainersInputs } from "../../inputs";
import { postFileContainersOutputSchema } from "../../outputSchemas";
export const postFileContainers = action({
  display: {
    label: "Create File Container",
    description: "Creates a new file container.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, tenant }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `${SERVICES.prismAnalytics}/${tenant}/fileContainers`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => postFileContainersExamplePayload,
  inputs: postFileContainersInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: postFileContainersOutputSchema,
  }),
  examplePayload: postFileContainersExamplePayload,
});
