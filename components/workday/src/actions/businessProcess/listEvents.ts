import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listEventsExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../util/pagination";
import { listEventsInputs } from "../../inputs";
import { listEventsOutputSchema } from "../../outputSchemas";
export const listEvents = action({
  display: {
    label: "List Events",
    description:
      "Retrieves a collection of business process events based on the specified parameters. Exactly one worker parameter must be specified; otherwise, a blank response is returned.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.businessProcess}/events`,
      params: extraParameters,
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => listEventsExamplePayload,
  inputs: listEventsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEventsOutputSchema,
  }),
  examplePayload: listEventsExamplePayload,
});
