import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEYS_PATH } from "../../constants";
import { updateJourneyExamplePayload } from "../../examplePayloads";
import { updateJourneyInputs } from "../../inputs";

export const updateJourney = action({
  examplePayload: updateJourneyExamplePayload,
  display: {
    label: "Update Journey",
    description:
      "Update an existing journey (interaction). This operation requires the full journey definition and replaces the existing configuration. Partial updates are not supported.",
  },
  inputs: updateJourneyInputs,
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
});
