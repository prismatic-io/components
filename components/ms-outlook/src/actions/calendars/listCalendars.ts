import { action, outputSchema } from "@prismatic-io/spectral";
import { listCalendarsOutputSchema } from "../../outputSchemas";
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
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    const queryParams: ODataQueryParams = {};
    if (params.pagination?.pageLimit) {
      queryParams.$top = params.pagination.pageLimit;
    }
    if (params.pagination?.pageSkip) {
      queryParams.$skip = params.pagination.pageSkip;
    }

    const data = await fetchAllData<Calendar & ODataAttrs>(
      client,
      computeEndpointBasedOnConnection(params.connection, "/me/calendars"),
      params.fetchAll,
      queryParams as Record<string, unknown>,
    );
    return { data };
  },
  examplePerform: async () => listCalendarsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listCalendarsOutputSchema,
  }),
  examplePayload: listCalendarsExamplePayload,
});
