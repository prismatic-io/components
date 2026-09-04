import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getEventExamplePayload } from "../../examplePayloads";
import { getEventInputs } from "../../inputs";
import { getEventOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getEvent = action({
  display: {
    label: "Get Event",
    description:
      "Returns an Event object matching the GUID from Arena PLM system.",
  },
  inputs: getEventInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEventOutputSchema,
  }),
  examplePayload: getEventExamplePayload,
  perform: async (context, { connection, integrationGuid, eventGuid }) => {
    try {
      const client = await createArenaClient(context, connection);
      const { data } = await client.get(
        `/outboundintegrations/${integrationGuid}/events/${eventGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Event");
    }
  },
});
