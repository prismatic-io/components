import {
  customFieldSettingSchema,
  nextPageSchema,
  teamCompactSchema,
  workspaceCompactSchema,
} from "./shared";
export const teamResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        name: { type: "string" },
        description: { type: ["string", "null"] },
        html_description: { type: ["string", "null"] },
        organization: workspaceCompactSchema,
        permalink_url: { type: "string" },
        visibility: {
          type: "string",
          enum: ["secret", "request_to_join", "public"],
        },
        edit_team_name_or_description_access_level: {
          type: "string",
          enum: ["all_team_members", "only_team_admins"],
        },
        edit_team_visibility_or_trash_team_access_level: {
          type: "string",
          enum: ["all_team_members", "only_team_admins"],
        },
        member_invite_management_access_level: {
          type: "string",
          enum: ["all_team_members", "only_team_admins"],
        },
        guest_invite_management_access_level: {
          type: "string",
          enum: ["all_team_members", "only_team_admins"],
        },
        join_request_management_access_level: {
          type: "string",
          enum: ["all_team_members", "only_team_admins"],
        },
        team_member_removal_access_level: {
          type: "string",
          enum: ["all_team_members", "only_team_admins"],
        },
        team_content_management_access_level: {
          type: "string",
          enum: ["no_restriction", "only_team_admins"],
        },
        endorsed: { type: "boolean" },
        custom_field_settings: {
          type: "array",
          items: customFieldSettingSchema,
        },
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listTeamsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: teamCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const findTeamByNameOutputSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const addUserToTeamOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        user: {
          type: "object" as const,
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        team: teamCompactSchema,
        is_guest: { type: "boolean" },
        is_admin: { type: "boolean" },
        is_limited_access: { type: "boolean" },
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
