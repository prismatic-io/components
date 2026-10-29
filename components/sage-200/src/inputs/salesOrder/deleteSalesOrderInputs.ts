import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const salesOrderId = input({
  label: "Sales Order ID",
  comments: "Sales order ID to delete",
  type: "string",
  required: true,
  placeholder: "81390",
  example: "81390",
  dataSource: "selectSalesOrder",
  clean: cleanStringInput,
});

export default {
  salesOrderId,
};
