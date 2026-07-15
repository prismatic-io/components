import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createRoutineInputs } from "../../inputs";
export const createRoutine = action({
  display: {
    description: "Creates a new routine in the dataset.",
    label: "Create Routine",
  },
  inputs: createRoutineInputs,
  perform: async (
    _context,
    {
      connectionInput,
      datasetId,
      projectId,
      routineReference,
      routineType,
      definitionBody,
      additionalFields = {},
    },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.routines.insert({
      datasetId: datasetId || undefined,
      projectId: projectId || undefined,
      requestBody: {
        routineReference: routineReference || undefined,
        routineType: routineType || undefined,
        definitionBody: definitionBody || undefined,
        etag: additionalFields.etag || undefined,
        arguments: additionalFields.argument || undefined,
        returnTableType: additionalFields.returnTableType || undefined,
        returnType: additionalFields.returnType || undefined,
        creationTime: additionalFields.creationTime || undefined,
        lastModifiedTime: additionalFields.lastModifiedTime || undefined,
        language: additionalFields.language || undefined,
        importedLibraries: additionalFields.importedLibraries || undefined,
        description: additionalFields.description || undefined,
        determinismLevel: additionalFields.determinismLevel || undefined,
        remoteFunctionOptions:
          additionalFields.remoteFunctionOptions || undefined,
        sparkOptions: additionalFields.sparkOptions || undefined,
      },
    });
    return {
      data,
    };
  },
});
