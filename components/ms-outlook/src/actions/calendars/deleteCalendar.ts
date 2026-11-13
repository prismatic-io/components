import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteCalendarOutputSchema } from "../../outputSchemas";
import { createClient } from "../../client";
import { deleteCalendarExamplePayload } from "../../examplePayloads";
import { deleteCalendarInputs } from "../../inputs";
import { computeEndpointBasedOnConnection } from "../../util";

export const deleteCalendar = action({
  display: {
    label: "Delete Calendar",
    description: "Deletes an existing calendar.",
  },
  inputs: deleteCalendarInputs,
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    await client.delete(
      computeEndpointBasedOnConnection(params.connection, `/me/calendars/${params.id}`),
    );
    return { data: { success: true, id: params.id, message: "Calendar deleted successfully" } };
  },
  examplePerform: async () => deleteCalendarExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteCalendarOutputSchema,
  }),
  examplePayload: deleteCalendarExamplePayload,
});
