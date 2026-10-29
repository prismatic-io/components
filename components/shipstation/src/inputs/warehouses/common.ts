import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

export const warehouseIdInput = input({
  label: "Warehouse ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the warehouse.",
  placeholder: "Enter warehouse ID",
  dataSource: "selectWarehouses",
  clean: util.types.toString,
});

export const warehouseNameInput = input({
  label: "Warehouse Name",
  type: "string",
  required: false,
  comments: "A descriptive label for the ship-from location.",
  placeholder: "Enter warehouse name",
  clean: cleanStringInput,
});

export const originAddressInput = input({
  label: "Origin Address",
  type: "jsonForm",
  required: true,
  comments:
    "The origin address. Shipping rates will be calculated from this address.",
});

export const returnAddressInput = input({
  label: "Return Address",
  type: "jsonForm",
  required: false,
  comments:
    "The return address. If not specified, the origin address will be used.",
});

export const isDefaultWarehouseInput = input({
  label: "Is Default Warehouse",
  type: "boolean",
  required: false,
  comments: "When true, sets this as the default ship from location.",
  clean: util.types.toBool,
});

export const warehouseUpdateDataInput = input({
  label: "Warehouse Update Data",
  type: "code",
  language: "json",
  default: JSON.stringify(
    {
      warehouseId: 12345,
      warehouseName: "API Ship From Location",
    },
    null,
    2,
  ),
  comments:
    "All the data needed to update an existing Ship From Location. Must provide the entire resource.",
  clean: (value: unknown) =>
    JSON.parse(util.types.toString(value)) as Record<string, unknown>,
});
