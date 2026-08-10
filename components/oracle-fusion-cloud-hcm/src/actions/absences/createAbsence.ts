import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createAbsenceExamplePayload } from "../../examplePayloads/absences";
import { createAbsenceInputs } from "../../inputs";
import { absenceOutputSchema } from "../../outputSchemas";
import type { Absence } from "../../types";
export const createAbsence = action({
  display: {
    label: "Create Absence",
    description: "Create a new absence entry in Oracle Fusion Cloud HCM.",
  },
  examplePayload: createAbsenceExamplePayload,
  inputs: createAbsenceInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: absenceOutputSchema,
  }),
  perform: async (
    context,
    { connection, absenceDetails, additionalFields, ...fields },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = { ...fields, ...absenceDetails, ...additionalFields };
    const { data } = await client.post<Absence>("/absences", body);
    return { data };
  },
});
