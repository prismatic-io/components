import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getEventByIdExamplePayload } from "../../examplePayloads";
import { getEventByIdInputs } from "../../inputs";
import { getEventByIdOutputSchema } from "../../outputSchemas";

export const getEventById = action({
  display: {
    label: "Get Event by ID",
    description: "Retrieves the business process event with the specified ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, eventId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.businessProcess}/events/${eventId}`,
    );
    return {
      data,
    };
  },
  inputs: getEventByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEventByIdOutputSchema,
  }),
  examplePayload: getEventByIdExamplePayload,
});
