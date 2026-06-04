import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEY_EVENTS_PATH } from "../../constants";
import { fireEntryEventExamplePayload } from "../../examplePayloads";
import { fireEntryEventInputs } from "../../inputs";

export const fireEntryEvent = action({
  examplePayload: fireEntryEventExamplePayload,
  display: {
    label: "Fire Entry Event",
    description:
      "Fire a journey entry event to inject a contact into a journey.",
  },
  inputs: fireEntryEventInputs,
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
});
