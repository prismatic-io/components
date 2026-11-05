import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { removeApplicationUserAssignmentExamplePayload } from "../../examplePayloads/applications";
import { deleteApplicationUserAssignmentsInputs } from "../../inputs/applications";

export const removeApplicationUserAssignment = action({
  display: {
    label: "Remove Application User Assignment",
    description:
      "Removes an application assignment from a user, revoking access to the application.",
  },
  inputs: deleteApplicationUserAssignmentsInputs,
  perform: async (context, { connection, applicationId, userId, sendEmail }) => {
    const client = await createClient(connection, context.debug.enabled);
    await client.delete(
      `/apps/${encodeURIComponent(applicationId)}/users/${encodeURIComponent(userId)}`,
      {
        params: { sendEmail },
      },
    );

    return {
      data: {
        id: userId,
        status: "DELETED",
      },
    };
  },
  examplePayload: removeApplicationUserAssignmentExamplePayload,
});
