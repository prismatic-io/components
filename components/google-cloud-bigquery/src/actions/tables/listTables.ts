import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  datasetId,
  fetchAll,
  maxResults,
  pageToken,
  projectId,
} from "../../inputs";
import { paginateResults } from "../../utils/pagination";

export const listTables = action({
  display: {
    description: "Lists all tables in the specified dataset.",
    label: "List Tables",
  },
  inputs: {
    connectionInput,
    datasetId: input({
      ...datasetId,
      required: true,
      comments: "Dataset ID of the tables to list.",
    }),
    projectId: input({
      ...projectId,
      required: true,
      comments: "Project ID of the tables to list.",
    }),
    maxResults: input({
      ...maxResults,
      required: false,
      clean: util.types.toString,
    }),
    pageToken,
    fetchAll,
  },
  perform: async (
    _context,
    { connectionInput, datasetId, projectId, maxResults, pageToken, fetchAll },
  ) => {
    const client = createClient(connectionInput);
    return paginateResults(
      (params) => client.tables.list(params),
      {
        datasetId,
        projectId,
        ...(maxResults && { maxResults: util.types.toNumber(maxResults) }),
        ...(pageToken && { pageToken }),
      },
      fetchAll,
      "tables",
    );
  },
});
