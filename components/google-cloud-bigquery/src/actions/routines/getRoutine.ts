import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getRoutineInputs } from "../../inputs";
export const getRoutine = action({
  display: {
    description: "Gets the specified routine resource by routine ID.",
    label: "Get Routine",
  },
  inputs: getRoutineInputs,
  perform: async (
    _context,
    { connectionInput, datasetId, projectId, readMask, routineId },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.routines.get({
      datasetId: datasetId || undefined,
      projectId: projectId || undefined,
      routineId: routineId || undefined,
      readMask: readMask || undefined,
    });
    return {
      data,
    };
  },
});
