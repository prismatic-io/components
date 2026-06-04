import { input, util } from "@prismatic-io/spectral";
import { toOptionalNumber, toOptionalString } from "../util";
import { connection, fetchAll, page, pageSize } from "./common";





const assetId = input({
  label: "Asset ID",
  type: "string",
  required: true,
  comments:
    "The unique identifier for the Content Builder asset in Marketing Cloud.",
  example: "12345",
  placeholder: "Enter asset ID",
  dataSource: "selectAsset",
  clean: util.types.toString,
});

const assetName = input({
  label: "Asset Name",
  type: "string",
  required: true,
  comments: "The display name shown for the asset in Content Builder.",
  example: "Welcome Email Template",
  placeholder: "Enter asset name",
  clean: util.types.toString,
});

const assetDescription = input({
  label: "Asset Description",
  type: "string",
  required: false,
  comments:
    "Optional description providing details about the asset's purpose and usage.",
  example: "HTML email template for new subscriber welcome series",
  placeholder: "Enter asset description",
  clean: toOptionalString,
});

const assetTypeId = input({
  label: "Asset Type ID",
  type: "string",
  required: true,
  comments:
    "The numeric asset type identifier (e.g., 208 for HTML email, 196 for text-only email).",
  example: "208",
  placeholder: "Enter asset type ID",
  clean: util.types.toNumber,
});

const categoryId = input({
  label: "Category ID",
  type: "string",
  required: false,
  comments: "The ID of the Content Builder folder/category for the asset.",
  example: "98765",
  placeholder: "Enter category ID",
  dataSource: "selectCategory",
  clean: toOptionalNumber,
});

const assetContent = input({
  label: "Content",
  type: "text",
  required: false,
  comments: "The HTML or text content of the asset.",
  placeholder: "Enter asset content",
  clean: toOptionalString,
});

const assetQuery = input({
  label: "Query",
  type: "code",
  language: "json",
  required: false,
  comments:
    "A query filter object for searching assets. Uses the Content Builder query syntax.",
  example: JSON.stringify(
    {
      property: "name",
      simpleOperator: "like",
      value: "Welcome%",
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});

const assetFields = input({
  label: "Fields",
  type: "string",
  required: false,
  comments:
    "Comma-separated list of fields to include in the response. Reduces payload size.",
  example: "id,name,assetType,category",
  placeholder: "Enter field names",
  clean: toOptionalString,
});

const assetExtraBody = input({
  label: "Extra Body",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Additional properties to include in the asset creation or update request.",
  example: JSON.stringify(
    {
      views: { html: { content: "<html><body>Hello</body></html>" } },
    },
    null,
    2,
  ),
  clean: util.types.toObject,
});





export const listAssetsInputs = {
  connection,
  fetchAll,
  pageSize,
  page,
};

export const queryAssetsInputs = {
  connection,
  assetQuery,
  assetFields,
  pageSize,
  page,
};

export const getAssetInputs = {
  connection,
  assetId,
};

export const createAssetInputs = {
  connection,
  assetName,
  assetTypeId,
  assetDescription,
  categoryId,
  assetContent,
  assetExtraBody,
};

export const updateAssetInputs = {
  connection,
  assetId,
  assetName: {
    ...assetName,
    required: false,
    clean: toOptionalString,
  },
  assetDescription,
  categoryId,
  assetContent,
  assetExtraBody,
};

export const deleteAssetInputs = {
  connection,
  assetId,
};
