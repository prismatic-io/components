import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, datasetId, projectId, routineId } from "../../inputs";

export const deleteRoutine = action({
  display: {
    description:
      "Deletes the routine specified by routine ID from the dataset.",
    label: "Delete Routine",
  },
  inputs: {
    connectionInput,
    datasetId,
    projectId,
    routineId,
  },
  perform: async (
    _context,
    { connectionInput, datasetId, projectId, routineId },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.routines.delete({
      datasetId: datasetId || undefined,
      projectId: projectId || undefined,
      routineId: routineId || undefined,
    });
    return {
      data,
    };
  },
});
