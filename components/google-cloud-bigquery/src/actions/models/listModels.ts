import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listModelsInputs } from "../../inputs";
import { paginateResults } from "../../utils/pagination";
export const listModels = action({
  display: {
    description:
      "Lists all models in the specified dataset. Requires the READER dataset role. After retrieving the list of models, you can get information about a particular model by calling the models.get method.",
    label: "List Models",
  },
  inputs: listModelsInputs,
  perform: async (
    _context,
    { connectionInput, projectId, datasetId, pagination = {}, fetchAll },
  ) => {
    const client = createClient(connectionInput);
    return await paginateResults(
      (params) => client.models.list(params),
      {
        projectId: projectId || undefined,
        datasetId: datasetId || undefined,
        maxResults: pagination.maxResults || undefined,
        pageToken: pagination.pageToken || undefined,
      },
      fetchAll,
      "models",
    );
  },
});
