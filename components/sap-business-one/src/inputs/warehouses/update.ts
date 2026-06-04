import { cleanString } from "../../util";
import { bodyFields } from "../general";
import { warehouseCode, warehouseLocationId, warehouseName } from "./general";

export const updateWarehouseInputs = {
  WarehouseCode: warehouseCode,
  WarehouseName: { ...warehouseName, required: false, clean: cleanString },
  Location: { ...warehouseLocationId, required: false, clean: cleanString },
  bodyFields,
};
