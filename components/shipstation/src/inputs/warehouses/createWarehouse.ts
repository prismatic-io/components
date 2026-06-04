import { connectionInput } from "../common";
import {
  isDefaultWarehouseInput,
  originAddressInput,
  returnAddressInput,
  warehouseNameInput,
} from "./common";

export const createWarehouseInputs = {
  connectionInput,
  warehouseName: warehouseNameInput,
  originAddress: originAddressInput,
  returnAddress: returnAddressInput,
  isDefault: isDefaultWarehouseInput,
};
