import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../utils/cleanStringInput";
import { cleanValueListInput } from "../utils/cleanValueListInput";
import { brandId, connection, libraryId } from "./sharedInputs";

export const createFolderInputs = {
  connection,
  parentId: input({
    label: "Parent ID",
    type: "string",
    required: true,
    comments: "ID of the parent.",
    example: "eyJpZGVud...",
    placeholder: "eyJpZGVud...",
    clean: util.types.toString,
  }),
  name: input({
    label: "Name",
    comments: "Folder name.",
    example: "My Folder",
    placeholder: "My Folder",
    type: "string",
    required: true,
    clean: util.types.toString,
  }),
  description: input({
    label: "Description",
    comments: "Folder description.",
    type: "string",
    example: "This is my folder.",
    placeholder: "This is my folder.",
    required: false,
    clean: cleanStringInput,
  }),
};

export const deleteFoldersInputs = {
  connection,
  brandId: { ...brandId, required: false },
  libraryId: { ...libraryId, required: false },
  folderIds: input({
    label: "Folder IDs",
    comments: "ID of the Folder to delete.",
    collection: "valuelist",
    type: "string",
    required: true,
    placeholder: "eyJpZGVud...",
    example: "eyJpZGVud...",
    clean: cleanValueListInput,
    dataSource: "selectLibraryFolder",
  }),
};

export const moveFoldersInputs = {
  connection,
  brandId: { ...brandId, required: false },
  libraryId: { ...libraryId, required: false },
  folderIds: input({
    ...deleteFoldersInputs.folderIds,
    comments: "ID of the Folder items to move.",
  }),
  destinationId: input({
    label: "Destination ID",
    comments: "Only allows Library, Workspace, or Folder IDs.",
    type: "string",
    required: true,
    placeholder: "eyJpZGVud...",
    example: "eyJpZGVud...",
    clean: util.types.toString,
  }),
};

export const updateFolderInputs = {
  connection,
  brandId: { ...brandId, required: false },
  libraryId: { ...libraryId, required: false },
  folderId: input({
    label: "Folder ID",
    type: "string",
    required: true,
    comments: "ID of the Folder to update.",
    example: "eyJpZGVud...",
    placeholder: "eyJpZGVud...",
    clean: util.types.toString,
    dataSource: "selectLibraryFolder",
  }),
  name: input({
    ...createFolderInputs.name,
    required: false,
    clean: cleanStringInput,
  }),
  description: createFolderInputs.description,
};
