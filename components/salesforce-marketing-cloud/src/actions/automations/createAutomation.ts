import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { AUTOMATIONS_PATH } from "../../constants";
import { createAutomationExamplePayload } from "../../examplePayloads";
import { createAutomationInputs } from "../../inputs";
import { createAutomationOutputSchema } from "../../outputSchemas";
export const createAutomation = action({
  examplePayload: createAutomationExamplePayload,
  display: {
    label: "Create Automation",
    description: "Create a new automation in Automation Studio.",
  },
  inputs: createAutomationInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createAutomationOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, automationName, automationDescription, automationExtraBody },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      name: automationName,
      ...(automationDescription && { description: automationDescription }),
      ...(automationExtraBody as Record<string, unknown>),
    };
    const { data } = await client.post(AUTOMATIONS_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { automationName, automationDescription },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createAutomationExamplePayload.data,
      name: automationName,
      description:
        automationDescription ??
        createAutomationExamplePayload.data.description,
    },
  }),
});
