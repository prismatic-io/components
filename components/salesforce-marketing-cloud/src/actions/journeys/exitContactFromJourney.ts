import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEY_CONTACT_EXIT_PATH } from "../../constants";
import { exitContactFromJourneyExamplePayload } from "../../examplePayloads";
import { exitContactFromJourneyInputs } from "../../inputs";

export const exitContactFromJourney = action({
  examplePayload: exitContactFromJourneyExamplePayload,
  display: {
    label: "Exit Contact from Journey",
    description:
      "Remove a contact from a running journey by contact key and definition key. Can remove from specific versions or all versions.",
  },
  inputs: exitContactFromJourneyInputs,
  perform: async (
    context,
    { connection, exitContactKey, exitDefinitionKey, exitVersions },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      ContactKey: exitContactKey,
      DefinitionKey: exitDefinitionKey,
      ...(exitVersions && { Versions: exitVersions }),
    };

    const { data } = await client.post(JOURNEY_CONTACT_EXIT_PATH, [body]);

    return { data };
  },
});
