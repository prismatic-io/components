import { input, util } from "@prismatic-io/spectral";
import {
  ASSET_DESCRIPTION_DEFAULT,
  ASSET_FILE_DEFAULT,
  ASSET_TITLE_DEFAULT,
} from "../constants";
import { cleanCodeInput } from "../util";
import { connection, environmentId, spaceId } from "./common";



const assetTitle = input({
  label: "Title",
  type: "code",
  language: "json",
  comments: "The title of the asset as a JSON object with locale keys.",
  placeholder: "Enter asset title JSON",
  default: JSON.stringify(ASSET_TITLE_DEFAULT, null, 2),
  required: true,
  clean: cleanCodeInput,
});

const assetDescription = input({
  label: "Description",
  type: "code",
  language: "json",
  comments: "The description of the asset as a JSON object with locale keys.",
  placeholder: "Enter asset description JSON",
  default: JSON.stringify(ASSET_DESCRIPTION_DEFAULT, null, 2),
  required: true,
  clean: cleanCodeInput,
});

const assetFile = input({
  label: "File",
  type: "code",
  language: "json",
  comments:
    "The file metadata for the asset as a JSON object with locale keys and upload details.",
  placeholder: "Enter asset file JSON",
  default: JSON.stringify(ASSET_FILE_DEFAULT, null, 2),
  required: true,
  clean: cleanCodeInput,
});

const assetId = input({
  label: "Asset ID",
  type: "string",
  comments: "The unique identifier for the asset.",
  example: "wtrHxeu3zEoEce2MokCSi",
  placeholder: "Enter asset ID",
  required: true,
  clean: util.types.toString,
  dataSource: "selectAsset",
});



export const createAssetInputs = {
  connection,
  spaceId,
  environmentId,
  title: assetTitle,
  description: assetDescription,
  file: assetFile,
};



export const deleteAssetInputs = {
  connection,
  spaceId,
  environmentId,
  assetId,
};



export const getAssetInputs = {
  connection,
  spaceId,
  environmentId,
  assetId,
};



export const listAssetsInputs = {
  connection,
  spaceId,
  environmentId,
};



export const processAssetInputs = {
  connection,
  spaceId,
  environmentId,
  assetId,
};



export const publishAnAssetInputs = {
  connection,
  spaceId,
  environmentId,
  assetId,
};



export const unpublishAnAssetInputs = {
  connection,
  spaceId,
  environmentId,
  assetId,
};



export const updateAssetInputs = {
  connection,
  spaceId,
  environmentId,
  assetId,
  title: {
    ...assetTitle,
    required: false,
    comments:
      "The updated title of the asset. Locale key must match the original locale of the asset to be updated.",
  },
  description: {
    ...assetDescription,
    required: false,
    label: "Asset Description",
    comments:
      "The updated description of the asset. Locale key must match the original locale of the asset to be updated.",
  },
};
