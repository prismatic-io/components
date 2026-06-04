import { input, util } from "@prismatic-io/spectral";
import { paginationInputs } from "./pagination";
import {
  assetExternalId,
  assetSearch,
  brandId,
  connection,
  libraryId,
} from "./sharedInputs";

export const createCollectionInputs = {
  connection,
  parentId: input({
    label: "Parent ID",
    type: "string",
    required: true,
    comments: "ID of the parent Library entity.",
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
    dataSource: "libraryDataSource",
  }),
  name: input({
    label: "Name",
    comments: "Collection name.",
    type: "string",
    required: true,
    example: "My Collection",
    placeholder: "My Collection",
    clean: util.types.toString,
  }),
};

export const deleteCollectionInputs = {
  connection,
  brandId: { ...brandId, required: false },
  libraryId: { ...libraryId, required: false },
  collectionId: input({
    label: "Collection ID",
    comments: "ID of the Collection to delete.",
    type: "string",
    required: true,
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
    dataSource: "selectLibraryCollection",
  }),
};

export const getLibraryInputs = {
  connection,
  brandId: { ...brandId, required: false },
  libraryId,
};

export const listLibraryAssetsInputs = {
  connection,
  ...paginationInputs,
  brandId: { ...brandId, required: false },
  libraryId,
  assetSearch,
  assetExternalId,
};

export const listLibraryCollaboratorsInputs = {
  connection,
  ...paginationInputs,
  brandId: { ...brandId, required: false },
  libraryId,
};

export const listLibraryCollectionsInputs = {
  connection,
  ...paginationInputs,
  brandId: { ...brandId, required: false },
  libraryId,
  assetPage: input({
    label: "Page (Assets)",
    comments:
      "Assets are paginated within collections. Use this to control the nested Asset pagination.",
    type: "string",
    default: "1",
    example: "1",
    placeholder: "1",
    clean: util.types.toInt,
  }),
  assetLimit: input({
    label: "Page Size (Assets)",
    comments:
      "Assets are paginated within collections. Use this to control the nested Asset pagination.",
    type: "string",
    default: "50",
    example: "50",
    placeholder: "50",
    clean: util.types.toInt,
  }),
  
  fetchAll: input({
    label: "Fetch All",
    type: "boolean",
    required: false,
    comments:
      "If true, it will fetch all top-level Collections records and ignore parameters like page and page size. This toggle will not affect the Asset pagination within each Collection.",
    clean: util.types.toBool,
  }),
};

export const listLibraryFoldersInputs = {
  connection,
  ...paginationInputs,
  brandId: { ...brandId, required: false },
  libraryId,
};

export const updateCollectionInputs = {
  connection,
  brandId: { ...brandId, required: false },
  libraryId: { ...libraryId, required: false },
  collectionId: input({
    label: "Collection ID",
    type: "string",
    required: true,
    comments: "ID of the Collection to update.",
    example: "eyJpZG...",
    placeholder: "eyJpZG...",
    clean: util.types.toString,
    dataSource: "selectLibraryCollection",
  }),
  name: input({
    label: "Name",
    comments: "Collection name.",
    type: "string",
    required: true,
    example: "My Collection",
    placeholder: "My Collection",
    clean: util.types.toString,
  }),
};
