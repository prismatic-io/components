export const auditStampSchema = {
  type: "object" as const,
  properties: {
    at: { type: "string", format: "date-time" },
    by: { type: "string" },
    fullName: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
  },
};

const replicationStatusSchema = {
  type: "string",
  enum: ["PUBLISHED", "UNPUBLISHED", "MODIFIED", "NEVER_PUBLISHED"],
};

const previewStatusSchema = {
  type: "string",
  enum: ["IN_SYNC", "OUT_OF_SYNC"],
};

const contentFragmentStatusSchema = {
  type: "string",
  enum: ["NEW", "DRAFT", "PUBLISHED", "MODIFIED", "UNPUBLISHED"],
};

const dataTypeSchema = {
  type: "string",
  enum: [
    "text",
    "long-text",
    "number",
    "float-number",
    "date-time",
    "date",
    "time",
    "boolean",
    "enumeration",
    "tag",
    "content-fragment",
    "content-reference",
    "json",
  ],
};

export const tagSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    title: { type: "string" },
    i18n: {
      type: "array",
      items: {
        type: "object",
        properties: {
          locale: { type: "string" },
          title: { type: "string" },
          titlePath: { type: "string" },
        },
      },
    },
    titlePath: { type: "string" },
    name: { type: "string" },
    path: { type: "string" },
    description: { type: "string" },
  },
  required: ["id"],
};

export const validationStatusSchema = {
  type: "array" as const,
  items: {
    type: "object",
    properties: {
      property: { type: "string" },
      message: { type: "string" },
    },
  },
};

const assetValueSchema = {
  type: ["string", "object"],
  properties: {
    repository: { type: "string" },
    assetId: { type: "string" },
  },
};

export const fragmentFieldSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    type: dataTypeSchema,
    multiple: { type: "boolean" },
    locked: { type: "boolean" },
    mimeType: {
      type: "string",
      enum: ["text/html", "text/plain", "text/x-markdown", "text/markdown"],
    },
    values: {
      type: "array",
      items: {
        type: ["string", "number", "boolean", "object"],
        properties: {
          repository: { type: "string" },
          assetId: { type: "string" },
        },
      },
    },
  },
  required: ["name", "type"],
};

export const cardSchema = {
  type: "object" as const,
  properties: {
    assets: { type: "array", items: assetValueSchema },
    texts: { type: "array", items: { type: "string" } },
  },
};

export const modelIdentifierSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    path: { type: "string" },
    name: { type: "string" },
    technicalName: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    tagIds: { type: "array", items: { type: "string" } },
  },
  required: ["id", "path", "name"],
};

export const referenceSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    fieldName: { type: "string" },
    type: {
      type: "string",
      enum: ["content-fragment", "experience-fragment", "asset", "page"],
    },
    title: { type: "string" },
    description: { type: "string" },
    path: { type: "string" },
    created: auditStampSchema,
    modified: auditStampSchema,
    published: auditStampSchema,
    status: contentFragmentStatusSchema,
    previewReplicationStatus: replicationStatusSchema,
    previewStatus: previewStatusSchema,
    assetId: { type: "string" },
    "repo:size": { type: "integer" },
    "dc:format": { type: "string" },
    "tiff:ImageWidth": { type: "integer" },
    "tiff:ImageHeight": { type: "integer" },
    id: { type: "string", format: "uuid" },
    references: { type: "array", items: { type: "object" } },
    model: modelIdentifierSchema,
    fields: { type: "array", items: fragmentFieldSchema },
    variations: { type: "array", items: { type: "object" } },
    tags: { type: "array", items: tagSchema },
  },
  required: ["type", "path"],
};

export const contentFragmentVariationSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    fields: { type: "array", items: fragmentFieldSchema },
    tags: { type: "array", items: tagSchema },
    validationStatus: validationStatusSchema,
    references: { type: "array", items: referenceSchema },
    fieldTags: { type: "array", items: tagSchema },
    created: auditStampSchema,
    modified: auditStampSchema,
    card: cardSchema,
  },
  required: ["title"],
};

