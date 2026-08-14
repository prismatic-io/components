import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEY_EVENTS_PATH } from "../../constants";
import { fireEntryEventExamplePayload } from "../../examplePayloads";
import { fireEntryEventInputs } from "../../inputs";
import { fireEntryEventOutputSchema } from "../../outputSchemas";
export const fireEntryEvent = action({
  examplePayload: fireEntryEventExamplePayload,
  display: {
    label: "Fire Entry Event",
    description:
      "Fire a journey entry event to inject a contact into a journey.",
  },
  inputs: fireEntryEventInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: fireEntryEventOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, eventDefinitionKey, eventContactKey, eventData },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      ContactKey: eventContactKey,
      EventDefinitionKey: eventDefinitionKey,
      ...(eventData && { Data: eventData }),
    };
    const { data } = await client.post(JOURNEY_EVENTS_PATH, body);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: fireEntryEventExamplePayload.data,
  }),
});
