import { input, util } from "@prismatic-io/spectral";
import { cleanNumberInput } from "../utils/cleanNumberInput";
import { cleanStringInput } from "../utils/cleanStringInput";
import { cleanTagsInput } from "../utils/cleanTagsInput";
import { cleanValueListInput } from "../utils/cleanValueListInput";
import { paginationInputs } from "./pagination";
import { connection } from "./sharedInputs";

export const createAssetInputs = {
  connection,
  fileId: input({
    label: "File ID",
    comments: "A file's Signed ID, returned by the Upload File action.",
    type: "string",
    required: true,
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
  }),
  title: input({
    label: "Title",
    comments: "Asset title or display name.",
    type: "string",
    required: true,
    placeholder: "My Asset",
    example: "My Asset",
    clean: util.types.toString,
  }),
  parentId: input({
    label: "Parent ID",
    comments:
      "The parent Id, where the Asset should be located in. Should either be a Library, WorkspaceProject or Folder Id. Important: Cannot be used in conjunction with directory if the Id is from a Folder.",
    type: "string",
    required: true,
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: cleanStringInput,
  }),
  description: input({
    label: "Description",
    comments: "Asset description.",
    type: "string",
    placeholder: "Some description",
    example: "Some description",
    required: false,
    clean: cleanStringInput,
  }),
  externalId: input({
    label: "External ID",
    comments: "Asset external ID.",
    type: "string",
    required: false,
    placeholder: "12345",
    example: "12345",
    clean: cleanStringInput,
  }),
  copyrightStatus: input({
    label: "Copyright Status",
    comments: "Asset copyright status.",
    example: "UNKNOWN",
    placeholder: "UNKNOWN",
    required: false,
    model: [
      {
        label: "Unknown",
        value: "UNKNOWN",
      },
      {
        label: "Copyrighted",
        value: "COPYRIGHTED",
      },
      {
        label: "Public",
        value: "PUBLIC",
      },
    ],
    type: "string",
    clean: cleanStringInput,
  }),
  copyrightNotice: input({
    label: "Copyright Notice",
    comments: "Asset copyright notice. Supports medium text length.",
    type: "text",
    required: false,
    placeholder: "© 2021 My Company",
    example: "© 2021 My Company",
    clean: cleanStringInput,
  }),
  tags: input({
    label: "Tags",
    comments: "List of tags to create with the Asset.",
    collection: "valuelist",
    type: "string",
    required: false,
    example: "tag1",
    placeholder: "tag1",
    clean: cleanTagsInput,
  }),
  skipFileMetadata: input({
    label: "Skip File Metadata",
    comments:
      "Skip file's EXIF metadata. When true, it will ignore all file metadata contents.",
    type: "boolean",
    default: "false",
    clean: util.types.toBool,
  }),
  directory: input({
    label: "Directory",
    comments:
      "An array of strings representing the directory, if a folder does not exist, it is created. Important: Cannot be used in conjunction with parentId that is from a Folder.",
    example: "My Folder",
    collection: "valuelist",
    required: false,
    type: "string",
    clean: cleanValueListInput,
  }),

  expiresAt: input({
    label: "Expires At",
    comments: "Asset will expire once the defined date is reached.",
    type: "string",
    required: false,
    example: "2001-12-31T22:10:30.000+00:00",
    placeholder: "2001-12-31T22:10:30.000+00:00",
    clean: cleanStringInput,
  }),
  author: input({
    label: "Author",
    comments: "Represents the Author of the Asset.",
    example: "Photographer Name",
    placeholder: "Photographer Name",
    type: "string",
    required: false,
    clean: cleanStringInput,
  }),
};

export const uploadFileInputs = {
  connection,
  filename: input({
    label: "File Name",
    comments: "File name.",
    type: "string",
    required: true,
    example: "my-file.jpg",
    placeholder: "my-file.jpg",
    clean: util.types.toString,
  }),
  size: input({
    label: "Size",
    comments: "File size in bytes.",
    type: "string",
    example: "104857600",
    placeholder: "104857600",
    required: true,
    clean: util.types.toNumber,
  }),
  chunkSize: input({
    label: "Chunk Size",
    comments:
      "File chunk size in bytes. Value must be integer between 5MB and 1GB. See the [Frontify uploadFile mutation](https://frontify.github.io/graphql-reference/mutations/uploadFile) for full upload documentation.",
    type: "string",
    example: "104857600",
    placeholder: "104857600",
    required: false,
    clean: cleanNumberInput,
  }),
};