export const contentFragmentSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    path: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    status: contentFragmentStatusSchema,
    previewReplicationStatus: replicationStatusSchema,
    previewStatus: previewStatusSchema,
    created: auditStampSchema,
    modified: auditStampSchema,
    published: auditStampSchema,
    model: modelIdentifierSchema,
    checkedOutBy: { type: "string" },
    validationStatus: validationStatusSchema,
    fields: { type: "array", items: fragmentFieldSchema },
    variations: { type: "array", items: contentFragmentVariationSchema },
    tags: { type: "array", items: tagSchema },
    fieldTags: { type: "array", items: tagSchema },
    references: { type: "array", items: referenceSchema },
    card: cardSchema,
    metadata: {
      type: ["object", "null"],
      properties: {
        schemaId: { type: "string" },
        fields: {
          type: "array",
          items: {
            type: "object",
            properties: {
              name: { type: "string" },
              type: {
                type: "string",
                enum: [
                  "string",
                  "integer",
                  "number",
                  "boolean",
                  "array",
                  "object",
                ],
              },
              value: {
                type: ["string", "number", "boolean", "array", "object"],
              },
              title: { type: "string" },
            },
            required: ["name", "value"],
          },
        },
      },
    },
  },
  required: ["id", "path", "title", "status", "created", "model"],
};

const minMaxSchema = {
  type: "object",
  properties: { min: { type: "integer" }, max: { type: "integer" } },
};

const fileSizeSchema = {
  type: "object",
  properties: {
    size: { type: "integer" },
    unit: { type: "string", enum: ["B", "KB", "MB", "GB", "TB"] },
  },
  required: ["size", "unit"],
};

export const modelFieldSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    label: { type: "string" },
    description: { type: "string" },
    required: { type: "boolean" },
    multiple: { type: "boolean" },
    minItems: { type: "integer" },
    maxItems: { type: "integer" },
    type: dataTypeSchema,
    extensionConfig: {
      type: "object",
      additionalProperties: { type: ["string", "boolean", "number", "array"] },
    },
    placeholder: { type: "string" },
    defaultValue: { type: ["string", "number", "boolean"] },
    maxLength: { type: "integer" },
    unique: { type: "boolean" },
    translatable: { type: "boolean" },
    validationType: {
      type: "string",
      enum: ["none", "email", "url", "custom"],
    },
    customValidationRegex: { type: "string" },
    customErrorMessage: { type: "string" },
    mimeType: {
      type: "string",
      enum: ["text/html", "text/plain", "text/x-markdown", "text/markdown"],
    },
    allowFragmentReference: { type: "boolean" },
    allowedModels: { type: "array", items: { type: "string" } },
    min: { type: "number" },
    max: { type: "number" },
    root: { type: "string" },
    allowFragmentCreation: { type: "boolean" },
    items: { type: "array", items: { type: "string" } },
    tags: { type: "array", items: { type: "string" } },
    uuidBased: { type: "boolean" },
    showThumbnail: { type: "boolean" },
    imageWidth: minMaxSchema,
    imageHeight: minMaxSchema,
    fileSizeMin: fileSizeSchema,
    fileSizeMax: fileSizeSchema,
    allowedContentTypes: {
      type: "array",
      items: {
        type: "string",
        enum: [
          "plaintext",
          "richtext",
          "image",
          "audio",
          "video",
          "pdf",
          "spreadsheet",
          "presentation",
          "archive",
          "markup",
          "contentfragment",
        ],
      },
    },
    hint: { type: "string", enum: ["select", "checkbox", "radio"] },
    values: {
      type: "array",
      items: {
        type: "object",
        properties: { key: { type: "string" }, value: { type: "string" } },
        required: ["key", "value"],
      },
    },
  },
  required: ["name", "label", "type"],
};

export const contentFragmentModelSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    path: { type: "string" },
    name: { type: "string" },
    technicalName: { type: "string" },
    description: { type: "string" },
    etag: { type: "string" },
    created: auditStampSchema,
    modified: auditStampSchema,
    published: auditStampSchema,
    locked: { type: "boolean" },
    status: { type: "string", enum: ["enabled", "disabled", "draft"] },
    replicationStatus: replicationStatusSchema,
    previewReplicationStatus: replicationStatusSchema,
    previewStatus: previewStatusSchema,
    previewUrlPattern: { type: "string" },
    tagsCount: { type: "integer" },
    tags: { type: "array", items: tagSchema },
    fields: { type: "array", items: modelFieldSchema },
  },
  required: ["id", "path", "name"],
};

