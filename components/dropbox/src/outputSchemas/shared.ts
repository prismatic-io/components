export const withDropboxEnvelope = <T>(result: T) => ({
  type: "object" as const,
  properties: {
    status: { type: "integer" },
    headers: { type: "object" },
    result,
  },
  required: ["status", "headers", "result"],
});
export const openTaggedUnionSchema = {
  type: "object" as const,
  properties: { ".tag": { type: "string" } },
  required: [".tag"],
  additionalProperties: true,
};
export const openStructSchema = {
  type: "object" as const,
  properties: {},
  required: [],
  additionalProperties: true,
};
export const enumTagSchema = (values: string[]) => ({
  type: "object" as const,
  properties: { ".tag": { type: "string", enum: values } },
  required: [".tag"],
});
export const propertyGroupSchema = {
  type: "object" as const,
  properties: {
    template_id: { type: "string" },
    fields: {
      type: "array",
      items: {
        type: "object",
        properties: { name: { type: "string" }, value: { type: "string" } },
        required: ["name", "value"],
      },
    },
  },
  required: ["template_id", "fields"],
};
export const fileSharingInfoSchema = {
  type: "object" as const,
  properties: {
    read_only: { type: "boolean" },
    parent_shared_folder_id: { type: "string" },
    modified_by: { type: "string" },
  },
  required: ["read_only", "parent_shared_folder_id"],
};
export const folderSharingInfoSchema = {
  type: "object" as const,
  properties: {
    read_only: { type: "boolean" },
    parent_shared_folder_id: { type: "string" },
    shared_folder_id: { type: "string" },
    traverse_only: { type: "boolean" },
    no_access: { type: "boolean" },
  },
  required: ["read_only"],
};
export const mediaInfoSchema = {
  oneOf: [
    enumTagSchema(["pending"]),
    {
      type: "object",
      properties: {
        ".tag": { type: "string", enum: ["metadata"] },
        metadata: {
          type: "object",
          properties: {
            ".tag": { type: "string", enum: ["photo", "video"] },
            dimensions: {
              type: "object",
              properties: {
                height: { type: "integer" },
                width: { type: "integer" },
              },
              required: ["height", "width"],
            },
            location: {
              type: "object",
              properties: {
                latitude: { type: "number" },
                longitude: { type: "number" },
              },
              required: ["latitude", "longitude"],
            },
            time_taken: { type: "string", format: "date-time" },
            duration: { type: "integer" },
          },
          required: [".tag"],
        },
      },
      required: [".tag", "metadata"],
    },
  ],
};
export const fileLockMetadataSchema = {
  type: "object" as const,
  properties: {
    is_lockholder: { type: "boolean" },
    lockholder_name: { type: "string" },
    lockholder_account_id: { type: "string" },
    created: { type: "string", format: "date-time" },
  },
  required: [],
};
export const fileMetadataSchema = {
  type: "object" as const,
  properties: {
    ".tag": { type: "string", enum: ["file"] },
    name: { type: "string" },
    path_lower: { type: ["string", "null"] },
    path_display: { type: ["string", "null"] },
    parent_shared_folder_id: { type: "string" },
    preview_url: { type: "string" },
    id: { type: "string" },
    client_modified: { type: "string", format: "date-time" },
    server_modified: { type: "string", format: "date-time" },
    rev: { type: "string" },
    size: { type: "integer" },
    media_info: mediaInfoSchema,
    symlink_info: {
      type: "object",
      properties: { target: { type: "string" } },
      required: ["target"],
    },
    sharing_info: fileSharingInfoSchema,
    is_downloadable: { type: "boolean" },
    export_info: {
      type: "object",
      properties: {
        export_as: { type: "string" },
        export_options: { type: "array", items: { type: "string" } },
      },
      required: [],
    },
    property_groups: { type: "array", items: propertyGroupSchema },
    has_explicit_shared_members: { type: "boolean" },
    content_hash: { type: "string" },
    file_lock_info: fileLockMetadataSchema,
    is_restorable: { type: "boolean" },
  },
  required: ["name", "id", "client_modified", "server_modified", "rev", "size"],
};
export const folderMetadataSchema = {
  type: "object" as const,
  properties: {
    ".tag": { type: "string", enum: ["folder"] },
    name: { type: "string" },
    path_lower: { type: ["string", "null"] },
    path_display: { type: ["string", "null"] },
    parent_shared_folder_id: { type: "string" },
    preview_url: { type: "string" },
    id: { type: "string" },
    shared_folder_id: { type: "string" },
    sharing_info: folderSharingInfoSchema,
    property_groups: { type: "array", items: propertyGroupSchema },
  },
  required: ["name", "id"],
};
export const deletedMetadataSchema = {
  type: "object" as const,
  properties: {
    ".tag": { type: "string", enum: ["deleted"] },
    name: { type: "string" },
    path_lower: { type: ["string", "null"] },
    path_display: { type: ["string", "null"] },
    parent_shared_folder_id: { type: "string" },
    preview_url: { type: "string" },
    is_restorable: { type: "boolean" },
  },
  required: ["name"],
};
export const metadataSchema = {
  oneOf: [fileMetadataSchema, folderMetadataSchema, deletedMetadataSchema],
};
export const teamInfoSchema = {
  type: "object" as const,
  properties: { id: { type: "string" }, name: { type: "string" } },
  required: ["id", "name"],
};
export const nameSchema = {
  type: "object" as const,
  properties: {
    given_name: { type: "string" },
    surname: { type: "string" },
    familiar_name: { type: "string" },
    display_name: { type: "string" },
    abbreviated_name: { type: "string" },
  },
  required: [
    "given_name",
    "surname",
    "familiar_name",
    "display_name",
    "abbreviated_name",
  ],
};
export const accessLevelSchema = enumTagSchema([
  "owner",
  "editor",
  "viewer",
  "viewer_no_comment",
  "traverse",
  "no_access",
  "other",
]);
export const linkAudienceSchema = enumTagSchema([
  "public",
  "team",
  "no_one",
  "password",
  "members",
  "other",
]);
export const folderPolicySchema = {
  type: "object" as const,
  properties: {
    member_policy: enumTagSchema([
      "team",
      "anyone",
      "team_and_approved",
      "other",
    ]),
    resolved_member_policy: enumTagSchema([
      "team",
      "anyone",
      "team_and_approved",
      "other",
    ]),
    acl_update_policy: enumTagSchema(["owner", "editors", "other"]),
    shared_link_policy: enumTagSchema(["anyone", "team", "members", "other"]),
    viewer_info_policy: enumTagSchema(["enabled", "disabled", "other"]),
  },
  required: ["acl_update_policy", "shared_link_policy"],
};
export const permissionSchema = {
  type: "object" as const,
  properties: {
    action: openTaggedUnionSchema,
    allow: { type: "boolean" },
    reason: openTaggedUnionSchema,
  },
  required: ["action", "allow"],
};
export const sharedContentLinkMetadataSchema = {
  type: "object" as const,
  properties: {
    access_level: accessLevelSchema,
    audience_options: { type: "array", items: linkAudienceSchema },
    audience_restricting_shared_folder: {
      type: "object",
      properties: {
        shared_folder_id: { type: "string" },
        name: { type: "string" },
        audience: linkAudienceSchema,
      },
      required: ["shared_folder_id", "name", "audience"],
    },
    current_audience: linkAudienceSchema,
    expiry: { type: "string", format: "date-time" },
    link_permissions: { type: "array", items: permissionSchema },
    password_protected: { type: "boolean" },
    audience_exceptions: {
      type: "object",
      properties: {
        count: { type: "integer" },
        exceptions: {
          type: "array",
          items: {
            type: "object",
            properties: { name: { type: "string" } },
            required: ["name"],
          },
        },
      },
      required: ["count", "exceptions"],
    },
    url: { type: "string" },
  },
  required: [
    "audience_options",
    "current_audience",
    "link_permissions",
    "password_protected",
    "url",
  ],
};
export const linkPermissionsSchema = {
  type: "object" as const,
  properties: {
    resolved_visibility: enumTagSchema([
      "public",
      "team_only",
      "password",
      "team_and_password",
      "shared_folder_only",
      "no_one",
      "only_you",
      "other",
    ]),
    requested_visibility: enumTagSchema([
      "public",
      "team_only",
      "password",
      "other",
    ]),
    can_revoke: { type: "boolean" },
    revoke_failure_reason: openTaggedUnionSchema,
    effective_audience: linkAudienceSchema,
    link_access_level: enumTagSchema(["viewer", "editor", "other"]),
    visibility_policies: {
      type: "array",
      items: {
        type: "object",
        properties: {
          policy: enumTagSchema(["public", "team_only", "password", "other"]),
          resolved_policy: openTaggedUnionSchema,
          allowed: { type: "boolean" },
          disallowed_reason: openTaggedUnionSchema,
        },
        required: ["policy", "resolved_policy", "allowed"],
      },
    },
    can_set_expiry: { type: "boolean" },
    can_remove_expiry: { type: "boolean" },
    allow_download: { type: "boolean" },
    can_allow_download: { type: "boolean" },
    can_disallow_download: { type: "boolean" },
    allow_comments: { type: "boolean" },
    team_restricts_comments: { type: "boolean" },
    audience_options: {
      type: "array",
      items: {
        type: "object",
        properties: {
          audience: linkAudienceSchema,
          allowed: { type: "boolean" },
          disallowed_reason: openTaggedUnionSchema,
        },
        required: ["audience", "allowed"],
      },
    },
    can_set_password: { type: "boolean" },
    can_remove_password: { type: "boolean" },
    require_password: { type: "boolean" },
    can_use_extended_sharing_controls: { type: "boolean" },
    can_sync: { type: "boolean" },
    can_request_access: { type: "boolean" },
    enforce_shared_link_password_policy: openTaggedUnionSchema,
    days_to_expire_policy: openTaggedUnionSchema,
    change_shared_link_expiration_policy: openTaggedUnionSchema,
  },
  required: [
    "can_revoke",
    "visibility_policies",
    "can_set_expiry",
    "can_remove_expiry",
    "allow_download",
    "can_allow_download",
    "can_disallow_download",
    "allow_comments",
    "team_restricts_comments",
  ],
};
export const sharingTeamMemberInfoSchema = {
  type: "object" as const,
  properties: {
    team_info: teamInfoSchema,
    display_name: { type: "string" },
    member_id: { type: "string" },
  },
  required: ["team_info", "display_name"],
};
export const sharedLinkMetadataSchema = {
  type: "object" as const,
  properties: {
    ".tag": { type: "string", enum: ["file", "folder"] },
    url: { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    expires: { type: "string", format: "date-time" },
    path_lower: { type: "string" },
    link_permissions: linkPermissionsSchema,
    team_member_info: sharingTeamMemberInfoSchema,
    content_owner_team_info: teamInfoSchema,
    client_modified: { type: "string", format: "date-time" },
    server_modified: { type: "string", format: "date-time" },
    rev: { type: "string" },
    size: { type: "integer" },
  },
  required: [".tag", "url", "name", "link_permissions"],
};
export const sharedFolderMetadataSchema = {
  type: "object" as const,
  properties: {
    access_type: accessLevelSchema,
    is_inside_team_folder: { type: "boolean" },
    is_team_folder: { type: "boolean" },
    owner_display_names: { type: "array", items: { type: "string" } },
    owner_team: teamInfoSchema,
    parent_shared_folder_id: { type: "string" },
    path_display: { type: "string" },
    path_lower: { type: "string" },
    parent_folder_name: { type: "string" },
    link_metadata: sharedContentLinkMetadataSchema,
    name: { type: "string" },
    permissions: { type: "array", items: permissionSchema },
    policy: folderPolicySchema,
    preview_url: { type: "string" },
    shared_folder_id: { type: "string" },
    time_invited: { type: "string", format: "date-time" },
    access_inheritance: enumTagSchema(["inherit", "no_inherit", "other"]),
    folder_id: { type: "string" },
  },
  required: [
    "access_type",
    "is_inside_team_folder",
    "is_team_folder",
    "name",
    "policy",
    "preview_url",
    "shared_folder_id",
    "time_invited",
  ],
};
