import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEYS_PATH } from "../../constants";
import { updateJourneyExamplePayload } from "../../examplePayloads";
import { updateJourneyInputs } from "../../inputs";
import { updateJourneyOutputSchema } from "../../outputSchemas";
export const updateJourney = action({
  examplePayload: updateJourneyExamplePayload,
  display: {
    label: "Update Journey",
    description:
      "Update an existing journey (interaction). This operation requires the full journey definition and replaces the existing configuration. Partial updates are not supported.",
  },
  inputs: updateJourneyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateJourneyOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      journeyId,
      journeyKey,
      workflowApiVersion,
      journeyVersion,
      journeyExtraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      id: journeyId,
      key: journeyKey,
      workflowApiVersion,
      version: journeyVersion,
      ...journeyExtraBody,
    };
    const { data } = await client.put(JOURNEYS_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { journeyId, journeyKey, workflowApiVersion, journeyVersion },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...updateJourneyExamplePayload.data,
      id: journeyId,
      key: journeyKey,
      workflowApiVersion,
      version: journeyVersion ?? updateJourneyExamplePayload.data.version,
    },
  }),
});
