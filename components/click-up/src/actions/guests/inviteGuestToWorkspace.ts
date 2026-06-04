import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { inviteGuestToWorkspaceExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  customRoleId,
  getCanCreateViews,
  getCanEditTags,
  getCanSeeTimeEstimated,
  getCanSeeTimeSpent,
  getEmail,
  getTeamId,
} from "../../inputs";
import type { InviteGuestToWorkspaceBody } from "./types/InviteGuestToWorkspaceBody";

const teamId = getTeamId(true);
const email = getEmail(true, "Email address of the invited guest");
const canEditTags = getCanEditTags(true, "", true);
const canSeeTimeSpent = getCanSeeTimeSpent(true, "", true);
const canSeeTimeEstimated = getCanSeeTimeEstimated(true, "", true);
const canCreateViews = getCanCreateViews(true, "", true);

export const inviteGuestToWorkspace = action({
  display: {
    label: "Invite Guest to Workspace",
    description: "Invite a new guest to a workspace.",
  },
  examplePayload: inviteGuestToWorkspaceExamplePayload,
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
    }
  ) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
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
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    email,
    canEditTags,
    canSeeTimeSpent,
    canSeeTimeEstimated,
    canCreateViews,
    customRoleId,
  },
});
