import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEYS_PATH } from "../../constants";
import { getJourneyExamplePayload } from "../../examplePayloads";
import { getJourneyInputs } from "../../inputs";

export const getJourney = action({
  examplePayload: getJourneyExamplePayload,
  display: {
    label: "Get Journey",
    description: "Retrieve a journey (interaction) by ID.",
  },
  inputs: getJourneyInputs,
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
