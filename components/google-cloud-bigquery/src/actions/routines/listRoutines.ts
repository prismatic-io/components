import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listRoutinesInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
export const listRoutines = action({
  display: {
    description: "Lists all routines in the specified dataset.",
    label: "List Routines",
  },
  inputs: listRoutinesInputs,
  perform: async (
    _context,
    {
      connectionInput,
      datasetId,
      projectId,
      filter,
      readMask,
      pagination = {},
      fetchAll,
    },
  ) => {
    const client = createClient(connectionInput);
    return await paginateResults(
      (params) => client.routines.list(params),
      {
        datasetId: datasetId || undefined,
        projectId: projectId || undefined,
        filter: filter || undefined,
        pageToken: pagination.pageToken || undefined,
        maxResults: pagination.maxResults || undefined,
        readMask: readMask || undefined,
      },
      fetchAll,
      "routines",
    );
  },
});
