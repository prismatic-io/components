import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { inviteGuestToWorkspaceExamplePayload } from "../../examplePayloads";
import { inviteGuestToWorkspaceInputs } from "../../inputs";
import { inviteGuestToWorkspaceOutputSchema } from "../../outputSchemas";
import type { InviteGuestToWorkspaceBody } from "../../types";
export const inviteGuestToWorkspace = action({
  display: {
    label: "Invite Guest to Workspace",
    description: "Invite a new guest to a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: inviteGuestToWorkspaceOutputSchema,
  }),
  examplePayload: inviteGuestToWorkspaceExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      clickUpConnection,
      teamId,
      email,
      canEditTags,
      canSeeTimeSpent,
      canSeeTimeEstimated,
      canCreateViews,
      customRoleId,
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const body: InviteGuestToWorkspaceBody = {
      email,
      can_edit_tags: canEditTags,
      can_see_time_spent: canSeeTimeSpent,
      can_see_time_estimated: canSeeTimeEstimated,
      can_create_views: canCreateViews,
      custom_role_id: customRoleId,
    };
    const { data } = await client.post(`/team/${teamId}/guest`, body);
    return {
      data,
    };
  },
  examplePerform: async () => inviteGuestToWorkspaceExamplePayload,
  inputs: inviteGuestToWorkspaceInputs,
});
