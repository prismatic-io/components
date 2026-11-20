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
      "Retrieves a collection of business process events for the specified worker.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, workerId, extraParameters, fetchAll, pagination = {} },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.businessProcess}/events`,
      params: { ...extraParameters, worker: workerId },
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
