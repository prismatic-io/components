import { action } from "@prismatic-io/spectral";
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
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.delete(
      computeEndpointBasedOnConnection(params.connection, `/me/calendars/${params.id}`),
    );
    return { data };
  },
  examplePayload: deleteCalendarExamplePayload,
});
