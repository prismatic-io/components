import {
  guestUserSchema,
  invitedBySchema,
  invitedGuestMemberSchema,
  optionalSharedSchema,
  roleSchema,
  sharedFolderSchema,
  sharedListSchema,
  sharedTaskSchema,
  weakSharedFolderItems,
  weakSharedListItems,
  weakSharedTaskItems,
  workspaceMemberUserSchema,
  workspaceTeamProperties,
} from "./shared";
const guestPermissionProperties = {
  can_see_time_spent: { type: "boolean" },
  can_see_time_estimated: { type: "boolean" },
  can_edit_tags: { type: "boolean" },
};
const guestRequired = [
  "user",
  "invited_by",
  "can_see_time_spent",
  "can_see_time_estimated",
  "can_edit_tags",
  "shared",
];
const removedGuestSchema = {
  type: "object" as const,
  properties: {
    guest: {
      type: "object" as const,
      properties: {
        user: guestUserSchema,
        invited_by: invitedBySchema,
        ...guestPermissionProperties,
        shared: optionalSharedSchema,
      },
      required: guestRequired,
    },
  },
  required: ["guest"],
};
export const addGuestToFolderOutputSchema = {
  type: "object" as const,
  properties: {
    guest: {
      type: "object" as const,
      properties: {
        user: guestUserSchema,
        invited_by: invitedBySchema,
        ...guestPermissionProperties,
        shared: {
          type: "object" as const,
          properties: {
            tasks: { type: "array", items: weakSharedTaskItems },
            lists: { type: "array", items: weakSharedListItems },
            folders: { type: "array", items: sharedFolderSchema },
          },
          required: ["tasks", "lists", "folders"],
        },
      },
      required: guestRequired,
    },
  },
  required: ["guest"],
};
export const addGuestToListOutputSchema = {
  type: "object" as const,
  properties: {
    guest: {
      type: "object" as const,
      properties: {
        user: guestUserSchema,
        invited_by: invitedBySchema,
        ...guestPermissionProperties,
        shared: {
          type: "object" as const,
          properties: {
            tasks: { type: "array", items: weakSharedTaskItems },
            lists: { type: "array", items: sharedListSchema },
            folders: { type: "array", items: weakSharedFolderItems },
          },
          required: ["tasks", "lists", "folders"],
        },
      },
      required: guestRequired,
    },
  },
  required: ["guest"],
};
export const addGuestToTaskOutputSchema = {
  type: "object" as const,
  properties: {
    guest: {
      type: "object" as const,
      properties: {
        user: guestUserSchema,
        invited_by: invitedBySchema,
        ...guestPermissionProperties,
        shared: {
          type: "object" as const,
          properties: {
            tasks: { type: "array", items: sharedTaskSchema },
            lists: { type: "array", items: weakSharedListItems },
            folders: { type: "array", items: weakSharedFolderItems },
          },
          required: ["tasks", "lists", "folders"],
        },
      },
      required: guestRequired,
    },
  },
  required: ["guest"],
};
export const editGuestOnWorkspaceOutputSchema = {
  type: "object" as const,
  properties: {
    guest: {
      type: "object" as const,
      properties: {
        user: workspaceMemberUserSchema,
        invited_by: invitedBySchema,
        ...guestPermissionProperties,
        can_see_points_estimated: { type: "boolean" },
        can_create_views: { type: "boolean" },
        shared: optionalSharedSchema,
      },
    },
  },
  required: ["guest"],
};
export const inviteGuestToWorkspaceOutputSchema = {
  type: "object" as const,
  properties: {
    team: {
      type: "object" as const,
      properties: {
        ...workspaceTeamProperties,
        members: { type: "array", items: invitedGuestMemberSchema },
        roles: { type: "array", items: roleSchema },
      },
      required: ["id", "name", "color", "avatar", "members", "roles"],
    },
  },
  required: ["team"],
};
export const removeGuestFromFolderOutputSchema = removedGuestSchema;
export const removeGuestFromListOutputSchema = removedGuestSchema;
export const removeGuestFromTaskOutputSchema = removedGuestSchema;
export const removeGuestFromWorkspaceOutputSchema = {
  type: "object" as const,
  properties: {
    team: {
      type: "object" as const,
      properties: {
        ...workspaceTeamProperties,
        members: {
          type: "array",
          items: { ...invitedGuestMemberSchema, required: [] },
        },
      },
      required: ["id", "name", "color", "avatar", "members"],
    },
  },
  required: ["team"],
};
