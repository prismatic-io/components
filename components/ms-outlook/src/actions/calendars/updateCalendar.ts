import { action } from "@prismatic-io/spectral";
import type { Calendar } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { updateCalendarExamplePayload } from "../../examplePayloads";
import { updateCalendarInputs } from "../../inputs";
import type { ODataAttrs } from "../../types";
import { computeEndpointBasedOnConnection } from "../../util";

export const updateCalendar = action({
  display: {
    label: "Update Calendar",
    description: "Updates an existing calendar.",
  },
  inputs: updateCalendarInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.patch<Calendar & ODataAttrs>(
      computeEndpointBasedOnConnection(params.connection, `/me/calendars/${params.id}`),
      {
        name: params.name,
        color: params.color,
      },
    );
    return { data };
  },
  examplePayload: updateCalendarExamplePayload,
});
