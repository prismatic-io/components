import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEYS_PATH } from "../../constants";
import { createJourneyExamplePayload } from "../../examplePayloads";
import { createJourneyInputs } from "../../inputs";

export const createJourney = action({
  examplePayload: createJourneyExamplePayload,
  display: {
    label: "Create Journey",
    description: "Create a new journey (interaction) in Marketing Cloud.",
  },
  inputs: createJourneyInputs,
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
});
