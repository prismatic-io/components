import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAssignmentExamplePayload } from "../../examplePayloads/assignments";
import { getAssignmentInputs } from "../../inputs";
import { assignmentOutputSchema } from "../../outputSchemas";
import type { Assignment } from "../../types";
export const getAssignment = action({
  display: {
    label: "Get Assignment",
    description:
      "Retrieve a single worker assignment by Assignment ID from Oracle Fusion Cloud HCM.",
  },
  examplePayload: getAssignmentExamplePayload,
  inputs: getAssignmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: assignmentOutputSchema,
  }),
  perform: async (
    context,
    { connection, personId, assignmentId, expand, includeMetadataLinks },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get<Assignment>(
      `/publicWorkers/${personId}/child/assignments/${assignmentId}`,
      {
        params: {
          expand,
          onlyData: includeMetadataLinks,
        },
      },
    );
    return { data };
  },
});
