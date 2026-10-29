import { bodyFields } from "../general";
import { warehouseCode, warehouseLocationId, warehouseName } from "./general";

export const createWarehouseInputs = {
  WarehouseName: warehouseName,
  WarehouseCode: warehouseCode,
  Location: warehouseLocationId,
  bodyFields,
};
