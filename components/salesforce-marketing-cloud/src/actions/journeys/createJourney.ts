import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEYS_PATH } from "../../constants";
import { createJourneyExamplePayload } from "../../examplePayloads";
import { createJourneyInputs } from "../../inputs";
import { createJourneyOutputSchema } from "../../outputSchemas";
export const createJourney = action({
  examplePayload: createJourneyExamplePayload,
  display: {
    label: "Create Journey",
    description: "Create a new journey (interaction) in Marketing Cloud.",
  },
  inputs: createJourneyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createJourneyOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      journeyKey,
      journeyName,
      journeyDescription,
      workflowApiVersion,
      journeyExtraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      key: journeyKey,
      name: journeyName,
      ...(journeyDescription && { description: journeyDescription }),
      workflowApiVersion,
      ...journeyExtraBody,
    };
    const { data } = await client.post(JOURNEYS_PATH, body);
    return { data };
  },
  examplePerform: async (
    _context,
    { journeyKey, journeyName, journeyDescription, workflowApiVersion },
  ): Promise<{
    data: unknown;
  }> => ({
    data: {
      ...createJourneyExamplePayload.data,
      key: journeyKey,
      name: journeyName,
      description:
        journeyDescription ?? createJourneyExamplePayload.data.description,
      workflowApiVersion,
    },
  }),
});
