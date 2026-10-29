import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getActivityFieldsInputs } from "../../inputs";
import { getActivityFieldsExamplePayload } from "../../examplePayloads";
import { getActivityFieldsOutputSchema } from "../../outputSchemas";

export const getActivityFields = action({
  display: {
    label: "Get Activity Fields",
    description: "Gets all activity fields.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/activityFields");
    return { data };
  },
  inputs: getActivityFieldsInputs,
  examplePayload: getActivityFieldsExamplePayload,
  examplePerform: async () => getActivityFieldsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getActivityFieldsOutputSchema,
  }),
});
