import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getApplicationUserAssignmentsExamplePayload } from "../../examplePayloads/applications";
import { getApplicationUserAssignmentsInputs } from "../../inputs/applications";

export const getApplicationUserAssignment = action({
  display: {
    label: "Get Application User Assignment",
    description: "Retrieves a specific user assignment for a specific app.",
  },
  inputs: getApplicationUserAssignmentsInputs,
  perform: async (context, { connection, applicationId, userId, expand }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `/apps/${encodeURIComponent(applicationId)}/users/${encodeURIComponent(userId)}`,
      {
        params: { expand },
      },
    );

    return { data };
  },
  examplePayload: getApplicationUserAssignmentsExamplePayload,
});
