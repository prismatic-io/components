import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { AUTOMATIONS_PATH } from "../../constants";
import { updateAutomationExamplePayload } from "../../examplePayloads";
import { updateAutomationInputs } from "../../inputs";

export const updateAutomation = action({
  examplePayload: updateAutomationExamplePayload,
  display: {
    label: "Update Automation",
    description:
      "Update an automation by ID. Use this to modify properties like name, description, or toggle isActive to pause/resume a scheduled automation.",
  },
  inputs: updateAutomationInputs,
  perform: async (
    context,
    { connection, automationId, automationExtraBody },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.patch(
      `${AUTOMATIONS_PATH}/${automationId}`,
      automationExtraBody,
    );

    return { data };
  },
});
