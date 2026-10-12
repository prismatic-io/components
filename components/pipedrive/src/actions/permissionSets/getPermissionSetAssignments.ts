import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPermissionSetAssignmentsInputs } from "../../inputs";
import { getPermissionSetAssignmentsExamplePayload } from "../../examplePayloads";
import { getPermissionSetAssignmentsOutputSchema } from "../../outputSchemas";
export const getPermissionSetAssignments = action({
  display: {
    label: "Get Permission Set Assignments",
    description: "Lists permission set assignments.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/permissionSets/${id}/assignments`, {
      params: { start, limit },
    });
    return { data };
  },
  inputs: getPermissionSetAssignmentsInputs,
  examplePayload: getPermissionSetAssignmentsExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPermissionSetAssignmentsOutputSchema,
  }),
});
