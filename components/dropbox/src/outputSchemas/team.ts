import { enumTagSchema, nameSchema, withDropboxEnvelope } from "./shared";
const teamMemberProfileSchema = {
  type: "object" as const,
  properties: {
    team_member_id: { type: "string" },
    external_id: { type: "string" },
    account_id: { type: "string" },
    email: { type: "string" },
    email_verified: { type: "boolean" },
    secondary_emails: {
      type: "array",
      items: {
        type: "object",
        properties: {
          email: { type: "string" },
          is_verified: { type: "boolean" },
        },
        required: ["email", "is_verified"],
      },
    },
    status: {
      type: "object",
      properties: {
        ".tag": {
          type: "string",
          enum: ["active", "invited", "suspended", "removed"],
        },
        is_recoverable: { type: "boolean" },
        is_disconnected: { type: "boolean" },
      },
      required: [".tag"],
    },
    name: nameSchema,
    membership_type: enumTagSchema(["full", "limited"]),
    invited_on: { type: "string", format: "date-time" },
    joined_on: { type: "string", format: "date-time" },
    suspended_on: { type: "string", format: "date-time" },
    persistent_id: { type: "string" },
    is_directory_restricted: { type: "boolean" },
    profile_photo_url: { type: "string" },
    groups: { type: "array", items: { type: "string" } },
    member_folder_id: { type: "string" },
    root_folder_id: { type: "string" },
  },
  required: [
    "team_member_id",
    "email",
    "email_verified",
    "status",
    "name",
    "membership_type",
    "groups",
    "member_folder_id",
    "root_folder_id",
  ],
};
export const getTeamMembersOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: {
    members_info: {
      type: "array",
      items: {
        oneOf: [
          {
            type: "object",
            properties: {
              ".tag": { type: "string", enum: ["id_not_found"] },
              id_not_found: { type: "string" },
            },
            required: [".tag", "id_not_found"],
          },
          {
            type: "object",
            properties: {
              ".tag": { type: "string", enum: ["member_info"] },
              profile: teamMemberProfileSchema,
              roles: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    role_id: { type: "string" },
                    name: { type: "string" },
                    description: { type: "string" },
                  },
                  required: ["role_id", "name", "description"],
                },
              },
            },
            required: [".tag", "profile"],
          },
          enumTagSchema(["other"]),
        ],
      },
    },
  },
  required: ["members_info"],
});
export const listTeamFolderOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: {
    team_folders: {
      type: "array",
      items: {
        type: "object",
        properties: {
          team_folder_id: { type: "string" },
          name: { type: "string" },
          status: enumTagSchema([
            "active",
            "archived",
            "archive_in_progress",
            "inactive",
            "other",
          ]),
          is_team_shared_dropbox: { type: "boolean" },
          sync_setting: enumTagSchema([
            "default",
            "not_synced",
            "not_synced_inactive",
            "other",
          ]),
          content_sync_settings: {
            type: "array",
            items: {
              type: "object",
              properties: {
                id: { type: "string" },
                sync_setting: enumTagSchema([
                  "default",
                  "not_synced",
                  "not_synced_inactive",
                  "other",
                ]),
              },
              required: ["id", "sync_setting"],
            },
          },
          quota_limit: { type: "integer" },
        },
        required: [
          "team_folder_id",
          "name",
          "status",
          "is_team_shared_dropbox",
          "sync_setting",
          "content_sync_settings",
        ],
      },
    },
    cursor: { type: "string" },
    has_more: { type: "boolean" },
  },
  required: ["team_folders", "cursor", "has_more"],
});
