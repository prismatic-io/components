import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { AUTOMATIONS_PATH } from "../../constants";
import { getAutomationExamplePayload } from "../../examplePayloads";
import { getAutomationInputs } from "../../inputs";
import { getAutomationOutputSchema } from "../../outputSchemas";
export const getAutomation = action({
  examplePayload: getAutomationExamplePayload,
  display: {
    label: "Get Automation",
    description: "Retrieve an Automation Studio automation by ID.",
  },
  inputs: getAutomationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getAutomationOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, automationId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${AUTOMATIONS_PATH}/${encodeURIComponent(automationId)}`,
    );
    return { data };
  },
});
