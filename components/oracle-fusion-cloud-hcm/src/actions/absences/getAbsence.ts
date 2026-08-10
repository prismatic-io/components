import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAbsenceExamplePayload } from "../../examplePayloads/absences";
import { getAbsenceInputs } from "../../inputs";
import { absenceOutputSchema } from "../../outputSchemas";
import type { Absence } from "../../types";
export const getAbsence = action({
  display: {
    label: "Get Absence",
    description:
      "Retrieve a single absence entry by Absence Entry ID from Oracle Fusion Cloud HCM.",
  },
  examplePayload: getAbsenceExamplePayload,
  inputs: getAbsenceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: absenceOutputSchema,
  }),
  perform: async (
    context,
    { connection, absenceEntryId, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<Absence>(`/absences/${absenceEntryId}`, {
      params: { onlyData: includeMetadataLinks },
    });
    return { data };
  },
});
