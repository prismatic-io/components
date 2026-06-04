import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { JOURNEYS_PATH } from "../../constants";
import { listJourneysExamplePayload } from "../../examplePayloads";
import { listJourneysInputs } from "../../inputs";
import { paginateResults } from "../../util/pagination";

export const listJourneys = action({
  examplePayload: listJourneysExamplePayload,
  display: {
    label: "List Journeys",
    description: "List journeys (interactions) with optional filtering.",
  },
  inputs: listJourneysInputs,
  perform: async (
    context,
    { connection, journeyStatus, journeyNameFilter, fetchAll, pageSize, page },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const params = {
      $pageSize: pageSize,
      $page: page,
      status: journeyStatus,
      nameSearch: journeyNameFilter,
    };

    const data = await paginateResults(client, JOURNEYS_PATH, fetchAll, params);

    return { data };
  },
});
