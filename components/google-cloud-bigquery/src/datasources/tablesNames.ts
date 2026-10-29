import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, datasetId, projectId } from "../inputs";

export const tablesNames = dataSource({
  display: {
    label: "Select Table",
    description: "A picklist of tables in the specified dataset.",
  },
  inputs: {
    connection: connectionInput,
    projectId: { ...projectId, dataSource: undefined },
    datasetId: { ...datasetId, dataSource: undefined },
  },
  perform: async (_context, { connection, projectId, datasetId }) => {
    const client = createClient(connection);
    const { data } = await client.tables.list({
      projectId: projectId || undefined,
      datasetId: datasetId || undefined,
    });
    if (data.tables) {
      const result = data.tables?.map<Element>((table) => ({
        label:
          table?.friendlyName || table?.tableReference?.tableId || table.id,
        key: table.id ? table.id.toString() : "",
      }));
      return { result };
    }
    return Promise.resolve({ result: [] });
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "John Locke", key: "650" },
      { label: "John Doe", key: "47012" },
    ],
  },
});
