import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEYS_PATH } from "../../constants";
import { listJourneysExamplePayload } from "../../examplePayloads";
import { listJourneysInputs } from "../../inputs";
import { listJourneysOutputSchema } from "../../outputSchemas";
import { paginateResults } from "../../util/pagination";
export const listJourneys = action({
  examplePayload: listJourneysExamplePayload,
  display: {
    label: "List Journeys",
    description: "List journeys (interactions) with optional filtering.",
  },
  inputs: listJourneysInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listJourneysOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, journeyStatus, journeyNameFilter, fetchAll, pagination },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $pageSize: pagination.pageSize,
      $page: pagination.page,
      status: journeyStatus,
      nameSearch: journeyNameFilter,
    };
    const data = await paginateResults(client, JOURNEYS_PATH, fetchAll, params);
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: listJourneysExamplePayload.data,
  }),
});
