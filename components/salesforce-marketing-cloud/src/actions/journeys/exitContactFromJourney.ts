import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEY_CONTACT_EXIT_PATH } from "../../constants";
import { exitContactFromJourneyExamplePayload } from "../../examplePayloads";
import { exitContactFromJourneyInputs } from "../../inputs";
import { exitContactFromJourneyOutputSchema } from "../../outputSchemas";
export const exitContactFromJourney = action({
  examplePayload: exitContactFromJourneyExamplePayload,
  display: {
    label: "Exit Contact from Journey",
    description:
      "Remove a contact from a running journey by contact key and definition key. Can remove from specific versions or all versions.",
  },
  inputs: exitContactFromJourneyInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: exitContactFromJourneyOutputSchema,
  }),
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: exitContactFromJourneyExamplePayload.data,
  }),
});
