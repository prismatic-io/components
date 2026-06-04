import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  datasetId,
  fetchAll,
  filter,
  maxResults,
  pageToken,
  projectId,
  readMask,
} from "../../inputs";
import { paginateResults } from "../../utils/pagination";

export const listRoutines = action({
  display: {
    description: "Lists all routines in the specified dataset.",
    label: "List Routines",
  },
  inputs: {
    connectionInput,
    projectId,
    datasetId,
    filter,
    pageToken,
    maxResults,
    readMask,
    fetchAll,
  },
  perform: async (
    _context,
    {
      connectionInput,
      datasetId,
      projectId,
      filter,
      pageToken,
      maxResults,
      readMask,
      fetchAll,
    },
  ) => {
    const client = createClient(connectionInput);
    return paginateResults(
      (params) => client.routines.list(params),
      {
        datasetId: datasetId || undefined,
        projectId: projectId || undefined,
        filter: filter || undefined,
        pageToken: pageToken || undefined,
        maxResults: maxResults || undefined,
        readMask: readMask || undefined,
      },
      fetchAll,
      "routines",
    );
  },
});
