import { action } from "@prismatic-io/spectral";
import type { Calendar } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { listCalendarsExamplePayload } from "../../examplePayloads";
import { listCalendarsInputs } from "../../inputs";
import type { ODataAttrs, ODataQueryParams } from "../../types";
import { computeEndpointBasedOnConnection, fetchAllData } from "../../util";

export const listCalendars = action({
  display: {
    label: "List Calendars",
    description: "Lists all calendars for the user.",
  },
  inputs: listCalendarsInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    const queryParams: ODataQueryParams = {};
    if (params.pageLimit) {
      queryParams.$top = params.pageLimit;
    }
    if (params.pageSkip) {
      queryParams.$skip = params.pageSkip;
    }

    const data = await fetchAllData<Calendar & ODataAttrs>(
      client,
      computeEndpointBasedOnConnection(params.connection, "/me/calendars"),
      params.fetchAll,
      queryParams as Record<string, unknown>,
    );
    return { data };
  },
  examplePayload: listCalendarsExamplePayload,
});
