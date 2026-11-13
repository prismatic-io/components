import {
  identitySetSchema,
  itemReferenceSchema,
  sharepointIdsSchema,
} from "./common";

const fileFacetSchema = {
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

const folderFacetSchema = {
  type: "object" as const,
  properties: {
    childCount: { type: "integer" },
    view: {
      type: "object",
      properties: {
        sortBy: { type: "string" },
        sortOrder: { type: "string" },
        viewType: { type: "string" },
      },
    },
  },
};

const fileSystemInfoSchema = {
  type: "object" as const,
  properties: {
    createdDateTime: { type: "string", format: "date-time" },
    lastAccessedDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
  },
};

const imageFacetSchema = {
  type: "object" as const,
  properties: {
    height: { type: "integer" },
    width: { type: "integer" },
  },
};

const photoFacetSchema = {
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

const audioFacetSchema = {
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

const videoFacetSchema = {
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

const packageFacetSchema = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
  },
};

const bundleFacetSchema = {
  type: "object" as const,
  properties: {
    album: {
      type: "object",
      properties: { coverImageItemId: { type: "string" } },
    },
    childCount: { type: "integer" },
  },
};

const malwareFacetSchema = {
  type: "object" as const,
  properties: {
    description: { type: "string" },
  },
};

const locationFacetSchema = {
  type: "object" as const,
  properties: {
    altitude: { type: "number" },
    latitude: { type: "number" },
    longitude: { type: "number" },
  },
};

const pendingOperationsFacetSchema = {
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

const publicationFacetSchema = {
  type: "object" as const,
  properties: {
    level: { type: "string" },
    versionId: { type: "string" },
    checkedOutBy: identitySetSchema,
  },
};

const sharedFacetSchema = {
  type: "object" as const,
  properties: {
    owner: identitySetSchema,
    sharedBy: identitySetSchema,
    sharedDateTime: { type: "string", format: "date-time" },
    scope: { type: "string" },
  },
};

const specialFolderFacetSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
  },
};

const remoteItemSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    name: { type: "string" },
    size: { type: "integer" },
    createdDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
    webUrl: { type: "string" },
    webDavUrl: { type: "string" },
    file: fileFacetSchema,
    folder: folderFacetSchema,
    image: imageFacetSchema,
    package: packageFacetSchema,
    video: videoFacetSchema,
    shared: sharedFacetSchema,
    specialFolder: specialFolderFacetSchema,
    sharepointIds: sharepointIdsSchema,
    fileSystemInfo: fileSystemInfoSchema,
    createdBy: identitySetSchema,
    lastModifiedBy: identitySetSchema,
    parentReference: itemReferenceSchema,
  },
};

export const driveItemSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    "@microsoft.graph.downloadUrl": { type: "string" },
    id: { type: "string" },
    name: { type: "string" },
    size: { type: "integer" },
    eTag: { type: "string" },
    cTag: { type: "string" },
    webUrl: { type: "string" },
    webDavUrl: { type: "string" },
    description: { type: "string" },
    createdDateTime: { type: "string", format: "date-time" },
    lastModifiedDateTime: { type: "string", format: "date-time" },
    createdBy: identitySetSchema,
    lastModifiedBy: identitySetSchema,
    parentReference: itemReferenceSchema,
    file: fileFacetSchema,
    folder: folderFacetSchema,
    fileSystemInfo: fileSystemInfoSchema,
    deleted: { type: "object", properties: { state: { type: "string" } } },
    searchResult: {
      type: "object",
      properties: { onClickTelemetryUrl: { type: "string" } },
    },
    remoteItem: remoteItemSchema,
    sharepointIds: sharepointIdsSchema,
    root: { type: "object" },
    package: packageFacetSchema,
    image: imageFacetSchema,
    photo: photoFacetSchema,
    audio: audioFacetSchema,
    video: videoFacetSchema,
    bundle: bundleFacetSchema,
    malware: malwareFacetSchema,
    location: locationFacetSchema,
    pendingOperations: pendingOperationsFacetSchema,
    publication: publicationFacetSchema,
    shared: sharedFacetSchema,
    specialFolder: specialFolderFacetSchema,
  },
  required: ["id"],
};

const driveItemCollectionSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: driveItemSchema },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};

export const getItemOutputSchema = driveItemSchema;

export const getItemByIdOutputSchema = driveItemSchema;

export const moveFileOutputSchema = driveItemSchema;

export const updateFileOutputSchema = driveItemSchema;

export const uploadFileOutputSchema = driveItemSchema;

export const listChildrenOutputSchema = driveItemCollectionSchema;

export const listDriveItemsOutputSchema = driveItemCollectionSchema;

export const searchDriveOutputSchema = driveItemCollectionSchema;

export const listSharedFilesOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: {
      type: "array",
      items: { ...driveItemSchema, required: ["id", "remoteItem"] },
    },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};

export const listChangesOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: driveItemSchema },
    "@odata.nextLink": { type: "string" },
    "@odata.deltaLink": { type: "string" },
  },
  required: ["value"],
};

export const listSharedOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: {
      type: "array",
      items: {
        type: "object",
        properties: {
          id: { type: "string" },
          lastShared: {
            type: "object",
            properties: {
              sharedDateTime: { type: "string", format: "date-time" },
              sharingSubject: { type: "string" },
              sharingType: { type: "string" },
              sharedBy: {
                type: "object",
                properties: {
                  displayName: { type: "string" },
                  address: { type: "string" },
                  id: { type: "string" },
                },
              },
              sharingReference: {
                type: "object",
                properties: {
                  webUrl: { type: "string" },
                  id: { type: "string" },
                  type: { type: "string" },
                },
              },
            },
          },
          resourceVisualization: {
            type: "object",
            properties: {
              title: { type: "string" },
              type: { type: "string" },
              mediaType: { type: "string" },
              previewImageUrl: { type: "string" },
              previewText: { type: "string" },
              containerWebUrl: { type: "string" },
              containerDisplayName: { type: "string" },
              containerType: {
                type: "string",
                enum: [
                  "OneDriveBusiness",
                  "Site",
                  "Mail",
                  "DropBox",
                  "Box",
                  "GDrive",
                ],
              },
            },
          },
          resourceReference: {
            type: "object",
            properties: {
              webUrl: { type: "string" },
              id: { type: "string" },
              type: { type: "string" },
            },
          },
        },
        required: ["id"],
      },
    },
  },
  required: ["value"],
};
