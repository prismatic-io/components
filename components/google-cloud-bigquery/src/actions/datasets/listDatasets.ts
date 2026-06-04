import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  all,
  connectionInput,
  fetchAll,
  filter,
  maxResults,
  pageToken,
  projectId,
} from "../../inputs";
import { paginateResults } from "../../utils/pagination";

export const listDatasets = action({
  display: {
    description:
      "Lists all datasets in the specified project to which the user has been granted the READER dataset role.",
    label: "List Datasets",
  },
  inputs: {
    connectionInput,
    projectId,
    pageToken,
    all,
    filter,
    maxResults,
    fetchAll,
  },
  perform: async (
    _context,
    {
      connectionInput,
      projectId,
      pageToken,
      all,
      filter,
      maxResults,
      fetchAll,
    },
  ) => {
    const client = createClient(connectionInput);
    return paginateResults(
      (params) => client.datasets.list(params),
      {
        projectId: projectId || undefined,
        pageToken: pageToken || undefined,
        all,
        filter: filter || undefined,
        maxResults: maxResults || undefined,
      },
      fetchAll,
      "datasets",
    );
  },
});
