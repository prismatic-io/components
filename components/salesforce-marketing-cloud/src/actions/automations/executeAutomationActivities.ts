import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { AUTOMATIONS_PATH } from "../../constants";
import { executeAutomationActivitiesExamplePayload } from "../../examplePayloads";
import { executeAutomationActivitiesInputs } from "../../inputs";
import { executeAutomationActivitiesOutputSchema } from "../../outputSchemas";
export const executeAutomationActivities = action({
  examplePayload: executeAutomationActivitiesExamplePayload,
  display: {
    label: "Execute Automation Activities",
    description:
      "Execute automation activities by running all activities once.",
  },
  inputs: executeAutomationActivitiesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: executeAutomationActivitiesOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, automationId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `${AUTOMATIONS_PATH}/${encodeURIComponent(automationId)}/actions/runallonce`,
      {},
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: executeAutomationActivitiesExamplePayload.data,
  }),
});
