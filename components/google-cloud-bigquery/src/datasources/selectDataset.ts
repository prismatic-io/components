import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, projectId } from "../inputs";

export const selectDataset = dataSource({
  display: {
    label: "Select Dataset",
    description: "A picklist of datasets in the specified project.",
  },
  inputs: {
    connection: connectionInput,
    projectId: { ...projectId, dataSource: undefined },
  },
  perform: async (_context, { connection, projectId }) => {
    const client = createClient(connection);
    const { data } = await client.datasets.list({
      projectId: projectId || undefined,
    });
    if (data.datasets) {
      const result = data.datasets
        .map<Element>((dataset) => ({
          label:
            dataset?.friendlyName ||
            dataset?.datasetReference?.datasetId ||
            dataset.id,
          key: dataset.id ? dataset.id.toString() : "",
        }))
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
      return { result };
    }
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "Analytics Dataset", key: "my-project:analytics_dataset" },
      { label: "Sales Dataset", key: "my-project:sales_dataset" },
    ],
  },
});
