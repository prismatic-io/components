import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getUserRoleAssignmentsInputs } from "../../inputs";
import { getUserRoleAssignmentsExamplePayload } from "../../examplePayloads";
import { getUserRoleAssignmentsOutputSchema } from "../../outputSchemas";

export const getUserRoleAssignments = action({
  display: {
    label: "Get User Role Assignments",
    description: "Lists user role assignments.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/users/${id}/roleAssignments`, {
      params: { start, limit },
    });
    return { data };
  },
  inputs: getUserRoleAssignmentsInputs,
  examplePayload: getUserRoleAssignmentsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserRoleAssignmentsOutputSchema,
  }),
});