export const createAttachmentInputs = {
  connection,
  parentId: input({
    label: "Parent ID",
    type: "string",
    comments:
      "The parent ID of the attachment. For parents of Asset type only.",
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    required: true,
    clean: util.types.toString,
  }),
  fileId: input({
    label: "File ID",
    comments: "The signed ID returned by the Upload File action.",
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    type: "string",
    required: true,
    clean: util.types.toString,
  }),
  name: input({
    label: "Name",
    comments: "Attachment name or display name.",
    type: "string",
    required: true,
    example: "My Attachment",
    placeholder: "My Attachment",
    clean: util.types.toString,
  }),
  externalId: input({
    label: "External ID",
    comments: "Attachment external ID.",
    type: "string",
    required: false,
    placeholder: "12345",
    example: "12345",
    clean: cleanStringInput,
  }),
};

export const deleteAssetInputs = {
  connection,
  assetId: input({
    label: "Asset ID",
    comments: "ID of the Asset to delete.",
    type: "string",
    required: true,
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
    dataSource: "libraryAssetDataSource",
  }),
};

export const getAssetInputs = {
  connection,
  assetId: input({
    label: "Asset ID",
    type: "string",
    required: true,
    comments: "ID of the Asset to retrieve.",
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
    dataSource: "libraryAssetDataSource",
  }),
};

export const deleteAttachmentInputs = {
  connection,
  attachmentId: input({
    label: "Attachment ID",
    comments: "ID of the Attachment to delete.",
    type: "string",
    required: true,
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
  }),
};

export const getAssetsByIdsInputs = {
  connection,
  assetIds: input({
    label: "Asset IDs",
    collection: "valuelist",
    comments: "List of Asset IDs to retrieve.",
    type: "string",
    required: true,
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: cleanValueListInput,
    dataSource: "libraryAssetDataSource",
  }),
};

export const listAssetCommentsInputs = {
  connection,
  ...paginationInputs,
  assetId: input({
    label: "Asset ID",
    type: "string",
    required: true,
    comments: "ID of the Asset to retrieve comments for.",
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
    dataSource: "libraryAssetDataSource",
  }),
  replyLimit: input({
    label: "Reply Limit",
    comments: "The limit of how may replies to show per comment.",
    type: "string",
    default: "50",
    required: false,
    example: "50",
    placeholder: "50",
    clean: util.types.toInt,
  }),
};

export const listRelatedAssetsInputs = {
  connection,
  ...paginationInputs,
  assetId: input({
    label: "Asset ID",
    type: "string",
    required: true,
    comments: "ID of the Asset to retrieve related assets for.",
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
    dataSource: "libraryAssetDataSource",
  }),
};

export const moveAssetsInputs = {
  connection,
  assetIds: input({
    label: "Asset IDs",
    comments: "IDs of the Assets to move.",
    collection: "valuelist",
    type: "string",
    required: true,
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: cleanValueListInput,
    dataSource: "libraryAssetDataSource",
  }),
  destinationId: input({
    label: "Destination ID",
    comments: "Only allows Library, Workspace, or Folder IDs.",
    type: "string",
    required: true,
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
  }),
};

export const updateAssetInputs = {
  connection,
  assetId: input({
    label: "Asset ID",
    comments: "ID of the Asset to update.",
    required: true,
    type: "string",
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
    dataSource: "libraryAssetDataSource",
  }),
  filename: input({
    label: "File Name",
    comments: "Asset filename, including extension.",
    type: "string",
    required: false,
    example: "my-file.jpg",
    placeholder: "my-file.jpg",
    clean: cleanStringInput,
  }),
  title: input({
    ...createAssetInputs.title,
    required: false,
    clean: cleanStringInput,
  }),
  description: createAssetInputs.description,
  copyrightStatus: createAssetInputs.copyrightStatus,
  copyrightNotice: createAssetInputs.copyrightNotice,
  expiresAt: createAssetInputs.expiresAt,
  author: createAssetInputs.author,
};
