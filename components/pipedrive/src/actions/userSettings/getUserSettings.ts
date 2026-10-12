import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserSettingsInputs } from "../../inputs";
import { getUserSettingsExamplePayload } from "../../examplePayloads";
import { getUserSettingsOutputSchema } from "../../outputSchemas";
export const getUserSettings = action({
  display: {
    label: "Get User Settings",
    description: "Lists settings of an authorized user.",
  },
  performSafety: "safe",
  perform: async (context, { connection }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get("/userSettings");
    return { data };
  },
  inputs: getUserSettingsInputs,
  examplePayload: getUserSettingsExamplePayload,
  examplePerform: async () => getUserSettingsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserSettingsOutputSchema,
  }),
});
