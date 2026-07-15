import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listDatasetsInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
export const listDatasets = action({
  display: {
    description:
      "Lists all datasets in the specified project to which the user has been granted the READER dataset role.",
    label: "List Datasets",
  },
  inputs: listDatasetsInputs,
  perform: async (
    _context,
    { connectionInput, projectId, all, filter, pagination = {}, fetchAll },
  ) => {
    const client = createClient(connectionInput);
    return await paginateResults(
      (params) => client.datasets.list(params),
      {
        projectId: projectId || undefined,
        pageToken: pagination.pageToken || undefined,
        all,
        filter: filter || undefined,
        maxResults: pagination.maxResults || undefined,
      },
      fetchAll,
      "datasets",
    );
  },
});
