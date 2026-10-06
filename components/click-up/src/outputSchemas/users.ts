import {
  invitedBySchema,
  invitedUserMemberSchema,
  optionalSharedSchema,
  roleSchema,
  workspaceMemberUserSchema,
  workspaceTeamProperties,
} from "./shared";
const memberSchema = {
  type: "object" as const,
  properties: {
    user: { ...workspaceMemberUserSchema, required: [] },
    invited_by: invitedBySchema,
    shared: optionalSharedSchema,
  },
};
export const getUserOutputSchema = {
  type: "object" as const,
  properties: { member: memberSchema },
};
export const editUserOnWorkspaceOutputSchema = {
  type: "object" as const,
  properties: { member: memberSchema },
  required: ["member"],
};
export const inviteUserToWorkspaceOutputSchema = {
  type: "object" as const,
  properties: {
    team: {
      type: "object" as const,
      properties: {
        ...workspaceTeamProperties,
        members: { type: "array", items: invitedUserMemberSchema },
        roles: { type: "array", items: roleSchema },
      },
      required: ["id", "name", "color", "avatar", "members", "roles"],
    },
  },
  required: ["team"],
};
export const removeUserFromWorkspaceOutputSchema = {
  type: "object" as const,
  properties: {
    team: {
      type: "object" as const,
      properties: {
        ...workspaceTeamProperties,
        members: {
          type: "array",
          items: { ...invitedUserMemberSchema, required: [] },
        },
      },
      required: ["id", "name", "color", "avatar", "members"],
    },
  },
  required: ["team"],
};
