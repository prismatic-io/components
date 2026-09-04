import { action, outputSchema } from "@prismatic-io/spectral";
import { createArenaClient } from "../../client";
import { listEventItemGuidsExamplePayload } from "../../examplePayloads";
import { listEventItemGuidsInputs } from "../../inputs";
import { listEventItemGuidsOutputSchema } from "../../outputSchemas";
import { handleArenaError } from "../../util";
export const listEventItemGuids = action({
  display: {
    label: "List Event Item GUIDs",
    description:
      "Returns a list of Item revision GUIDs from an integration event from Arena PLM system.",
  },
  inputs: listEventItemGuidsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEventItemGuidsOutputSchema,
  }),
  examplePayload: listEventItemGuidsExamplePayload,
  perform: async (
    context,
    { connection, integrationGuid, eventGuid, reconciled },
  ) => {
    try {
      const client = await createArenaClient(context, connection);
      const params = { reconciled };
      const path = `/outboundintegrations/${integrationGuid}/events/${eventGuid}/itemguids`;
      const { data } = await client.get(path, { params });
      return { data };
    } catch (error) {
      handleArenaError(error, context.logger, "List Event Item GUIDs");
    }
  },
});
