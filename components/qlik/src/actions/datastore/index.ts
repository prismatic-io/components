import { createDataStore } from "./create";
import { deleteDataStores } from "./delete";
import { deleteDataStoresAssets } from "./deleteAssets";
import { getDataStore } from "./get";
import { listDataStores } from "./list";
import { updateDataStore } from "./update";

export default {
  createDataStore,
  updateDataStore,
  getDataStore,
  deleteDataStores,
  deleteDataStoresAssets,
  listDataStores,
};
