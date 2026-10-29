import { input, util } from "@prismatic-io/spectral";

export const salesOrderId = input({
  label: "Sales Order ID",
  comments: "The unique identifier of the sales order.",
  type: "string",
  example: "f1678e37-e50b-ef11-9f8e-6045bdc8c192",
  placeholder: "f1678e37-e50b-ef11-9f8e-6045bdc8c192",
  required: true,
  dataSource: "listSalesOrders",
  clean: util.types.toString,
});
