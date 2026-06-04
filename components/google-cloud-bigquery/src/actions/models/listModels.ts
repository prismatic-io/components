import { action } from "@prismatic-io/spectral";
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

export const listModels = action({
  display: {
    description:
      "Lists all models in the specified dataset. Requires the READER dataset role. After retrieving the list of models, you can get information about a particular model by calling the models.get method.",
    label: "List Models",
  },
  inputs: {
    connectionInput,
    projectId,
    datasetId,
    pageToken,
    maxResults,
    fetchAll,
  },
  perform: async (
    _context,
    { connectionInput, projectId, datasetId, pageToken, maxResults, fetchAll },
  ) => {
    const client = createClient(connectionInput);
    return paginateResults(
      (params) => client.models.list(params),
      {
        projectId: projectId || undefined,
        datasetId: datasetId || undefined,
        maxResults: maxResults || undefined,
        pageToken: pageToken || undefined,
      },
      fetchAll,
      "models",
    );
  },
});
