import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, datasetId, projectId } from "../inputs";

export const selectRoutine = dataSource({
  display: {
    label: "Select Routine",
    description: "A picklist of routines in the specified dataset.",
  },
  inputs: {
    connection: connectionInput,
    projectId: { ...projectId, dataSource: undefined },
    datasetId: { ...datasetId, dataSource: undefined },
  },
  perform: async (_context, { connection, projectId, datasetId }) => {
    const client = createClient(connection);
    const { data } = await client.routines.list({
      projectId: projectId || undefined,
      datasetId: datasetId || undefined,
    });
    if (data.routines) {
      const result = data.routines
        .map<Element>((routine) => ({
          label:
            routine?.routineReference?.routineId ||
            routine?.routineType ||
            "Unknown Routine",
          key: routine?.routineReference?.routineId
            ? routine.routineReference.routineId.toString()
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
      { label: "calculate_totals", key: "calculate_totals" },
      { label: "transform_data", key: "transform_data" },
    ],
  },
});
