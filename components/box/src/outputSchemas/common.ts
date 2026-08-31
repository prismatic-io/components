export const userMiniSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["user"] },
    name: { type: "string" },
    login: { type: "string", format: "email" },
  },
  required: ["id", "type"],
};
export const folderMiniSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["folder"] },
    etag: { type: ["string", "null"] },
    sequence_id: { type: ["string", "null"] },
    name: { type: "string" },
  },
  required: ["id", "type", "name"],
};
export const fileVersionMiniSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["file_version"] },
    sha1: { type: "string" },
  },
  required: ["id", "type"],
};
export const fileMiniSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["file"] },
    etag: { type: ["string", "null"] },
    sequence_id: { type: ["string", "null"] },
    name: { type: "string" },
    sha1: { type: "string" },
    file_version: fileVersionMiniSchema,
  },
  required: ["id", "type", "name"],
};
export const pathCollectionSchema = {
  type: "object" as const,
  properties: {
    total_count: { type: "integer" },
    entries: { type: "array", items: folderMiniSchema },
  },
  required: ["total_count", "entries"],
};
export const sharedLinkSchema = {
  type: "object" as const,
  properties: {
    url: { type: "string", format: "uri" },
    download_url: { type: ["string", "null"], format: "uri" },
    vanity_url: { type: ["string", "null"], format: "uri" },
    vanity_name: { type: ["string", "null"] },
    access: { type: "string", enum: ["open", "company", "collaborators"] },
    effective_access: {
      type: "string",
      enum: ["open", "company", "collaborators"],
    },
    effective_permission: {
      type: "string",
      enum: ["can_edit", "can_download", "can_preview", "no_access"],
    },
    unshared_at: { type: ["string", "null"], format: "date-time" },
    is_password_enabled: { type: "boolean" },
    permissions: {
      type: "object",
      properties: {
        can_download: { type: "boolean" },
        can_preview: { type: "boolean" },
        can_edit: { type: "boolean" },
      },
    },
    download_count: { type: "integer" },
    preview_count: { type: "integer" },
  },
  required: ["url", "access"],
};
export const nullableSharedLinkSchema = {
  ...sharedLinkSchema,
  type: ["object", "null"],
};
export const watermarkInfoSchema = {
  type: "object" as const,
  properties: {
    is_watermarked: { type: "boolean" },
    is_watermark_inherited: { type: "boolean" },
    is_watermarked_by_access_policy: { type: "boolean" },
  },
};
export const classificationSchema = {
  type: ["object", "null"],
  properties: {
    name: { type: "string" },
    definition: { type: "string" },
    color: { type: "string" },
  },
};
export const collectionSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["collection"] },
    name: { type: "string", enum: ["Favorites"] },
    collection_type: { type: "string", enum: ["favorites"] },
  },
};
export const metadataSchema = {
  type: "object" as const,
  additionalProperties: true,
};
export const folderFullSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["folder"] },
    etag: { type: ["string", "null"] },
    sequence_id: { type: ["string", "null"] },
    name: { type: "string" },
    created_at: { type: ["string", "null"], format: "date-time" },
    modified_at: { type: ["string", "null"], format: "date-time" },
    description: { type: "string" },
    size: { type: "integer" },
    path_collection: pathCollectionSchema,
    created_by: userMiniSchema,
    modified_by: userMiniSchema,
    trashed_at: { type: ["string", "null"], format: "date-time" },
    purged_at: { type: ["string", "null"], format: "date-time" },
    content_created_at: { type: ["string", "null"], format: "date-time" },
    content_modified_at: { type: ["string", "null"], format: "date-time" },
    owned_by: userMiniSchema,
    shared_link: nullableSharedLinkSchema,
    folder_upload_email: {
      type: ["object", "null"],
      properties: {
        access: { type: "string", enum: ["open", "collaborators"] },
        email: { type: "string", format: "email" },
      },
    },
    parent: { ...folderMiniSchema, type: ["object", "null"] },
    item_status: { type: "string", enum: ["active", "trashed", "deleted"] },
    item_collection: {
      type: "object",
      properties: {
        total_count: { type: "integer" },
        offset: { type: "integer" },
        limit: { type: "integer" },
        entries: { type: "array", items: { type: "object" } },
        order: {
          type: "array",
          items: {
            type: "object",
            properties: {
              by: { type: "string" },
              direction: { type: "string", enum: ["ASC", "DESC"] },
            },
          },
        },
      },
    },
    sync_state: {
      type: "string",
      enum: ["synced", "not_synced", "partially_synced"],
    },
    has_collaborations: { type: "boolean" },
    permissions: {
      type: "object",
      properties: {
        can_delete: { type: "boolean" },
        can_download: { type: "boolean" },
        can_invite_collaborator: { type: "boolean" },
        can_rename: { type: "boolean" },
        can_set_share_access: { type: "boolean" },
        can_share: { type: "boolean" },
        can_upload: { type: "boolean" },
        can_apply_watermark: { type: "boolean" },
      },
    },
    tags: { type: "array", items: { type: "string" } },
    can_non_owners_invite: { type: "boolean" },
    is_externally_owned: { type: "boolean" },
    metadata: metadataSchema,
    is_collaboration_restricted_to_enterprise: { type: "boolean" },
    allowed_shared_link_access_levels: {
      type: "array",
      items: { type: "string", enum: ["open", "company", "collaborators"] },
    },
    allowed_invitee_roles: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "editor",
          "viewer",
          "previewer",
          "uploader",
          "previewer uploader",
          "viewer uploader",
          "co-owner",
        ],
      },
    },
    watermark_info: watermarkInfoSchema,
    is_accessible_via_shared_link: { type: "boolean" },
    can_non_owners_view_collaborators: { type: "boolean" },
    classification: classificationSchema,
    is_associated_with_app_item: { type: "boolean" },
    collections: { type: "array", items: collectionSchema },
  },
  required: ["id", "type", "name"],
};
export const fileFullSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["file"] },
    etag: { type: ["string", "null"] },
    sequence_id: { type: ["string", "null"] },
    name: { type: "string" },
    sha1: { type: "string" },
    file_version: fileVersionMiniSchema,
    description: { type: "string" },
    size: { type: "integer" },
    path_collection: pathCollectionSchema,
    created_at: { type: "string", format: "date-time" },
    modified_at: { type: "string", format: "date-time" },
    trashed_at: { type: ["string", "null"], format: "date-time" },
    purged_at: { type: ["string", "null"], format: "date-time" },
    content_created_at: { type: ["string", "null"], format: "date-time" },
    content_modified_at: { type: ["string", "null"], format: "date-time" },
    created_by: userMiniSchema,
    modified_by: userMiniSchema,
    owned_by: userMiniSchema,
    shared_link: nullableSharedLinkSchema,
    parent: { ...folderMiniSchema, type: ["object", "null"] },
    item_status: { type: "string", enum: ["active", "trashed", "deleted"] },
    version_number: { type: "string" },
    comment_count: { type: "integer" },
    permissions: {
      type: "object",
      properties: {
        can_delete: { type: "boolean" },
        can_download: { type: "boolean" },
        can_invite_collaborator: { type: "boolean" },
        can_rename: { type: "boolean" },
        can_set_share_access: { type: "boolean" },
        can_share: { type: "boolean" },
        can_annotate: { type: "boolean" },
        can_comment: { type: "boolean" },
        can_preview: { type: "boolean" },
        can_upload: { type: "boolean" },
        can_view_annotations_all: { type: "boolean" },
        can_view_annotations_self: { type: "boolean" },
        can_apply_watermark: { type: "boolean" },
      },
    },
    tags: { type: "array", items: { type: "string" } },
    lock: {
      type: ["object", "null"],
      properties: {
        id: { type: "string" },
        type: { type: "string", enum: ["lock"] },
        created_by: userMiniSchema,
        created_at: { type: "string", format: "date-time" },
        expired_at: { type: "string", format: "date-time" },
        is_download_prevented: { type: "boolean" },
        app_type: {
          type: ["string", "null"],
          enum: ["gsuite", "office_wopi", "office_wopiplus", "other", null],
        },
      },
    },
    extension: { type: "string" },
    is_package: { type: "boolean" },
    expiring_embed_link: {
      type: ["object", "null"],
      properties: {
        access_token: { type: "string" },
        expires_in: { type: "integer" },
        token_type: { type: "string", enum: ["bearer"] },
        url: { type: "string", format: "uri" },
        restricted_to: {
          type: "array",
          items: {
            type: "object",
            properties: {
              scope: { type: "string" },
              object: {
                type: "object",
                properties: {
                  id: { type: "string" },
                  type: { type: "string" },
                  etag: { type: ["string", "null"] },
                  sequence_id: { type: ["string", "null"] },
                  name: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    watermark_info: watermarkInfoSchema,
    is_accessible_via_shared_link: { type: "boolean" },
    allowed_invitee_roles: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "editor",
          "viewer",
          "previewer",
          "uploader",
          "previewer uploader",
          "viewer uploader",
          "co-owner",
        ],
      },
    },
    is_externally_owned: { type: "boolean" },
    has_collaborations: { type: "boolean" },
    metadata: metadataSchema,
    expires_at: { type: ["string", "null"], format: "date-time" },
    representations: {
      type: "object",
      properties: {
        entries: {
          type: "array",
          items: {
            type: "object",
            properties: {
              representation: { type: "string" },
              content: {
                type: "object",
                properties: { url_template: { type: "string" } },
              },
              info: {
                type: "object",
                properties: { url: { type: "string", format: "uri" } },
              },
              properties: {
                type: "object",
                properties: {
                  dimensions: { type: "string" },
                  paged: { type: "string" },
                  thumb: { type: "string" },
                },
              },
              status: {
                type: "object",
                properties: {
                  state: {
                    type: "string",
                    enum: ["success", "viewable", "pending", "none"],
                  },
                },
              },
            },
          },
        },
      },
    },
    classification: classificationSchema,
    uploader_display_name: { type: "string" },
    disposition_at: { type: ["string", "null"], format: "date-time" },
    shared_link_permission_options: {
      type: ["array", "null"],
      items: {
        type: "string",
        enum: ["can_preview", "can_download", "can_edit"],
      },
    },
    is_associated_with_app_item: { type: "boolean" },
    collections: { type: "array", items: collectionSchema },
    is_download_available: { type: "boolean" },
    download_url: { type: ["string", "null"], format: "uri" },
    authenticated_download_url: { type: ["string", "null"], format: "uri" },
    allowed_shared_link_access_levels: {
      type: "array",
      items: { type: "string", enum: ["open", "company", "collaborators"] },
    },
  },
  required: ["id", "type", "name"],
};
export const folderItemSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["file", "folder", "web_link"] },
    etag: { type: ["string", "null"] },
    sequence_id: { type: ["string", "null"] },
    name: { type: "string" },
    sha1: { type: "string" },
    file_version: fileVersionMiniSchema,
    url: { type: "string", format: "uri" },
    description: { type: "string" },
    size: { type: "integer" },
    path_collection: pathCollectionSchema,
    created_at: { type: ["string", "null"], format: "date-time" },
    modified_at: { type: ["string", "null"], format: "date-time" },
    trashed_at: { type: ["string", "null"], format: "date-time" },
    purged_at: { type: ["string", "null"], format: "date-time" },
    content_created_at: { type: ["string", "null"], format: "date-time" },
    content_modified_at: { type: ["string", "null"], format: "date-time" },
    created_by: userMiniSchema,
    modified_by: userMiniSchema,
    owned_by: userMiniSchema,
    shared_link: nullableSharedLinkSchema,
    parent: { ...folderMiniSchema, type: ["object", "null"] },
    item_status: { type: "string", enum: ["active", "trashed", "deleted"] },
    collections: { type: "array", items: collectionSchema },
    allowed_shared_link_access_levels: {
      type: "array",
      items: { type: "string", enum: ["open", "company", "collaborators"] },
    },
  },
  required: ["id", "type", "name"],
  additionalProperties: true,
};
