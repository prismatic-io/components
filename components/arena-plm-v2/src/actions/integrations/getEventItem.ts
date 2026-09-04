import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { getEventItemExamplePayload } from "../../examplePayloads";
import { getEventItemInputs } from "../../inputs";
import { eventItemSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const getEventItem = action({
  display: {
    label: "Get Event Item",
    description:
      "Returns an Item from an integration event with a given GUID from Arena PLM system.",
  },
  inputs: getEventItemInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: eventItemSchema,
  }),
  examplePayload: getEventItemExamplePayload,
  perform: async (
    context,
    { connection, integrationGuid, eventGuid, eventItemGuid },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const { data } = await client.get(
        `/outboundintegrations/${integrationGuid}/events/${eventGuid}/items/${eventItemGuid}`,
      );
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "Get Event Item");
    }
  },
});
