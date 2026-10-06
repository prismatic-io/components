import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { editGuestOnWorkspaceExamplePayload } from "../../examplePayloads";
import { editGuestOnWorkspaceInputs } from "../../inputs";
import { editGuestOnWorkspaceOutputSchema } from "../../outputSchemas";
import type { EditGuestOnWorkspaceBody } from "../../types";
export const editGuestOnWorkspace = action({
  display: {
    label: "Edit Guest on Workspace",
    description: "Rename and configure options for a guest.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: editGuestOnWorkspaceOutputSchema,
  }),
  examplePayload: editGuestOnWorkspaceExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      clickUpConnection,
      teamId,
      username,
      canEditTags,
      canSeeTimeSpent,
      canSeeTimeEstimated,
      canCreateViews,
      customRoleId,
      guestId,
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const body: EditGuestOnWorkspaceBody = {
      username,
      can_edit_tags: canEditTags,
      can_see_time_spent: canSeeTimeSpent,
      can_see_time_estimated: canSeeTimeEstimated,
      can_create_views: canCreateViews,
      custom_role_id: customRoleId,
    };
    const { data } = await client.put(`/team/${teamId}/guest/${guestId}`, body);
    return {
      data,
    };
  },
  examplePerform: async () => editGuestOnWorkspaceExamplePayload,
  inputs: editGuestOnWorkspaceInputs,
});
