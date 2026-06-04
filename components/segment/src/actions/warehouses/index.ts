import { addConnectionFromSourceToWarehouse } from "./addConnectionFromSource";

import { deleteWarehouse } from "./delete";
import { getWarehouse } from "./get";
import { listWarehouses } from "./list";
import { listConnectedSourcesFromWarehouse } from "./listConnectedSources";
import { removeSourceConnectionFromWarehouse } from "./removeSourceConnection";
import { updateWarehouse } from "./update";

export default {
  addConnectionFromSourceToWarehouse,
  
  deleteWarehouse,
  getWarehouse,
  listWarehouses,
  listConnectedSourcesFromWarehouse,
  removeSourceConnectionFromWarehouse,
  updateWarehouse,
};
