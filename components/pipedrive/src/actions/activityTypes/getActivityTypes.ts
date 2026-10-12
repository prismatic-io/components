import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getActivityTypesInputs } from "../../inputs";
import { getActivityTypesExamplePayload } from "../../examplePayloads";
import { getActivityTypesOutputSchema } from "../../outputSchemas";
export const getActivityTypes = action({
  display: {
    label: "Get Activity Types",
    description: "Gets all activity types.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/activityTypes");
    return { data };
  },
  inputs: getActivityTypesInputs,
  examplePayload: getActivityTypesExamplePayload,
  examplePerform: async () => getActivityTypesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getActivityTypesOutputSchema,
  }),
});
