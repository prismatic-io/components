import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteAbsenceExamplePayload } from "../../examplePayloads/absences";
import { deleteAbsenceInputs } from "../../inputs";
import { deleteResultOutputSchema } from "../../outputSchemas";
export const deleteAbsence = action({
  display: {
    label: "Delete Absence",
    description: "Delete an absence entry from Oracle Fusion Cloud HCM.",
  },
  examplePayload: deleteAbsenceExamplePayload,
  inputs: deleteAbsenceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteResultOutputSchema,
  }),
  perform: async (context, { connection, absenceEntryId }) => {
    const client = createClient(connection, context.debug.enabled);
    await client.delete(`/absences/${absenceEntryId}`);
    return { data: { id: absenceEntryId, status: "DELETED" } };
  },
});
