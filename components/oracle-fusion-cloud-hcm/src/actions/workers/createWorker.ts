import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createWorkerExamplePayload } from "../../examplePayloads/workers";
import { createWorkerInputs } from "../../inputs";
import { workerRecordOutputSchema } from "../../outputSchemas";
import type { WorkerRecord } from "../../types";
import { dropEmptyRows } from "../../util";
export const createWorker = action({
  display: {
    label: "Create Worker",
    description: "Create a new worker record in Oracle Fusion Cloud HCM.",
  },
  examplePayload: createWorkerExamplePayload,
  inputs: createWorkerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: workerRecordOutputSchema,
  }),
  perform: async (
    context,
    {
      connection,
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
    const relationships = dropEmptyRows(workRelationships);
    const hasValidRelationship = (relationships ?? []).some(
      (r) => r.LegalEntityId && r.StartDate && r.WorkerType,
    );
    if (!hasValidRelationship) {
      throw new Error(
        "Create Worker requires at least one work relationship with Legal Entity ID, Start Date, and Worker Type.",
      );
    }
    const names = [
      { NameType, LastName, LegislationCode, FirstName, MiddleNames, Title },
    ];
    const body = {
      PersonNumber,
      ApplicantNumber,
      ...workerInfo,
      names,
      addresses: dropEmptyRows(addresses),
      emails: dropEmptyRows(emails),
      phones: dropEmptyRows(phones),
      nationalIdentifiers: dropEmptyRows(nationalIdentifiers),
      workRelationships: relationships,
    };
    const { data } = await client.post<WorkerRecord>("/workers", body);
    return { data };
  },
});
