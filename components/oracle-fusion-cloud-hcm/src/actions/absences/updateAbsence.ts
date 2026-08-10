import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateAbsenceExamplePayload } from "../../examplePayloads/absences";
import { updateAbsenceInputs } from "../../inputs";
import { absenceOutputSchema } from "../../outputSchemas";
import type { Absence } from "../../types";
export const updateAbsence = action({
  display: {
    label: "Update Absence",
    description: "Update an existing absence entry in Oracle Fusion Cloud HCM.",
  },
  examplePayload: updateAbsenceExamplePayload,
  inputs: updateAbsenceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: absenceOutputSchema,
  }),
  perform: async (
    context,
    { connection, absenceEntryId, absenceDetails, additionalFields, ...fields },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = { ...fields, ...absenceDetails, ...additionalFields };
    const { data } = await client.patch<Absence>(
      `/absences/${absenceEntryId}`,
      body,
    );
    return { data };
  },
});
