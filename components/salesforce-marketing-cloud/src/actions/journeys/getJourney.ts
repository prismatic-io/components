import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEYS_PATH } from "../../constants";
import { getJourneyExamplePayload } from "../../examplePayloads";
import { getJourneyInputs } from "../../inputs";
import { getJourneyOutputSchema } from "../../outputSchemas";
export const getJourney = action({
  examplePayload: getJourneyExamplePayload,
  display: {
    label: "Get Journey",
    description: "Retrieve a journey (interaction) by ID.",
  },
  inputs: getJourneyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getJourneyOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, journeyId, journeyVersion }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${JOURNEYS_PATH}/${encodeURIComponent(journeyId)}`,
      {
        params: { versionNumber: journeyVersion },
      },
    );
    return { data };
  },
});
