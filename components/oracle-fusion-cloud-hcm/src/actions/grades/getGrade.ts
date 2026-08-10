import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getGradeExamplePayload } from "../../examplePayloads/grades";
import { getGradeInputs } from "../../inputs";
import { gradeOutputSchema } from "../../outputSchemas";
import type { Grade } from "../../types";
export const getGrade = action({
  display: {
    label: "Get Grade",
    description:
      "Retrieve a single compensation grade by Grade ID from Oracle Fusion Cloud HCM.",
  },
  examplePayload: getGradeExamplePayload,
  inputs: getGradeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: gradeOutputSchema,
  }),
  perform: async (
    context,
    { connection, gradeId, effectiveDate, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<Grade>(`/grades/${gradeId}`, {
      params: {
        effectiveDate,
        onlyData: includeMetadataLinks,
      },
    });
    return { data };
  },
});
