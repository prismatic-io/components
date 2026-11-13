const thumbnailSchema = {
  type: "object" as const,
  properties: {
    height: { type: "integer" },
    width: { type: "integer" },
    url: { type: "string" },
    sourceItemId: { type: "string" },
  },
};

const thumbnailSetSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    large: thumbnailSchema,
    medium: thumbnailSchema,
    small: thumbnailSchema,
    source: thumbnailSchema,
  },
};

export const identitySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    displayName: { type: "string" },
    tenantId: { type: "string" },
    email: { type: "string" },
    thumbnails: thumbnailSetSchema,
  },
};

const sharePointIdentitySchema = {
  type: "object" as const,
  properties: {
    displayName: { type: "string" },
    id: { type: "string" },
    loginName: { type: "string" },
    thumbnails: { type: "array", items: thumbnailSetSchema },
  },
};

const sharePointGroupIdentitySchema = {
  type: "object" as const,
  properties: {
    displayName: { type: "string" },
    id: { type: "string" },
    principalId: { type: "string" },
    title: { type: "string" },
  },
};

export const identitySetSchema = {
  type: "object" as const,
  properties: {
    application: identitySchema,
    applicationInstance: identitySchema,
    conversation: identitySchema,
    conversationIdentityType: identitySchema,
    device: identitySchema,
    encrypted: identitySchema,
    group: identitySchema,
    onPremises: identitySchema,
    guest: identitySchema,
    phone: identitySchema,
    user: identitySchema,
    sharePointGroup: sharePointGroupIdentitySchema,
    siteGroup: sharePointIdentitySchema,
    siteUser: sharePointIdentitySchema,
  },
};

export const sharepointIdsSchema = {
  type: "object" as const,
  properties: {
    listId: { type: "string" },
    listItemId: { type: "string" },
    listItemUniqueId: { type: "string" },
    siteId: { type: "string" },
    siteUrl: { type: "string" },
    tenantId: { type: "string" },
    webId: { type: "string" },
  },
};

export const itemReferenceSchema = {
  type: "object" as const,
  properties: {
    driveId: { type: "string" },
    driveType: {
      type: "string",
      enum: ["personal", "business", "documentLibrary"],
    },
    id: { type: "string" },
    name: { type: "string" },
    path: { type: "string" },
    shareId: { type: "string" },
    siteId: { type: "string" },
    sharepointIds: sharepointIdsSchema,
  },
};

export const quotaSchema = {
  type: "object" as const,
  properties: {
    deleted: { type: "integer" },
    remaining: { type: "integer" },
    total: { type: "integer" },
    used: { type: "integer" },
    state: {
      type: "string",
      enum: ["normal", "nearing", "critical", "exceeded"],
    },
    storagePlanInformation: {
      type: "object",
      properties: { upgradeAvailable: { type: "boolean" } },
    },
  },
};
