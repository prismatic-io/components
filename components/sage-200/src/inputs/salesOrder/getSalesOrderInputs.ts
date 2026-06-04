import { input } from "@prismatic-io/spectral";
import { cleanStringInput } from "../../util";

const salesOrderId = input({
  label: "Sales Order ID",
  comments: "Sales order ID to retrieve",
  type: "string",
  required: true,
  placeholder: "38294",
  example: "38294",
  dataSource: "selectSalesOrder",
  clean: cleanStringInput,
});

export default {
  salesOrderId,
};
