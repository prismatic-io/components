export const deleteResultSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean", enum: [true] },
    id: { type: "string" },
    message: { type: "string" },
  },
  required: ["success", "id", "message"],
};

export const thumbnailSchema = {
  type: "object" as const,
  properties: {
    content: { type: "string" },
    height: { type: "integer" },
    sourceItemId: { type: "string" },
    url: { type: "string" },
    width: { type: "integer" },
  },
};

export const thumbnailSetSchema = {
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

export const publicationFacetSchema = {
  type: "object" as const,
  properties: {
    level: { type: "string", enum: ["published", "checkout"] },
    versionId: { type: "string" },
    checkedOutBy: identitySetSchema,
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

export const folderViewSchema = {
  type: "object" as const,
  properties: {
    sortBy: { type: "string" },
    sortOrder: { type: "string" },
    viewType: { type: "string" },
  },
};

export const imageFacetSchema = {
  type: "object" as const,
  properties: {
    height: { type: "integer" },
    width: { type: "integer" },
  },
};

export const videoFacetSchema = {
  type: "object" as const,
  properties: {
    audioBitsPerSample: { type: "integer" },
    audioChannels: { type: "integer" },
    audioFormat: { type: "string" },
    audioSamplesPerSecond: { type: "integer" },
    bitrate: { type: "integer" },
    duration: { type: "integer" },
    fourCC: { type: "string" },
    frameRate: { type: "number" },
    height: { type: "integer" },
    width: { type: "integer" },
  },
};

export const audioFacetSchema = {
  type: "object" as const,
  properties: {
    album: { type: "string" },
    albumArtist: { type: "string" },
    artist: { type: "string" },
    bitrate: { type: "integer" },
    composers: { type: "string" },
    copyright: { type: "string" },
    disc: { type: "integer" },
    discCount: { type: "integer" },
    duration: { type: "integer" },
    genre: { type: "string" },
    hasDrm: { type: "boolean" },
    isVariableBitrate: { type: "boolean" },
    title: { type: "string" },
    track: { type: "integer" },
    trackCount: { type: "integer" },
    year: { type: "integer" },
  },
};

export const photoFacetSchema = {
  type: "object" as const,
  properties: {
    cameraMake: { type: "string" },
    cameraModel: { type: "string" },
    exposureDenominator: { type: "number" },
    exposureNumerator: { type: "number" },
    fNumber: { type: "number" },
    focalLength: { type: "number" },
    iso: { type: "integer" },
    orientation: { type: "integer" },
    takenDateTime: { type: "string", format: "date-time" },
  },
};

export const geoCoordinatesSchema = {
  type: "object" as const,
  properties: {
    altitude: { type: "number" },
    latitude: { type: "number" },
    longitude: { type: "number" },
  },
};

export const malwareFacetSchema = {
  type: "object" as const,
  properties: {
    description: { type: "string" },
  },
};

export const packageFacetSchema = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
  },
};

export const pendingOperationsSchema = {
  type: "object" as const,
  properties: {
    pendingContentUpdate: {
      type: "object",
      properties: {
        queuedDateTime: { type: "string", format: "date-time" },
      },
    },
  },
};

export const specialFolderFacetSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
  },
};

export const bundleFacetSchema = {
  type: "object" as const,
  properties: {
    album: {
      type: "object",
      properties: {
        coverImageItemId: { type: "string" },
      },
    },
    childCount: { type: "integer" },
  },
};

export const folderFacetSchema = {
  type: "object" as const,
  properties: {
    childCount: { type: "integer" },
    view: folderViewSchema,
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
    image: imageFacetSchema,
    package: packageFacetSchema,
    specialFolder: specialFolderFacetSchema,
    video: videoFacetSchema,
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
    audio: audioFacetSchema,
    bundle: bundleFacetSchema,
    image: imageFacetSchema,
    location: geoCoordinatesSchema,
    malware: malwareFacetSchema,
    package: packageFacetSchema,
    pendingOperations: pendingOperationsSchema,
    photo: photoFacetSchema,
    publication: publicationFacetSchema,
    specialFolder: specialFolderFacetSchema,
    video: videoFacetSchema,
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
