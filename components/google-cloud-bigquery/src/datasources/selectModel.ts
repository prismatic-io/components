import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, datasetId, projectId } from "../inputs";

export const selectModel = dataSource({
  display: {
    label: "Select Model",
    description: "A picklist of models in the specified dataset.",
  },
  inputs: {
    connection: connectionInput,
    projectId: { ...projectId, dataSource: undefined },
    datasetId: { ...datasetId, dataSource: undefined },
  },
  perform: async (_context, { connection, projectId, datasetId }) => {
    const client = createClient(connection);
    const { data } = await client.models.list({
      projectId: projectId || undefined,
      datasetId: datasetId || undefined,
    });
    if (data.models) {
      const result = data.models
        .map<Element>((model) => ({
          label:
            model?.friendlyName ||
            model?.modelReference?.modelId ||
            model?.modelType ||
            "Unknown Model",
          key: model?.modelReference?.modelId
            ? model.modelReference.modelId.toString()
            : "",
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
      return { result };
    }
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Prediction Model", key: "prediction_model" },
      { label: "Recommendation Model", key: "recommendation_model" },
    ],
  },
});
