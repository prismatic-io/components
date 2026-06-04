import { createAssetObject } from "./objects/createAssetObject";
import { deleteAssetObject } from "./objects/deleteAssetObject";
import { getAssetObject } from "./objects/getAssetObject";
import { searchAssetObjects } from "./objects/searchAssetObjects";
import { updateAssetObject } from "./objects/updateAssetObject";
import { getAssetSchema } from "./schemas/getAssetSchema";
import { listAssetSchemas } from "./schemas/listAssetSchemas";
import { listSchemaObjectTypes } from "./schemas/listSchemaObjectTypes";

export default {
  searchAssetObjects,
  getAssetObject,
  createAssetObject,
  updateAssetObject,
  deleteAssetObject,
  listAssetSchemas,
  getAssetSchema,
  listSchemaObjectTypes,
};
