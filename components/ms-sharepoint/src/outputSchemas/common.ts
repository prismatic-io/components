export const identitySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    displayName: { type: "string" },
    tenantId: { type: "string" },
    email: { type: "string" },
    thumbnails: { type: "object" },
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
    siteGroup: identitySchema,
    siteUser: identitySchema,
    user: identitySchema,
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
    driveType: { type: "string", enum: ["personal", "business", "documentLibrary"] },
    id: { type: "string" },
    name: { type: "string" },
    path: { type: "string" },
    shareId: { type: "string" },
    siteId: { type: "string" },
    sharepointIds: sharepointIdsSchema,
  },
};

export const fileFacetSchema = {
  type: "object" as const,
  properties: {
    mimeType: { type: "string" },
    hashes: {
      type: "object",
      properties: {
        crc32Hash: { type: "string" },
        quickXorHash: { type: "string" },
        sha1Hash: { type: "string" },
        sha256Hash: { type: "string" },
      },
    },
  },
};

export const folderFacetSchema = {
  type: "object" as const,
  properties: {
    childCount: { type: "integer" },
    view: { type: "object" },
  },
};

export const fileSystemInfoSchema = {
  type: "object" as const,
  properties: {
    createdDateTime: { type: "string", format: "date-time" },
    lastAccessedDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
  },
};

export const sharedFacetSchema = {
  type: "object" as const,
  properties: {
    owner: identitySetSchema,
    sharedBy: identitySetSchema,
    sharedDateTime: { type: "string", format: "date-time" },
    scope: { type: "string" },
  },
};

export const remoteItemSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    size: { type: "integer" },
    createdDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
    webUrl: { type: "string" },
    webDavUrl: { type: "string" },
    createdBy: identitySetSchema,
    lastModifiedBy: identitySetSchema,
    parentReference: itemReferenceSchema,
    file: fileFacetSchema,
    folder: folderFacetSchema,
    fileSystemInfo: fileSystemInfoSchema,
    shared: sharedFacetSchema,
    sharepointIds: sharepointIdsSchema,
    image: { type: "object" },
    package: { type: "object" },
    specialFolder: { type: "object" },
    video: { type: "object" },
  },
};

export const driveItemSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    "@odata.etag": { type: "string" },
    "@microsoft.graph.downloadUrl": { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    size: { type: "integer" },
    eTag: { type: "string" },
    cTag: { type: "string" },
    description: { type: "string" },
    webUrl: { type: "string" },
    webDavUrl: { type: "string" },
    createdDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
    createdBy: identitySetSchema,
    lastModifiedBy: identitySetSchema,
    parentReference: itemReferenceSchema,
    file: fileFacetSchema,
    folder: folderFacetSchema,
    fileSystemInfo: fileSystemInfoSchema,
    shared: sharedFacetSchema,
    remoteItem: remoteItemSchema,
    sharepointIds: sharepointIdsSchema,
    deleted: { type: "object", properties: { state: { type: "string" } } },
    searchResult: { type: "object", properties: { onClickTelemetryUrl: { type: "string" } } },
    root: { type: "object" },
    audio: { type: "object" },
    bundle: { type: "object" },
    image: { type: "object" },
    location: { type: "object" },
    malware: { type: "object" },
    package: { type: "object" },
    pendingOperations: { type: "object" },
    photo: { type: "object" },
    publication: { type: "object" },
    specialFolder: { type: "object" },
    video: { type: "object" },
  },
  required: ["id"],
};

export const driveItemPageSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: driveItemSchema },
    "@odata.nextLink": { type: "string" },
    "@odata.nextToken": { type: "string" },
  },
  required: ["value"],
};
