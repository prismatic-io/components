import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { editGuestOnWorkspaceExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  customRoleId,
  getCanCreateViews,
  getCanEditTags,
  getCanSeeTimeEstimated,
  getCanSeeTimeSpent,
  getGuestId,
  getTeamId,
  getUsername,
} from "../../inputs";
import type { EditGuestOnWorkspaceBody } from "./types/EditGuestOnWorkspaceBody";

const teamId = getTeamId(true);
const username = getUsername(true, "");
const canEditTags = getCanEditTags(true, "", true);
const canSeeTimeSpent = getCanSeeTimeSpent(true, "", true);
const canSeeTimeEstimated = getCanSeeTimeEstimated(true, "", true);
const canCreateViews = getCanCreateViews(true, "", true);
const guestId = getGuestId(true, "Guest ID");

export const editGuestOnWorkspace = action({
  display: {
    label: "Edit Guest on Workspace",
    description: "Rename and configure options for a guest.",
  },
  examplePayload: editGuestOnWorkspaceExamplePayload,
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
    }
  ) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
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
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    username,
    canEditTags,
    canSeeTimeSpent,
    canSeeTimeEstimated,
    canCreateViews,
    customRoleId,
    guestId,
  },
});
