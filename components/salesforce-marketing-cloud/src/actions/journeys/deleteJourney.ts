import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEYS_PATH } from "../../constants";
import { deleteJourneyExamplePayload } from "../../examplePayloads";
import { deleteJourneyInputs } from "../../inputs";

export const deleteJourney = action({
  examplePayload: deleteJourneyExamplePayload,
  display: {
    label: "Delete Journey",
    description:
      "Delete a journey (interaction) by ID. Deletes all versions of the journey. This action cannot be undone.",
  },
  inputs: deleteJourneyInputs,
  perform: async (context, { connection, journeyId }) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await client.delete(`${JOURNEYS_PATH}/${journeyId}`);

    return { data };
  },
});
