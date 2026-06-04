import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { AUTOMATIONS_PATH } from "../../constants";
import { executeAutomationActivitiesExamplePayload } from "../../examplePayloads";
import { executeAutomationActivitiesInputs } from "../../inputs";

export const executeAutomationActivities = action({
  examplePayload: executeAutomationActivitiesExamplePayload,
  display: {
    label: "Execute Automation Activities",
    description:
      "Execute automation activities by running all activities once.",
  },
  inputs: executeAutomationActivitiesInputs,
  perform: async (context, { connection, automationId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(
      `${AUTOMATIONS_PATH}/${encodeURIComponent(automationId)}/actions/runallonce`,
      {},
    );

    return { data };
  },
});
