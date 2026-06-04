import { action } from "@prismatic-io/spectral";
import type { Event } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { listEventsExamplePayload } from "../../examplePayloads";
import { listEventsInputs } from "../../inputs";
import type { ODataAttrs, ODataQueryParams } from "../../types";
import { computeEndpointBasedOnConnection, fetchAllData } from "../../util";

export const listEvents = action({
  display: {
    label: "List Events",
    description: "Lists all events for the user.",
  },
  inputs: listEventsInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    const url = computeEndpointBasedOnConnection(
      params.connection,
      params.calendarId ? `/me/calendars/${params.calendarId}/events` : "/me/events",
    );

    const queryParams: ODataQueryParams = {};
    if (params.pageLimit) {
      queryParams.$top = params.pageLimit;
    }
    if (params.pageSkip) {
      queryParams.$skip = params.pageSkip;
    }

    const data = await fetchAllData<Event & ODataAttrs>(
      client,
      url,
      params.fetchAll,
      queryParams as Record<string, unknown>,
    );
    return { data };
  },
  examplePayload: listEventsExamplePayload,
});
