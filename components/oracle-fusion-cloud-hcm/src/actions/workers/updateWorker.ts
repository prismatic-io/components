import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateWorkerExamplePayload } from "../../examplePayloads/workers";
import { updateWorkerInputs } from "../../inputs";
import { workerRecordOutputSchema } from "../../outputSchemas";
import type { WorkerRecord } from "../../types";
import { dropEmptyRows } from "../../util";
export const updateWorker = action({
  display: {
    label: "Update Worker",
    description: "Update an existing worker record in Oracle Fusion Cloud HCM.",
  },
  examplePayload: updateWorkerExamplePayload,
  inputs: updateWorkerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: workerRecordOutputSchema,
  }),
  perform: async (
    context,
    {
      connection,
      personId,
      NameType,
      LastName,
      LegislationCode,
      FirstName,
      MiddleNames,
      Title,
      PersonNumber,
      ApplicantNumber,
      workerInfo,
      addresses,
      phones,
      emails,
      nationalIdentifiers,
      workRelationships,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const nameEntry = {
      NameType,
      LastName,
      LegislationCode,
      FirstName,
      MiddleNames,
      Title,
    };
    const names = dropEmptyRows([nameEntry]);
    const body = {
      PersonNumber,
      ApplicantNumber,
      ...workerInfo,
      names,
      addresses: dropEmptyRows(addresses),
      emails: dropEmptyRows(emails),
      phones: dropEmptyRows(phones),
      nationalIdentifiers: dropEmptyRows(nationalIdentifiers),
      workRelationships: dropEmptyRows(workRelationships),
    };
    const { data } = await client.patch<WorkerRecord>(
      `/workers/${personId}`,
      body,
    );
    return { data };
  },
});
