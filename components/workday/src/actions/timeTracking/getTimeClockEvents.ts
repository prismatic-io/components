import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getTimeClockEventsExamplePayload } from "../../examplePayloads";
import { getTimeClockEventsInputs } from "../../inputs";
import { getTimeClockEventsOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util/pagination";
export const getTimeClockEvents = action({
  display: {
    label: "Get Time Clock Events",
    description:
      "Retrieves a collection of time clock events. Supports filtering by worker and date range.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.timeTracking}/timeClockEvents`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => getTimeClockEventsExamplePayload,
  inputs: getTimeClockEventsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTimeClockEventsOutputSchema,
  }),
  examplePayload: getTimeClockEventsExamplePayload,
});