export const repositoryMetadataSchema = {
  type: "object" as const,
  properties: {
    "repo:name": { type: "string" },
    "repo:path": { type: "string" },
    "repo:assetId": { type: "string" },
    "repo:parent": { type: "string" },
    "repo:ancestors": { type: "array", items: { type: "string" } },
    "repo:createDate": { type: "string", format: "date-time" },
    "repo:createdBy": { type: "string" },
    "repo:modifyDate": { type: "string", format: "date-time" },
    "repo:modifiedBy": { type: "string" },
    "dc:format": { type: "string" },
    "repo:size": { type: "integer" },
    "dam:sha1": { type: "string" },
    "tiff:imageLength": { type: "integer" },
    "tiff:imageWidth": { type: "integer" },
    isPublishedToAemPublish: { type: "boolean" },
    isPublishedToDynamicMedia: { type: "boolean" },
    lastPublishedToAemPublish: { type: "string", format: "date-time" },
    lastPublishedToDynamicMedia: { type: "string", format: "date-time" },
    "aem:published": { type: "string", format: "date-time" },
    "aem:assetState": { type: "string" },
    "aem:checkedOutBy": { type: "string" },
    "repo:state": { type: "string" },
    "repo:repositoryId": { type: "string" },
    "repo:etag": { type: "string" },
    "repo:scene7Domain": { type: "string" },
    "repo:scene7File": { type: "string" },
    "repo:scene7FileStatus": { type: "string" },
    "repo:scene7Folder": { type: "string" },
    "repo:scene7FontStyle": { type: "string" },
    "repo:scene7FontType": { type: "string" },
    "repo:scene7LastModified": { type: "string" },
    "repo:scene7Name": { type: "string" },
    "repo:scene7RTFName": { type: "string" },
    "repo:scene7Type": { type: "string" },
  },
  additionalProperties: true,
};

export const assetMetadataSchema = {
  type: "object" as const,
  properties: {
    "xcm:keywords": {
      type: "array",
      items: {
        type: "object",
        properties: {
          tagId: { type: "string" },
          ancestorIds: { type: "array", items: { type: "string" } },
          value: { type: "string" },
          "repo:ancestors": { type: "array", items: { type: "string" } },
          "@lang": { type: "string" },
        },
      },
    },
    "dc:creator": { type: "array", items: { type: "string" } },
    "dc:description": { type: ["string", "array"], items: { type: "string" } },
    "dc:title": { type: ["string", "array"], items: { type: "string" } },
    "exif:GPSLatitude": { type: "string" },
    "exif:GPSLongitude": { type: "string" },
    "photoshop:ColorMode": { type: "number" },
    "photoshop:DateCreated": { type: "string", format: "date-time" },
    "xcm:machineKeywords": {
      type: "array",
      items: {
        type: "object",
        properties: {
          value: { type: "string" },
          confidence: { type: "number" },
          localeCode: { type: "string" },
        },
      },
    },
    "tiff:BitsPerSample": { type: "array", items: { type: "integer" } },
    "tiff:Orientation": { type: "number" },
    "xmp:CreateDate": { type: "string", format: "date-time" },
    "xmp:CreatorTool": { type: "string" },
    "xmp:ModifyDate": { type: "string", format: "date-time" },
  },
  additionalProperties: true,
};

export const assetMetadataResourceSchema = {
  type: "object" as const,
  properties: {
    assetId: { type: "string" },
    repositoryMetadata: repositoryMetadataSchema,
    assetMetadata: assetMetadataSchema,
  },
};

export const commandResultMessageSchema = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    title: { type: "string" },
    detail: { type: "string" },
    context: { type: "object" },
  },
  required: ["type", "title"],
};

export const folderListingItemSchema = {
  type: "object" as const,
  properties: {
    type: { type: "string", enum: ["FOLDER", "ASSET"] },
    folderId: { type: "string" },
    assetId: { type: "string" },
    name: { type: "string" },
    title: { type: ["string", "null"] },
    path: { type: "string" },
    size: { type: "integer" },
    lastModifiedAt: { type: "string", format: "date-time" },
  },
  required: ["type"],
};

export const jobStateSchema = {
  type: "string",
  enum: [
    "QUEUED",
    "PROCESSING",
    "COMPLETED",
    "COMPLETED_WITH_ERRORS",
    "FAILED",
  ],
};
