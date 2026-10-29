import { createWarehouse } from "./create";
import { deleteWarehouse } from "./delete";
import { getWarehouse } from "./get";
import { listWarehouses } from "./list";
import warehouseLocations from "./locations";
import { updateWarehouse } from "./update";

export default {
  listWarehouses,
  getWarehouse,
  deleteWarehouse,
  createWarehouse,
  updateWarehouse,
  ...warehouseLocations,
};
